<?php

include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $productName = $_GET['productName'] ?? null;

        if ($productName) {
            $sqlGetProducts = "SELECT * FROM tblProduct WHERE MATCH(productName, description) AGAINST (? IN NATURAL LANGUAGE MODE) LIMIT 10";
            $stmt = $conn->prepare($sqlGetProducts);
            $stmt->bind_param("s", $productName);
        } else {
            $sqlGetProducts = "SELECT * FROM tblProduct LIMIT 10";
            $stmt = $conn->prepare($sqlGetProducts);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        $products = $result->fetch_all(MYSQLI_ASSOC);

        $response = new ServerResponse(data: ["message" => "Products data fetched successfully", "products" => $products]);
        returnJsonHttpResponse(200, $response);
        break;
}
?>
