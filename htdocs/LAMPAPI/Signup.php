<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
    $login = $inData["login"];
    $password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into user (Login,Password, FirstName, LastName) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $login, $password, $firstname, $lastname);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>