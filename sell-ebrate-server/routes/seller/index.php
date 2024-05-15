<?php
include_once "../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {

    case "GET":
        $jsonData = getBodyParameters();

        $requiredFields = ["sellerId"];
        $fields = checkFields($jsonData, $requiredFields);
        //iupdate ko sayo ko wake

        $sellerId = fields["sellerId"];
        
        $sqlGetSeller = "SELECT * FROM tblSeller WHERE sellerId = ?";
        $stmtSeller = $conn->prepare($sqlGetSeller);
        $stmtSeller->bind_param("i", $sellerId);
        $stmtSeller->execute();
        $resultSeller = $stmtSeller->get_result();
        $seller = $resultSeller->fetch_assoc();
        $stmtSeller->close();
        
        if ($seller) {

            $sqlGetProducts = "SELECT productName, price FROM tblProduct WHERE sellerId = ?";
            $stmtProducts = $conn->prepare($sqlGetProducts);
            $stmtProducts->bind_param("i", $sellerId);
            $stmtProducts->execute();
            $resultProducts = $stmtProducts->get_result();
            $products = $resultProducts->fetch_all(MYSQLI_ASSOC);
            $stmtProducts->close();
    
            $response = new ServerResponse(data: ["seller" => $seller, "products" => $products], error: []);
            returnJsonHttpResponse(200, $response);
        } else {
            $response = new ServerResponse(data: [], error: ["message" => "Seller not found or no products available"]);
            returnJsonHttpResponse(404, $response);
        }
        break;
    
  case "POST":
    $jsonData = getBodyParameters();
    $token = getAuthPayload();

    $requiredFields = ["userId", "sellerCertification"];
    $fields = checkFields($jsonData, $requiredFields);

    foreach ($requiredFields as $field) {
      if (!isset($fields[$field])) {
        $response = new ServerResponse(data: [], error: ["message" => "Missing required field: $field"]);
        returnJsonHttpResponse(400, $response);
        exit;
      }
    }

    $authId = $fields['userId'];
    $sellerCertification = $fields['sellerCertification'];

    $sqlInsertSeller = "INSERT INTO tblSeller (sellerId, sellerCertification) VALUES (?, ?)";
    $stmt = $conn->prepare($sqlInsertSeller);
    $stmt->bind_param("is", $authId, $sellerCertification);

    if ($stmt->execute()) {
      $response = new ServerResponse(data: ["message" => "Seller entry created successfully"], error: []);
      returnJsonHttpResponse(201, $response);
    } else {
      $response = new ServerResponse(data: [], error: ["message" => "Failed to create seller entry"]);
      returnJsonHttpResponse(500, $response);
    }
    break;

  default:
    $response = new ServerResponse(data: [], error: ["message" => "Invalid request method"]);
    returnJsonHttpResponse(405, $response);
    break;
}