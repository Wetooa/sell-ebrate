<?php

include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":


  case "POST":
    $requiredFields = ["email", "password"];
    $jsonData = getBodyParameters();
    $fields = checkFields($jsonData, $requiredFields);

    $sql1 = "SELECT * FROM tblAccount WHERE email = ?";
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param("s", $fields["email"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
      error_log("Email not found: " . $fields["email"]);
      $response = new ServerResponse(error: ["message" => "Email not found!"]);
      returnJsonHttpResponse(401, $response);
      break;
    }

    $account = $result->fetch_assoc();

    if (!password_verify($fields["password"], $account["password"])) {
      error_log("Invalid credentials for email: " . $fields["email"]);
      $response = new ServerResponse(error: ["message" => "Invalid credentials!"]);
      returnJsonHttpResponse(401, $response);
      break;
    }

    $hashedToken = createToken($account);
    $response = new ServerResponse(data: ["message" => "User logged in successfully", "token" => $hashedToken]);
    returnJsonHttpResponse(200, $response);

  case "UPDATE":

  case "DELETE":
}
