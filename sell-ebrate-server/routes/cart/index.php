<?php
include_once "../../utils/headers.php";

switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $token = getAuthPayload();
    $accountId = $token["accountId"];

    $sql = "SELECT * FROM tblCart AS a JOIN tblProduct AS b ON a.productId = b.productId WHERE userId = ? ";
    $result = $conn->execute_query($sql, [$accountId]);
    $cart = $result->fetch_all(MYSQLI_ASSOC);


    $response = new ServerResponse(data: ["message" => "User cart fetched successfully", "cart" => $cart]);
    returnJsonHttpResponse(200, $response);
    break;

  case "POST":
    $payload = getBodyParameters();
    $token = getAuthPayload();

    $sql1 = "INSERT INTO tblCart(userId, productId) VALUES(?, ?)";
    $result = $conn->execute_query($sql1, [$token["accountId"], $payload["productId"]]);

    $response = new ServerResponse(data: ["message" => "Cart item added successfully"]);
    returnJsonHttpResponse(200, $response);
    break;

    case "UPDATE":
      //i dunno the logic pa if mag update ko sa tbl kay wa siyay quantity or 
      // just msg me 
      break;

  case "DELETE":
    $payload = getAuthPayload();
    $jsonData = getBodyParameters();

    $productId = $jsonData["productId"];
    $userId = $payload["accountId"];

    $sqlDeleteCartItem = $conn->prepare("DELETE FROM tblCart WHERE userId = ? AND productId = ?");
    $sqlDeleteCartItem->bind_param("ii", $userId, $productId);
    $sqlDeleteCartItem->execute();

    if ($sqlDeleteCartItem->affected_rows > 0) {
      $response = new ServerResponse(data: ["message" => "Item deleted from cart successfully"]);
      returnJsonHttpResponse(200, $response);
    } else {
      $response = new ServerResponse(error: ["message" => "Failed to delete item from cart"]);
      returnJsonHttpResponse(500, $response);
    }
    break;
}
?>
