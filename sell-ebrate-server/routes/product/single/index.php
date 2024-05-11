<?php
include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":

    $sql1 = "
      SELECT a.*, b.firstName, b.lastName 
      FROM tblProduct AS a 
      JOIN tblAccount AS b ON a.sellerId = b.accountId 
      WHERE a.productId = ? 
    ";

    $result = $conn->execute_query($sql1, [$_GET["productId"]]);
    $product = $result->fetch_assoc();

    if (!$product) {
      $response = new ServerResponse(error: ["message" => "Product with id " . $fields["productId"] . " not found"]);
      returnJsonHttpResponse(404, $response);
    } else {
      $response = new ServerResponse(data: ["message" => "Successfully acquired product with id " . $fields["productId"], "product" => $product]);
      returnJsonHttpResponse(200, $response);
    }

  case "POST":

  case "UPDATE":

  case "DELETE":
}
