<?php
include_once "../utils/headers.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $rawData = file_get_contents('php://input');
  $jsonData = json_decode($rawData, true);

  $email = $jsonData["email"];
  $password = $jsonData["password"];


  if (empty($email) || empty($password)) {
    $response = new ServerResponse(error: ["message" => "Missing required fields"]);
    returnJsonHttpResponse(400, $response);
  }

  $sql1 = $conn->prepare("SELECT * FROM tblAccount WHERE email = ?");
  $sql1->bind_param("s", $email);
  $sql1->execute();

  $result = $sql1->get_result();

  if ($result->num_rows == 0) {
    $response = new ServerResponse(error: ["message" => "Invalid credentials"]);
    returnJsonHttpResponse(401, $response);
  }

  $user = $result->fetch_assoc();


  if (!password_verify($password, $user["password"])) {
    // TODO: maybe its best this way para secure
    $response = new ServerResponse(error: ["message" => "Invalid credentials"]);
    returnJsonHttpResponse(401, $response);
  }


  // TODO: its used twice, maybe best to put it in a function
  $payload = array("user_id" => $user["user_id"]);
  $hashed_payload = hash_hmac('sha256', json_encode($payload), $secret_key);
  $response = new ServerResponse(data: ["message" => "User logged in successfully", "token" => json_encode($hashed_payload)]);

  returnJsonHttpResponse(200, $response);
}
