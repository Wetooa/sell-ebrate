

<?php
include_once "../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $payload = getBodyParameters();

    $sql1 = "SELECT * FROM tblCart a JOIN tblCartItem b ON a.cartId = b.cartId AND a.userId = ? JOIN tblProduct c ON b.productId = c.productId";
    $result = $conn->execute_query($sql1, [$payload["accountId"]]);
    $cart = $result->fetch_all(MYSQLI_ASSOC);

    $response = new ServerResponse(data: ["message" => "User cart fetched successfully", "cart" => $cart]);
    returnJsonHttpResponse(200, $response);

  case "POST":
    $payload = getBodyParameters();
    $token = getAuthPayload();

    $sql1 = "INSERT INTO tblCart(userId, productId) VALUES(?, ?)";
    $result = $conn->execute_query($sql1, [$payload["accountId"]]);

    $response = new ServerResponse(data: ["message" => "Cart item added successfully"]);
    returnJsonHttpResponse(200, $response);



  case "UPDATE":

  case "DELETE":
}
