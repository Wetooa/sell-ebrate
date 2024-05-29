<?php

include_once "../../../utils/headers.php";

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, UPDATE, DELETE");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    // Handle GET request
    // This block is executed when a GET request is received
    // Add your GET request logic here
    break;

  case "POST":
    // Handle POST request
    // This block is executed when a POST request is received
    // Add your existing POST request logic here
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
    break;

  case "UPDATE":
    // Handle UPDATE request
    // This block is executed when an UPDATE request is received
    // Add your UPDATE request logic here
    break;

  case "DELETE":
    // Handle DELETE request
    // This block is executed when a DELETE request is received
    // Add your DELETE request logic here
    break;
}
