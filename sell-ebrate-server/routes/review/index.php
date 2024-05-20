<?php

include_once "../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {

  case "GET":
    $sqlGetReviews = "
            SELECT 
                r.reviewId, r.rating, r.message, r.userId, r.productId,
                a.firstName, a.lastName 
            FROM 
                tblReview r
            INNER JOIN 
                tblAccount a ON r.userId = a.accountId
            WHERE 
              r.productId = ? 
            ORDER BY 
                r.rating DESC 
        ";

    $result = $conn->execute_query($sqlGetReviews, [$_GET["productId"]]);

    if (!$result) {
      $response = new ServerResponse(error: ["message" => "Error executing query: " . $conn->error]);
      returnJsonHttpResponse(500, $response);
      break;
    }

    if ($result->num_rows > 0) {
      $reviews = $result->fetch_all(MYSQLI_ASSOC);
      $response = new ServerResponse(data: ["reviews" => $reviews]);
      returnJsonHttpResponse(200, $response);
    } else {
      $response = new ServerResponse(data: ["message" => "No reviews found"]);
      returnJsonHttpResponse(404, $response);
    }
    break;

  case "POST":
    $jsonData = getBodyParameters();
    $token = getAuthPayload();

    $requiredFields = ["productId", "rating", "message"];
    $fields = checkFields($jsonData, $requiredFields);

    $userId = $token["accountId"];

    $sqlInsertReview = $conn->prepare("INSERT INTO tblReview (userId, productId, rating, message) VALUES (?, ?, ?, ?)");
    $sqlInsertReview->bind_param("iiis", $userId, $fields["productId"], $fields["rating"], $fields["message"]);
    $sqlInsertReview->execute();

    if ($sqlInsertReview->affected_rows > 0) {
      $response = new ServerResponse(data: ["message" => "Review added successfully"]);
      returnJsonHttpResponse(200, $response);
    } else {
      $response = new ServerResponse(error: ["message" => "Failed to add review"]);
      returnJsonHttpResponse(500, $response);
    }
    break;

  case "UPDATE":
    $jsonData = getBodyParameters();
    $token = getAuthPayload();

    $requiredFields = ["reviewId", "productId", "rating", "message"];
    $fields = checkFields($jsonData, $requiredFields);

    $userId = $token["accountId"];

    $reviewId = $fields["reviewId"];
    $sqlCheckOwnership = $conn->prepare("SELECT userId FROM tblReview WHERE reviewId = ?");
    $sqlCheckOwnership->bind_param("i", $reviewId);
    $sqlCheckOwnership->execute();
    $result = $sqlCheckOwnership->get_result();

    if ($result->num_rows == 0) {
      $response = new ServerResponse(error: ["message" => "Review not found"]);
      returnJsonHttpResponse(404, $response);
      break;
    }

    $row = $result->fetch_assoc();
    if ($row["userId"] != $userId) {
      $response = new ServerResponse(error: ["message" => "User does not own this review"]);
      returnJsonHttpResponse(403, $response);
      break;
    }

    $sqlUpdateReview = $conn->prepare("UPDATE tblReview SET productId = ?, rating = ?, message = ? WHERE reviewId = ?");
    $sqlUpdateReview->bind_param("iisi", $fields["productId"], $fields["rating"], $fields["message"], $reviewId);
    $sqlUpdateReview->execute();

    if ($sqlUpdateReview->affected_rows > 0) {
      $response = new ServerResponse(data: ["message" => "Review updated successfully"]);
      returnJsonHttpResponse(200, $response);
    } else {
      $response = new ServerResponse(error: ["message" => "Failed to update review"]);
      returnJsonHttpResponse(500, $response);
    }
    break;

  case "DELETE":
    $jsonData = getBodyParameters();
    $token = getAuthPayload();

    if (!isset($jsonData["reviewId"])) {
      $response = new ServerResponse(error: ["message" => "reviewId is required"]);
      returnJsonHttpResponse(400, $response);
      break;
    }

    $reviewId = $jsonData["reviewId"];
    $userId = $token["accountId"];

    $sqlCheckOwnership = $conn->prepare("SELECT userId FROM tblReview WHERE reviewId = ?");
    $sqlCheckOwnership->bind_param("i", $reviewId);
    $sqlCheckOwnership->execute();
    $result = $sqlCheckOwnership->get_result();

    if ($result->num_rows == 0) {
      $response = new ServerResponse(error: ["message" => "Review not found"]);
      returnJsonHttpResponse(404, $response);
      break;
    }

    $row = $result->fetch_assoc();
    if ($row["userId"] != $userId) {
      $response = new ServerResponse(error: ["message" => "User does not own this review"]);
      returnJsonHttpResponse(403, $response);
      break;
    }

    $sqlDeleteReview = $conn->prepare("DELETE FROM tblReview WHERE reviewId = ?");
    $sqlDeleteReview->bind_param("i", $reviewId);
    $sqlDeleteReview->execute();

    if ($sqlDeleteReview->affected_rows > 0) {
      $response = new ServerResponse(data: ["message" => "Review deleted successfully"]);
      returnJsonHttpResponse(200, $response);
    } else {
      $response = new ServerResponse(error: ["message" => "Failed to delete review"]);
      returnJsonHttpResponse(500, $response);
    }
    break;

  default:
    $response = new ServerResponse(error: ["message" => "Method not allowed"]);
    returnJsonHttpResponse(405, $response);
    break;
}
