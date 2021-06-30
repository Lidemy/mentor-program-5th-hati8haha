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
  

  $username = $_SESSION['username'];
  $title = $_POST['article-title'];
  $category = $_POST['article-category'];
  $content = $_POST['article-textarea'];

  if (empty($title) || empty($content)) {
    //header('Location: handle_new_article.php?errCode=1');
    die('資料不齊全');
    exit();
      }
  $sql = "INSERT INTO hati8haha_blog_articles(author, title, category, content) VALUES (?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssss', $username, $title, $category, $content);
  $stmt->execute();
?>

<script>
  alert('新增文章成功！')
  location.href = 'index.php'
</script>