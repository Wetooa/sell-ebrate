<?php
include_once "../../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":

  case "POST":
    // FIX: shorten this using good programming pracitces
    $requiredFieldsAccount = ["firstName", "lastName", "email", "password", "gender", "birthdate"];
    $requiredFieldsUser = ["street", "barangay", "municipality", "province", "country", "zipcode"];

    $jsonData = getBodyParameters();

    $fieldsAccount = checkFields($jsonData, $requiredFieldsAccount);
    $fieldsUser = checkFields($jsonData["address"], $requiredFieldsUser);

    $firstName = $jsonData["firstName"];
    $lastName = $jsonData["lastName"];

    $email = $jsonData["email"];
    $password = $jsonData["password"];

    $gender = $jsonData["gender"];
    $birthdate = $jsonData["birthdate"];

    $address = $jsonData["address"];

    $street = $address["street"];
    $barangay = $address["barangay"];
    $municipality = $address["municipality"];
    $province = $address["province"];
    $country = $address["country"];
    $zipcode = $address["zipcode"];


    try {
      $conn->begin_transaction();

      $sql_check = "SELECT * FROM tblAccount WHERE email = ?";
      $stmt_check = $conn->prepare($sql_check);
      $stmt_check->bind_param("s", $email);
      $stmt_check->execute();
      $result = $stmt_check->get_result();

      if ($result->num_rows != 0) {
        throw new Exception("Email already exists");
      }

      $options = ['cost' => 12];
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT, $options);

      $sql1 = $conn->prepare("INSERT INTO tblAccount (firstName, lastName, email, password, gender, birthdate) VALUES (?, ?, ?, ?, ?, ?)");
      $sql1->bind_param("ssssss", $firstName, $lastName, $email, $hashedPassword, $gender, date('Y-m-d H:i:s', strtotime($birthdate)));
      $sql1->execute();
      $accountId = $sql1->insert_id;

      $sql2 = $conn->prepare("INSERT INTO tblUser (userId, street, barangay, municipality, province, country, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $sql2->bind_param("sssssss", $accountId, $street, $barangay, $municipality, $province, $country, $zipcode);
      $sql2->execute();

      $sql3 = $conn->prepare("INSERT INTO tblBuyer (buyerId) VALUES (?)");
      $sql3->bind_param("s", $accountId);
      $sql3->execute();

      $sql4 = $conn->prepare("SELECT * FROM tblAccount WHERE accountId = ?");
      $sql4->bind_param("s", $accountId);
      $sql4->execute();
      $account = $sql4->get_result()->fetch_assoc();

      $conn->commit();

      $hashedToken = createToken($account);
      $response = new ServerResponse(data: ["message" => "User registered successfully", "token" => $hashedToken]);
      returnJsonHttpResponse(200, $response);
    } catch (Exception $e) {

      $conn->rollback();
      $response = new ServerResponse(error: ["message" => $e->getMessage()]);
      returnJsonHttpResponse(409, $response);
    }

  case "UPDATE":

  case "DELETE":
}
