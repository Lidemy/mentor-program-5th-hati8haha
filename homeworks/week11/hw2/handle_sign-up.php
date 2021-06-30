<?php
  session_start();
  require_once('conn.php');
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  if (empty($username) || empty($_POST['password'])) {
    header('Location: sign-up.php?errCode=1');
    die('資料不齊全');
    exit();
  }
  $sqlCheck = "SELECT * FROM hati8haha_blog_users WHERE username = ?";
  $stmt = $conn->prepare($sqlCheck);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  if (!empty($row)) {
    header('Location: sign-up.php?errCode=2');
    die('帳號已有人使用');
    exit();
  }
  $sql = "INSERT INTO hati8haha_blog_users(username, password) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $password);
  $result = $stmt->execute();

  $_SESSION['username'] = $username;
  $_SESSION['login_key'] = 'hati8haha_blog';
?>
<script>
  alert('註冊成功！')
  location.href = 'index.php'
</script>
