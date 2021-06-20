<?php
  require_once('conn.php');
  session_start();
  if (empty($_SESSION)) {
    $nickname = $_POST['nickname'];
  } else {
    $nickname = $_SESSION['nickname'];
  }
  
  $content = $_POST['content'];
  if (empty($nickname) || empty($content)) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
    exit();
      }
  $sql = sprintf("INSERT INTO hati8haha_posts(nickname, content) VALUES ('%s', '%s')",
    $nickname,
    $content);
  $conn->query($sql);
  header("Location: index.php");
?>