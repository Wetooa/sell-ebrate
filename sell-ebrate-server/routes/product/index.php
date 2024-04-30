<?php

include_once "../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $sql1 = "SELECT * FROM tblProduct";

    $result = $conn->execute_query($sql1);

    $products = $result->fetch_all(MYSQLI_ASSOC);

    $response = new ServerResponse(data: ["message" => "Products data fetched successfully", "products" => $products], error: []);
    returnJsonHttpResponse(200, $response);

  case "POST":
    $jsonData = getBodyParameters();
    $requiredFields = ["sellerId", "productName", "description", "quantity", "price"];
    $fields = checkFields($jsonData, $requiredFields);

    // TODO:  get keys
    $sql1 = $conn->prepare("INSERT INTO tblProduct( " . implode(',', $fields) . " ) VALUES(?, ?, ?, ?, ?, ?)");
    $conn->execute_qeury($sql1, $fields);

    $response = new ServerResponse(data: ["message" => "Product added to store successfully!"]);
    returnJsonHttpResponse(200, $response);

    case "UPDATE":
      $jsonData = getBodyParameters();
      $requiredFields = ["productId"];
      $fieldsToUpdate = [];
      
      foreach ($jsonData as $key => $value) {
        if (in_array($key, ["productName", "description", "quantity", "price"])) {
          $fieldsToUpdate[] = "$key = ?";
          $fields[$key] = $value;
        }
      }
      
      if (empty($fieldsToUpdate)) {
        $response = new ServerResponse(error: ["message" => "No valid fields provided for update"]);
        returnJsonHttpResponse(400, $response);
      }
      
      $fields = checkFields($fields, $requiredFields);
  
      $sql1 = $conn->prepare("UPDATE tblProduct SET " . implode(", ", $fieldsToUpdate) . " WHERE productId = ?");
      $fieldsValues = array_merge(array_values($fields), [$fields["productId"]]);
      $conn->execute_query($sql1, $fieldsValues);
  
      $response = new ServerResponse(data: ["message" => "Product updated successfully!"]);
      returnJsonHttpResponse(200, $response);


  case "DELETE":
    $requiredFields = ["productId"];
    $jsonData = getBodyParameters();
    $token = getAuthPayload();
    $fields = checkFields($jsonData, $requiredFields);

    $sq1 = "SELECT productId, sellerId FROM tblProduct WHERE productId = ?";
    $result = $conn->execute_query($sql1, [$fields["productId"]]);

    if ($result["sellerId"] != $token) {
      $response = new ServerResponse(error: ["message" => "User does not own this product!"]);
      returnJsonHttpResponse(400, $response);
    }

    $sql2 = "DELETE FROM tblProduct WHERE productId = ?";
    $result = $conn->execute_query($sql1, [$fields["productId"]]);

    $response = new ServerResponse(data: ["message" => "Product deleted successfully!"]);
    returnJsonHttpResponse(200, $response);
}
