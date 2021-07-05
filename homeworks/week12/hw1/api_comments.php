<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Acess-Control-Allow-Origin: *');

  if (empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "message" => "Please send site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];

  if (!empty($_GET['from'])) {
    $id_from = intval($_GET['from']);
    $sql = "SELECT nickname, content, created_at, id FROM hati8haha_discussions WHERE id < ? AND site_key = ? ORDER BY id DESC LIMIT 5";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id_from, $site_key);
      } else {
    $sql = "SELECT nickname, content, created_at, id FROM hati8haha_discussions WHERE site_key = ? ORDER BY id DESC LIMIT 5";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $site_key);
  }
  $result = $stmt->execute();

  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $result = $stmt->get_result();
  $discussions = array();
  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"],
      "id" => $row["id"]
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );

  $response = json_encode($json);
  echo $response;
?>