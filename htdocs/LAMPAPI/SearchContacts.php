<?php
	$inData = getRequestInfo();
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}

	else
	{
		$stmt = $conn->prepare("select ID, Name, Phone, Email from contact where Name like ? and UserID = ?");
		$contactName = "%" . $inData["search"] . "%";
		$stmt->bind_param("ss", $contactName, $inData["userId"]);
		$stmt->execute();
		$result = $stmt->get_result();


		while($row = $result->fetch_assoc())
		{
			if($searchCount > 0)
			{
				$searchResults .= ",";
			}

			$searchCount++;
			$searchResults .= '{"ID": "' . $row["ID"] . '", "name": "' . $row["Name"] . '", "phone": "' . $row["Phone"]  . '", "email": "' . $row["Email"] . '"}';
			//$searchResults .= '"' .$row["Name"] . '"';
		}

		if($searchCount == 0)
		{
			returnWithError("No Records Found");
		}

		else
		{
			returnWithInfo($searchResults);
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError($err)
	{
		$returnValue = '{"id":0,"Name":"","Phone":"","email":"","error":"' . $err . '"}';
		sendResultInfoAsJson($returnValue);
	}

	function returnWithInfo($searchResults)
	{
		$returnValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson($returnValue);
	}

?>

