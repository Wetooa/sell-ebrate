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

  case "UPDATE":

  case "DELETE":
}
