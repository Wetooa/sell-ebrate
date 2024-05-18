
<?php 

    include_once "../../utils/headers.php";

    switch ($_SERVER["REQUEST_METHOD"]) {

    case "GET":
                
        $sqlStmnt = "SELECT * FROM tblTags";

        $result = $conn->query($sqlStmnt);

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
                $requiredFields = ["tagName"];
                $fields = checkFields($jsonData, $requiredFields);
    
                $tagName = $fields["tagName"];
    
                $sqlAddTags = "INSERT INTO tblTags (tagName) VALUES (:tagName)";
    
                $stmt = $conn->prepare($sqlAddTags);
                $stmt->bindParam("s", $tagName);
                $stmt->execute();
    
                $newTagId = $conn->lastInsertId();
    
                if (!$newTagId) {
                    $response = new ServerResponse(["error" => ["message" => "Tag insertion failed"]]);
                    returnJsonHttpResponse(404, $response);
                } else {
                    $response = new ServerResponse(["message" => "Tag added successfully", "tagId" => $newTagId]);
                    returnJsonHttpResponse(200, $response);
                }
            } catch (Exception $e) {
                $response = new ServerResponse(["message" => "An error occurred: " . $e->getMessage()]);
                returnJsonHttpResponse(500, $response);
            }
            break;
    
        default:
            $response = new ServerResponse(["message" => "Method not allowed"]);
            returnJsonHttpResponse(405, $response);
            break;
    }
    




?>