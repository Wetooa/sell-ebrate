
<?php


// Your PHP script logic here

include_once "../../../utils/headers.php";


switch ($_SERVER["REQUEST_METHOD"]) {
  case "GET":
    $token = getAuthPayload();
    $userId = $token["accountId"];

    $sql1 = $conn->prepare("SELECT * FROM tblAccount WHERE accountId = ?");
    $sql1->bind_param("i", $userId);
    $sql1->execute();

    $result = $sql1->get_result();

    if ($result->num_rows == 0) {
        // User does not exist, but return a 200 status code
        $response = new ServerResponse(data: ["message" => "User does not exist"]);
        returnJsonHttpResponse(200, $response);
        break;
    }

    $user = $result->fetch_assoc();
    unset($user["password"]);

    $response = new ServerResponse(data: ["message" => "User data fetched successfully", "user" => $user]);
    returnJsonHttpResponse(200, $response);
    break;
  case "POST":

  case "UPDATE":

  case "DELETE":
}
