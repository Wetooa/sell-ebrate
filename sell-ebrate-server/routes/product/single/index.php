<?php
include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    if (!isset($_GET['productId'])) {
      returnJsonHttpResponse(400, new ServerResponse(error: ["message" => "No product id parameter sent!"]));
    }

    try {
      $conn->begin_transaction();

      $sql1 = "
      SELECT a.*, b.firstName, b.lastName 
      FROM tblProduct AS a 
      JOIN tblAccount AS b ON a.sellerId = b.accountId 
      WHERE a.productId = ? 
    ";
      $result = $conn->execute_query($sql1, [$_GET["productId"]]);
      $product = $result->fetch_assoc();

      if (!$product) {
        $response = new ServerResponse(error: ["message" => "Product with id " . $_GET["productId"] . " not found"]);
        returnJsonHttpResponse(404, $response);
      }

      $productId = $_GET['productId'];
      $sqlUpdateClicks = "UPDATE tblProduct SET clicks = clicks + 1 WHERE productId = ?";
      $stmt = $conn->prepare($sqlUpdateClicks);
      $stmt->bind_param("i", $productId);
      $stmt->execute();

      $conn->commit();

      $response = new ServerResponse(data: ["message" => "Successfully acquired product with id " . $_GET["productId"], "product" => $product]);
      returnJsonHttpResponse(200, $response);
    } catch (Exception $e) {
      $conn->rollback();
      $response = new ServerResponse(error: ["message" => $e->getMessage()]);
      returnJsonHttpResponse(409, $response);
    }

  case "POST":

  case "UPDATE":

  case "DELETE":
}
