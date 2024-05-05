<?php
include_once "../../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $sql1 = "SELECT * FROM tblReview WHERE rating = 5";

    $result = $conn->query($sql1);
    $review = $result->fetch_all(MYSQLI_ASSOC);

    $response = new ServerResponse(data: ["message" => "Reviews data fetched successfully", "reviews" => $review], error: []);
    returnJsonHttpResponse(200, $response);

    case "POST":
        $jsonData = getBodyParameters();
        $requiredFields = ["reviewId", "message"];
        $fields = checkFields($jsonData, $requiredFields);

        $sql = $conn->prepare("INSERT INTO tblReply (reviewId, message) VALUES (?, ?)");
        $sql->bind_param("is", $fields["reviewId"], $fields["message"]);
        $sql->execute();

        if ($sql->affected_rows > 0) {
            $response = new ServerResponse(data: ["message" => "Reply added successfully"]);
            returnJsonHttpResponse(200, $response);
        } else {
            $response = new ServerResponse(error: ["message" => "Failed to add reply"]);
            returnJsonHttpResponse(500, $response);
        }
        break;
    
    case "UPDATE":
        $jsonData = getBodyParameters();
        $requiredFields = ["replyId", "reviewId", "message"];
        $fields = checkFields($jsonData, $requiredFields);

        $sql = $conn->prepare("UPDATE tblReply SET reviewId = ?, message = ? WHERE replyId = ?");
        $sql->bind_param("isi", $fields["reviewId"], $fields["message"], $fields["replyId"]);
        $sql->execute();

        if ($sql->affected_rows > 0) {
            $response = new ServerResponse(data: ["message" => "Reply updated successfully"]);
            returnJsonHttpResponse(200, $response);
        } else {
            $response = new ServerResponse(error: ["message" => "Failed to update reply"]);
            returnJsonHttpResponse(500, $response);
        }
        break;
    
    case "DELETE":
        $jsonData = getBodyParameters();
        $requiredFields = ["replyId"];
        $fields = checkFields($jsonData, $requiredFields);

        $sqlDeleteReply = $conn->prepare("DELETE FROM tblReply WHERE replyId = ?");
        $sqlDeleteReply->bind_param("i", $fields["replyId"]);
        $sqlDeleteReply->execute();

        if ($sqlDeleteReply->affected_rows > 0) {
            $response = new ServerResponse(data: ["message" => "Reply deleted successfully"]);
            returnJsonHttpResponse(200, $response);
        } else {
            $response = new ServerResponse(error: ["message" => "Failed to delete reply"]);
            returnJsonHttpResponse(500, $response);
        }
        break;
}
