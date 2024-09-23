<<<<<<< HEAD
<?php

        $inData = getRequestInfo();
	$userId = $inData["userId"];
	$contactId = $inData["contactId"];

        $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");

        if ($conn->connect_error)
        {
        	returnWithError($conn->connect_error);
        }

        //check if the name entered is in the contact table
        $stmt = $conn->prepare("SELECT * FROM contact WHERE ID = ? and UserID = ?");
        $stmt->bind_param("ss", $contactId, $userId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();

        if($row === null)
        {
        	returnWithError("Contact does not exist");
        }

        $stmt->close();

        //delete the contact that we just searched up
        $stmt = $conn->prepare("DELETE FROM contact WHERE ID = ? and UserID = ?");
        $stmt->bind_param("ss", $contactId, $userId);
        $stmt->execute();
        $deleted = $stmt->affected_rows;

        $stmt->close();
        $conn->close();

        if($deleted === 0)
        {
        	returnWithError("Error occured when deleting this Contact");
        }

	$info = '{"ID": "' . $row["ID"] . '", "name": "' . $row["Name"] . '", "phone": "' . $row["Phone"]  . '", "email": "' . $row["Email"] . '"}';

	returnWithInfo($info);

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
        	$returnValue = sprintf('{"Error message": "%s"}', $err);
        	sendResultInfoAsJson($returnValue);
        	exit;
        }

        function returnWithInfo($obj)
        {
        	$returnValue = '{"deleted info":[' . $obj . '],"error":""}';
        	sendResultInfoAsJson($returnValue);
        }
?>
=======
<?php

        $inData = getRequestInfo();
	$userId = $inData["userId"];
	$contactId = $inData["contactId"];

        $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");

        if ($conn->connect_error)
        {
        	returnWithError($conn->connect_error);
        }

        //check if the name entered is in the contact table
        $stmt = $conn->prepare("SELECT * FROM contact WHERE ID = ? and UserID = ?");
        $stmt->bind_param("ss", $contactId, $userId);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();

        if($row === null)
        {
        	returnWithError("Contact does not exist");
        }

        $stmt->close();

        //delete the contact that we just searched up
        $stmt = $conn->prepare("DELETE FROM contact WHERE ID = ? and UserID = ?");
        $stmt->bind_param("ss", $contactId, $userId);
        $stmt->execute();
        $deleted = $stmt->affected_rows;

        $stmt->close();
        $conn->close();

        if($deleted === 0)
        {
        	returnWithError("Error occured when deleting this Contact");
        }

	$info = '{"ID": "' . $row["ID"] . '", "name": "' . $row["Name"] . '", "phone": "' . $row["Phone"]  . '", "email": "' . $row["Email"] . '"}';

	returnWithInfo($info);

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
        	$returnValue = sprintf('{"Error message": "%s"}', $err);
        	sendResultInfoAsJson($returnValue);
        	exit;
        }

        function returnWithInfo($obj)
        {
        	$returnValue = '{"deleted info":[' . $obj . '],"error":""}';
        	sendResultInfoAsJson($returnValue);
        }
?>
>>>>>>> 5b3dd7ea1c63dc4ca7b0a2d95349bf3a9be7f47a
