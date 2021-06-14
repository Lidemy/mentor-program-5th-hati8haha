<?php
  require_once('conn.php');
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  if (empty($nickname) || empty($username) || empty($password)) {
    header('Location: sign-up.php?errCode=1');
    die('資料不齊全');
    exit();
  }
  $sqlCheck = sprintf("SELECT * FROM hati8haha_users WHERE username = '%s'", $username);
  $result = $conn->query($sqlCheck);
  $row = $result->fetch_assoc();
  if (!empty($row)) {
    header('Location: sign-up.php?errCode=2');
    die('帳號已有人使用');
    exit();
  }
  $sql = sprintf("INSERT INTO hati8haha_users(nickname, username, password) VALUES ('%s', '%s', '%s')",
    $nickname,
    $username,
    $password);
  $conn->query($sql);
?>
<script>
  alert('註冊成功！請登入')
  location.href = 'login.php'
</script>
<?php
  //header("Location: login.php");
?>