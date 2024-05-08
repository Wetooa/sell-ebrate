<?php
include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $action = $_GET['action'] ?? '';
    $response = null;

    switch ($action) {
      case "getProductCount":
        $sqlProd = "SELECT COUNT(productId) AS product_count FROM tblProduct";
        $result = $conn->query($sqlProd);
        $prodCount = $result->fetch_assoc();
        $response = new ServerResponse(data: ["message" => "Product count retrieved successfully", "product_count" => $prodCount['product_count']], error: []);

      case "getSellerCount":
        $sqlSeller = "SELECT COUNT(sellerId) AS seller_count FROM tblSeller";
        $result = $conn->query($sqlSeller);
        $sellerCount = $result->fetch_assoc();
        $response = new ServerResponse(data: ["message" => "Seller count retrieved successfully", "seller_count" => $sellerCount['seller_count']], error: []);

      case "getBuyerCount":
        $sqlBuyer = "SELECT COUNT(buyerId) AS buyer_count FROM tblBuyer";
        $result = $conn->query($sqlBuyer);
        $buyerCount = $result->fetch_assoc();
        $response = new ServerResponse(data: ["message" => "Buyer count retrieved successfully", "buyer_count" => $buyerCount['buyer_count']], error: []);

      case "getPaymentCount":
        $sqlPayment = "SELECT COUNT(paymentId) AS payment_count FROM tblPayment";
        $result = $conn->query($sqlPayment);
        $paymentCount = $result->fetch_assoc();
        $response = new ServerResponse(data: ["message" => "Payment count retrieved successfully", "payment_count" => $paymentCount['payment_count']], error: []);

      case "getReviewCount":
        $sqlReview = "SELECT COUNT(reviewId) AS review_count FROM tblReview";
        $result = $conn->query($sqlReview);
        $reviewCount = $result->fetch_assoc();
        $response = new ServerResponse(data: ["message" => "Review count retrieved successfully", "review_count" => $reviewCount['review_count']], error: []);

      default:
        returnJsonHttpResponse(400, new ServerResponse(error: json_encode(array("message" => "Method Not Found"))));
    }
    returnJsonHttpResponse(200, $response);

  default:
    returnJsonHttpResponse(405, new ServerResponse(error: json_encode(array("message" => "Method Not Allowed"))));
}
