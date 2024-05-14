<?php

include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $searchKeyword = $_GET['searchKeyword'] ?? null;

    // FIX: not working on my end
    if ($searchKeyword) {
      $sqlGetProducts = "SELECT * FROM tblProduct WHERE MATCH(productName, description) AGAINST (? IN NATURAL LANGUAGE MODE) ORDER BY clicks LIMIT 10";
      $stmt = $conn->prepare($sqlGetProducts);
      $stmt->bind_param("s", $searchKeyword);
    } else {
      $sqlGetProducts = "SELECT * FROM tblProduct ORDER BY clicks LIMIT 10";
      $stmt = $conn->prepare($sqlGetProducts);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);

    $response = new ServerResponse(data: ["message" => "Products data fetched successfully", "products" => $products]);
    returnJsonHttpResponse(200, $response);
}
