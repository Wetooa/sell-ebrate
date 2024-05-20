

<?php


include_once __DIR__ . "../../meta/env.php";


// automatically makes route protected
// TODO: improve this later on
function getAuthPayload()
{
  global $secretKey;

  if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $response = new ServerResponse(error: ["message" => "Authorization header is missing"]);
    returnJsonHttpResponse(401, $response);
    exit;
  }


  $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];

  if (!preg_match('/^Bearer\s([a-zA-Z0-9\-_=]+?\.[a-zA-Z0-9\-_=]+?\.[a-zA-Z0-9\-_=]+)$/', $authorizationHeader, $matches)) {
    $response = new ServerResponse(error: ["message" => "Invalid Authorization header"]);
    returnJsonHttpResponse(400, $response);
    exit;
  }

  $token = $matches[1];
  list($header, $payload, $signature) = explode('.', $token);

  $headerDecoded = uncleanData($header);
  $payloadDecoded = uncleanData($payload);
  $expectedSignature = hash_hmac('sha256', "$header.$payload", $secretKey);

  if ($signature !== $expectedSignature) {
    $response = new ServerResponse(error: ["message" => "Invalid signature"]);
    returnJsonHttpResponse(400, $response);
    exit;
  }

  return $payloadDecoded;
}
