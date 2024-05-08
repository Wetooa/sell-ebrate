
<?php
include_once "../../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":

    $requiredFields = ["productId"];
    $jsonData = getBodyParameters();
    $fields = checkFields($jsonData, $requiredFields);


    $sql1 = "
      SELECT * FROM tblProduct AS a 
      JOIN tblAccount AS b ON a.sellerId = b.accountId 
      WHERE a.productId = ? 
    ";

    $result = $conn->execute_query($sql1, [$fields["productId"]]);
    $product = $result->fetch_assoc();


    $sql2 = ""

    // TODO: add validation here if product does not exist
    $response = new ServerResponse(data: ["message" => "Successfully acquired product with id " . $fields["productId"], "product" => $product]);
    returnJsonHttpResponse(200, $response);

  case "POST":

  case "UPDATE":

  case "DELETE":
}
