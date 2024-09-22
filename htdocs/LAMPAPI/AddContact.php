<?php
    
    $inData = getRequestInfo();

    // Extract contact details from input data
    $name = $inData["name"];
    $phoneNumber = $inData["phoneNumber"];
    $email = $inData["email"];
    $userId = $inData["userId"]; 
    // Database connection
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "contact_manager");

    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {

        $stmt = $conn->prepare("INSERT INTO contact (Name, Phone, email, UserID) VALUES (?, ?, ?, ?)");

        $stmt->bind_param("sssi", $name, $phoneNumber, $email, $userId);

        if ($stmt->execute()) {
            returnWithSuccess("Contact added successfully");
        } else {
            returnWithError("Error adding contact");
        }


        $stmt->close();
        $conn->close();
    }

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithSuccess($msg) {
        $retValue = '{"message":"' . $msg . '"}';
        sendResultInfoAsJson($retValue);
    }

?>

