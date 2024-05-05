<?php

include_once "../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $sql1 = "SELECT * FROM tblProduct";
        $result = $conn->query($sql1);
        $products = $result->fetch_all(MYSQLI_ASSOC);
        $response = new ServerResponse(data: ["message" => "Products data fetched successfully", "products" => $products], error: []);
        returnJsonHttpResponse(200, $response);
        break;

    case "POST":
        $jsonData = getBodyParameters();
        $requiredFields = ["sellerId", "productName", "description", "quantity", "price"];
        $fields = checkFields($jsonData, $requiredFields);
        $sql1 = $conn->prepare("INSERT INTO tblProduct(sellerId, productName, description, quantity, price) VALUES(?, ?, ?, ?, ?)");
        $sql1->bind_param("isssi", $fields["sellerId"], $fields["productName"], $fields["description"], $fields["quantity"], $fields["price"]);
        $sql1->execute();
        $response = new ServerResponse(data: ["message" => "Product added to store successfully!"]);
        returnJsonHttpResponse(200, $response);
        break;

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
        $sql1->bind_param(str_repeat("s", count($fieldsValues)), ...$fieldsValues);
        $sql1->execute();

        $response = new ServerResponse(data: ["message" => "Product updated successfully!"]);
        returnJsonHttpResponse(200, $response);
        break;

    case "DELETE":
        $requiredFields = ["productId"];
        $jsonData = getBodyParameters();
        $token = getAuthPayload();
        $fields = checkFields($jsonData, $requiredFields);

        $sql1 = $conn->prepare("SELECT sellerId FROM tblProduct WHERE productId = ?");
        $sql1->bind_param("i", $fields["productId"]);
        $sql1->execute();
        $result = $sql1->get_result()->fetch_assoc();

        if ($result["sellerId"] != $token) {
            $response = new ServerResponse(error: ["message" => "User does not own this product!"]);
            returnJsonHttpResponse(400, $response);
        }

        $sql2 = $conn->prepare("DELETE FROM tblProduct WHERE productId = ?");
        $sql2->bind_param("i", $fields["productId"]);
        $sql2->execute();

        $response = new ServerResponse(data: ["message" => "Product deleted successfully!"]);
        returnJsonHttpResponse(200, $response);
        break;
}
?>
