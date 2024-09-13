<?php

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}



	$UserID = $inData["ID"];
	$search = $inData["search"];


	#stmt = $conn->prepare("SELECT DatabaseName.ID, DatabaseName.firstName, DatabaseName.lastName, DatabaseName.email, DatabaseName.phoneNumber from DatabaseName");

	<?php

        $inData = getRequestInfo();

        $searchResults = "";
        $searchCount = 0;

        $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4>        if ($conn->connect_error)
        {
                returnWithError( $conn->connect_error );
        }



        $UserID = $inData["ID"];
        $search = $inData["search"];


        #stmt = $conn->prepare("SELECT DatabaseName.ID, Databas>
	//DO MORE WITH THIS 


	


	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($jsonVal)
	{
		header('Content-type: application/json');
		echo $jsonVal;
	}

	function returnWithError($err)
	{
		$jsonVal = sprintf('{"Contacts":[],"error":"%s"}', $err);
		sendResultInfoAsJson($jsonVal);
		exit;
	}

	function returnWithInfo($row)
	{
		$jsonVal = sprintf('{"Contacts":%s,"error":""}', $row);
		sendResultInfoAsJson($jsonVal);
	}

?>
