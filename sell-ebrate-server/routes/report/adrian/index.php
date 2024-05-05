





<?php
include_once "../../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    // TODO: make dynamic later on in life because why not, the world is a much better place if the world was amazing
    $sql1 = "SELECT * FROM tblProduct WHERE price > 10";

    $result = $conn->query($sql1);
    $products = $result->fetch_all(MYSQLI_ASSOC);

    $response = new ServerResponse(data: ["message" => "Products data fetched successfully", "products" => $products], error: []);
    returnJsonHttpResponse(200, $response);

  case "POST":

  case "UPDATE":

  case "DELETE":
}
