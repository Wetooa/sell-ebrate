<?php

include_once "../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {

    case "GET":
        
            
            $sqlStmnt = "SELECT t.tagName
                         FROM tblTags t
                         JOIN tblTagProduct tp ON t.tagId = tp.tagId
                         JOIN tblProduct p ON  tp.productId = p.productId ORDER BY p.productId";
                         
            $stmt = $conn->prepare($sqlStmnt);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result) {
                $tags = $result->fetch_all(MYSQLI_ASSOC);
                $response = new ServerResponse(data: ["message" => "Tags data fetched successfully", "tags" => $tags], error: []);
                returnJsonHttpResponse(200, $response);
            } else {
                $response = new ServerResponse(data: [], error: ["message" => "Failed to fetch tags data"]);
                returnJsonHttpResponse(500, $response);
            }
        break;

    case "POST":
        try {
            $jsonData = getBodyParameters();
            $requiredFields = ["tagId", "productId"];
            $fields = checkFields($jsonData, $requiredFields);

            $tagId = $fields["tagId"];
            $productId = $fields["productId"];

            $sqlAddTagProduct = "INSERT INTO tblTagProduct (tagId, productId) VALUES (?, ?)";

            $stmt = $conn->prepare($sqlAddTagProduct);
            $stmt->bind_param("ii", $tagId, $productId);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $response = new ServerResponse(data: ["message" => "Tag added to product successfully"], error: []);
                returnJsonHttpResponse(200, $response);
            } else {
                $response = new ServerResponse(data: [], error: ["message" => "Failed to add tag to product"]);
                returnJsonHttpResponse(500, $response);
            }
        } catch (Exception $e) {
            $response = new ServerResponse(data: [], error: ["message" => "An error occurred: " . $e->getMessage()]);
            returnJsonHttpResponse(500, $response);
        }
        break;

    default:
        $response = new ServerResponse(data: [], error: ["message" => "Method not allowed"]);
        returnJsonHttpResponse(405, $response);
        break;
}

?>
