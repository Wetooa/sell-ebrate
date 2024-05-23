<?php

include_once "../../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "POST":
    $token = getAuthPayload();
    $userId = $token["accountId"];

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
      $response = new ServerResponse(error: ["message" => "Invalid JSON format"]);
      returnJsonHttpResponse(400, $response);
      exit;
    }

    if (!isset($data['productId'])) {
      $response = new ServerResponse(error: ["message" => "Product ID is required"]);
      returnJsonHttpResponse(400, $response);
      exit;
    }

    $productId = $data['productId'];

    $conn->begin_transaction();

    try {
      // Fetch product information
      $sqlProduct = $conn->prepare("SELECT quantity FROM tblProduct WHERE productId = ?");
      $sqlProduct->bind_param("i", $productId);
      $sqlProduct->execute();
      $productResult = $sqlProduct->get_result();

      if ($productResult->num_rows === 0) {
        throw new Exception("Product not found");
      }

      $product = $productResult->fetch_assoc();
      if ($product['quantity'] <= 0) {
        throw new Exception("Product is out of stock");
      }

      // Create a new order
      $sqlOrder = $conn->prepare("INSERT INTO tblOrder (buyerId, isPaid) VALUES (?, 0)");
      $sqlOrder->bind_param("i", $userId);
      $sqlOrder->execute();

      $orderId = $conn->insert_id;

      // Insert order item and update product quantity
      $sqlOrderItem = $conn->prepare("INSERT INTO tblOrderItem (orderId, productId, quantity) VALUES (?, ?, ?)");
      $quantity = 1; // Quantity is fixed to 1 for the current operation
      $sqlOrderItem->bind_param("iii", $orderId, $productId, $quantity);
      $sqlOrderItem->execute();

      $sqlReduceQuantity = $conn->prepare("UPDATE tblProduct SET quantity = quantity - ? WHERE productId = ?");
      $sqlReduceQuantity->bind_param("ii", $quantity, $productId);
      $sqlReduceQuantity->execute();

      $conn->commit();

      $response = new ServerResponse(data: ["message" => "Product bought successfully", "orderId" => $orderId]);
      returnJsonHttpResponse(200, $response);
    } catch (Exception $e) {
      $conn->rollback();

      $response = new ServerResponse(error: ["message" => $e->getMessage()]);
      returnJsonHttpResponse(400, $response);
    }
    break;

  default:
    $response = new ServerResponse(error: ["message" => "Invalid request method"]);
    returnJsonHttpResponse(405, $response);
    break;
}
