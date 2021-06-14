<?php
  require_once('conn.php');
  session_start();
  $username = $_POST['username'];
  $password = $_POST['password'];
  if (empty($username) || empty($password)) {
    header('Location: login.php?errCode=1');
    die('資料不齊全');
    exit();
  }

  $sql = sprintf("SELECT * FROM hati8haha_users WHERE username = '%s' AND password = '%s'",
    $username,
    $password);
  $result = $conn->query($sql);

  if ($result->num_rows === 0) {
    header('Location: login.php?errCode=2');
    echo "nono";
    die('帳號或密碼有誤');
    exit();
  }

  if ($result->num_rows) {
    $_SESSION['username'] = $username;
    $_SESSION['nickname'] = $result->fetch_assoc()['nickname'];
    print_r($_SESSION['nickname']);
  }

  header("Location: index.php");
?>