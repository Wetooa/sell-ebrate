
<?php

include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $token = getAuthPayload();
        $userId = $token["accountId"];
    
        $sql1 = $conn->prepare("SELECT * FROM tblAccount WHERE accountId = ?");
        $sql1->bind_param("i", $userId);
        $sql1->execute();
    
        $result = $sql1->get_result();
    
        if ($result->num_rows == 0) {
            // User does not exist, but return a 200 status code
            $response = new ServerResponse(data: ["message" => "User does not exist"]);
            returnJsonHttpResponse(200, $response);
            break;
        }
    
        $user = $result->fetch_assoc();
        unset($user["password"]);
    
        $response = new ServerResponse(data: ["message" => "User data fetched successfully", "user" => $user]);
        returnJsonHttpResponse(200, $response);
        break;

  case "POST":

  case "UPDATE":

  case "DELETE":
    $token = getAuthPayload();
    if (!$token) {
        error_log("Failed to get auth payload");
        $response = new ServerResponse(error: ["message" => "Unauthorized"]);
        returnJsonHttpResponse(401, $response);
        exit();
    }
    
    $userId = $token["accountId"];
    error_log("User ID extracted: " . $userId);
    
    $sqlDeleteAccount = $conn->prepare("UPDATE tblAccount SET isDeleted = True WHERE accountId = ?");
    if (!$sqlDeleteAccount) {
        error_log("Prepare failed: " . $conn->error);
        $response = new ServerResponse(error: ["message" => "Internal server error"]);
        returnJsonHttpResponse(500, $response);
        exit();
    }
    
    $sqlDeleteAccount->bind_param("i", $userId);
    $sqlDeleteAccount->execute();
    
    if ($sqlDeleteAccount->affected_rows > 0) {
        error_log("Account deleted successfully for user ID: " . $userId);
        $response = new ServerResponse(data: ["message" => "Account deleted successfully"]);
        returnJsonHttpResponse(200, $response);
    } else {
        error_log("Failed to delete account for user ID: " . $userId);
        $response = new ServerResponse(error: ["message" => "Failed to delete account"]);
        returnJsonHttpResponse(500, $response);
    }
    
}
