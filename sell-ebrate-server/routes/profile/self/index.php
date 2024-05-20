
<?php
include_once "../../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $token = getAuthPayload();
    $userId = $token["accountId"];
    $conn->begin_transaction();


    $sql1 = $conn->prepare("SELECT * FROM tblAccount WHERE accountId = ?");
    $sql1->bind_param("i", $userId);
    $sql1->execute();

    $result = $sql1->get_result();

    if ($result->num_rows == 0) {
      $response = new ServerResponse(error: ["message" => "User does not exist"]);
      returnJsonHttpResponse(400, $response);
    }

    $user = $result->fetch_assoc();
    unset($user["password"]);

    $response = new ServerResponse(data: ["message" => "User data fetched successfully", "user" => $user]);
    returnJsonHttpResponse(200, $response);

  case "POST":

  case "UPDATE":

  case "DELETE":
}
