<?php
include_once "../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $accountId = $_GET["accountId"];

    $sql1 = "SELECT * FROM tblAccount WHERE accountId = ?";
    $result = $conn->execute_query($sql1, [$accountId]);

    if ($result->num_rows == 0) {
      $response = new ServerResponse(error: ["message" => "User does not exist"]);
      returnJsonHttpResponse(400, $response);
    }

    $user = $result->fetch_assoc();
    unset($user["password"]);

    $response = new ServerResponse(data: ["message" => "User data fetched successfully", "user" => $user]);
    returnJsonHttpResponse(200, $response);

  case "UPDATE":
    $jsonData = getBodyParameters();
    $token = getAuthPayload();
    $userId = $token['accountId'];
    $sql1 = "SELECT * FROM tblUser WHERE userId = ?";
    $result = $conn->execute_query($sql1, [$userId]);

    $user = $result->fetch_assoc();

    if (empty($jsonData)) {
      $response = new ServerResponse(error: ["message" => "No fields provided for update"]);
      returnJsonHttpResponse(400, $response);
    }

    $fieldsToUpdate = [];
    $updateValues = [];
    foreach ($jsonData as $key => $value) {
      if (array_key_exists($key, $user) && $key != "userId") {
        $fieldsToUpdate[] = "$key = ?";
        $updateValues[] = $value;
      }
    }

    if (empty($fieldsToUpdate)) {
      $response = new ServerResponse(error: ["message" => "No valid fields provided for update"]);
      returnJsonHttpResponse(400, $response);
    }

    $fieldsToUpdateString = implode(", ", $fieldsToUpdate);
    $updateValues[] = $userId;
    $sql2 = "UPDATE tblUser SET $fieldsToUpdateString WHERE userId = ?";
    $conn->execute_query($sql2, $updateValues);

    $sql3 = "SELECT * FROM tblUser WHERE userId = ?";
    $result = $conn->execute_query($sql3, [$userId]);
    $updatedUser = $result->fetch_assoc();

    $response = new ServerResponse(data: ["message" => "User data updated successfully", "user" => $updatedUser]);
    returnJsonHttpResponse(200, $response);

  case "DELETE":
    $token = getAuthPayload();
    $userId = $token["accountId"];

    $sqlDeleteAccount = $conn->prepare("UPDATE tblAccount SET isDeleted = True WHERE accountId = ?");
    $sqlDeleteAccount->bind_param("i", $userId);
    $sqlDeleteAccount->execute();


    if ($sqlDeleteAccount->affected_rows > 0) {
      $response = new ServerResponse(data: ["message" => "Account deleted successfully"]);
      returnJsonHttpResponse(200, $response);
    } else {
      $response = new ServerResponse(error: ["message" => "Failed to delete account"]);
      returnJsonHttpResponse(500, $response);
    }

  default:
    $response = new ServerResponse(error: ["message" => "Invalid request method"]);
    returnJsonHttpResponse(405, $response);
}
