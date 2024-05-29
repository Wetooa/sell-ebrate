<?php

include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":

       $token = getAuthPayload();
       $buyerId = $token["accountId"];
  
      $orderId = 1;
  
      $sqlOrder = $conn->prepare("SELECT * FROM tblOrder WHERE orderId = ? AND buyerId = ?");
      $sqlOrder->bind_param("ii", $orderId, $buyerId);
      $sqlOrder->execute();
      $orderResult = $sqlOrder->get_result();
  
      if ($orderResult->num_rows === 0) {
        $response = new ServerResponse(error: ["message" => "Order not found"]);
        returnJsonHttpResponse(404, $response);
        exit;
      }
  
      $order = $orderResult->fetch_assoc();
  
      $sqlOrderItems = $conn->prepare("SELECT * FROM tblOrderItem WHERE orderId = ?");
      $sqlOrderItems->bind_param("i", $orderId);
      $sqlOrderItems->execute();
      $orderItemsResult = $sqlOrderItems->get_result();
  
      $orderItems = [];
      while ($row = $orderItemsResult->fetch_assoc()) {
        $orderItems[] = $row;
      }
  
      $response = new ServerResponse(data: ["order" => $order, "orderItems" => $orderItems]);
      returnJsonHttpResponse(200, $response);
      break;
  

      case "POST":
        $token = getAuthPayload();
        $userId = $token["accountId"];
    
        // Get the product ID from the request body
        $input = json_decode(file_get_contents('php://input'), true);
        if (!isset($input['productId'])) {
          $response = new ServerResponse(error: ["message" => "Product ID is required"]);
          returnJsonHttpResponse(400, $response);
          exit;
        }
    
        $productId = $input['productId'];
    
        // Check if the product exists in the cart for the user
        $sqlCartItems = $conn->prepare("SELECT productId, quantity FROM tblCart WHERE userId = ? AND productId = ?");
        $sqlCartItems->bind_param("ii", $userId, $productId);
        $sqlCartItems->execute();
        $cartItemsResult = $sqlCartItems->get_result();
    
        if ($cartItemsResult->num_rows === 0) {
          $response = new ServerResponse(error: ["message" => "Product not found in cart"]);
          returnJsonHttpResponse(400, $response);
          exit;
        }
    
        $conn->begin_transaction();
        try {
          // Create the order
          $sqlOrder = $conn->prepare("INSERT INTO tblOrder (buyerId) VALUES (?)");
          $sqlOrder->bind_param("i", $userId);
          $sqlOrder->execute();
    
          $orderId = $conn->insert_id;
    
          while ($row = $cartItemsResult->fetch_assoc()) {
            $quantity = $row["quantity"];
    
            // Insert order item
            $sqlOrderItem = $conn->prepare("INSERT INTO tblOrderItem (orderId, productId, quantity) VALUES (?, ?, ?)");
            $sqlOrderItem->bind_param("iii", $orderId, $productId, $quantity);
            $sqlOrderItem->execute();
    
            // Update product quantity
            $sqlReduceQuantity = $conn->prepare("UPDATE tblProduct SET quantity = quantity - ? WHERE productId = ?");
            $sqlReduceQuantity->bind_param("ii", $quantity, $productId);
            $sqlReduceQuantity->execute();
          }
    
          $conn->commit();
    
          $response = new ServerResponse(data: ["message" => "Product bought successfully", "orderId" => $orderId]);
          returnJsonHttpResponse(200, $response);
        } catch (Exception $e) {
          $conn->rollback();
          $response = new ServerResponse(error: ["message" => "Transaction failed", "details" => $e->getMessage()]);
          returnJsonHttpResponse(500, $response);
        }
        break;
  
    default:
      $response = new ServerResponse(error: ["message" => "Invalid request method"]);
      returnJsonHttpResponse(405, $response);
      break;
  }
