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
  
  if (!$_GET['id']) {
    header('Location: index.php?errCode=1');
    die('QQ');
    exit();
  }

  $username = $_SESSION['username'];
  $title = $_POST['article-title'];
  $category = $_POST['article-category'];
  $content = $_POST['article-textarea'];
  $get_id = $_GET['id'];

  $sql = "SELECT * FROM hati8haha_blog_articles WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $get_id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($username === $row['author']) {
    $sql_posts = "UPDATE `hati8haha_blog_articles` SET `title`=?, `content`=?, `category`=? WHERE `id`=?";
    $stmt = $conn->prepare($sql_posts);
    $stmt->bind_param('sssi', $title, $content, $category, $get_id);
    $result = $stmt->execute();
  } else {
    echo "<script type='text/javascript'>alert('修改失敗');location.href = 'index.php';</script>";
    exit();
  }
?>
<script>
  alert('修改文章成功！')
  location.href = 'index.php'
</script>
