<?php
  require_once('conn.php');
  session_start();
  if (!empty($_SESSION) && $_SESSION['login_key'] === 'hati8haha_blog') {
    $username = $_SESSION['username'];
  } else {
    header('Location: handle_logout.php');
    die('需登入');
    exit();
  }
  
  $comment_id = $_GET['id'];

  $sql = "SELECT * FROM hati8haha_blog_articles WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $comment_id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();


  if ($username === $row['author']) {
    $sql_delete = "UPDATE `hati8haha_blog_articles` SET `is_deleted`=0 WHERE `id`=?";
    $stmt = $conn->prepare($sql_delete);
    $stmt->bind_param('i', $comment_id);
    $result = $stmt->execute();
  } else {
?>
    <script>
      alert('刪除失敗')
      location.href = 'index.php'
    </script>
<?php
    exit();
  }
  if ($_GET['page'] === 'admin') {
    header("Location: blog-admin.php");
    exit();
  } else {
    header("Location: index.php");
  }
?>
