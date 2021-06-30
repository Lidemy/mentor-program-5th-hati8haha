<?php
  require_once('conn.php');
  require_once("utils.php");
  if (empty($_GET)) {
    header("Location: index.php");
    exit();
  }


  $get_id = $_GET['id'];
  $stmt = $conn->prepare("SELECT * FROM `hati8haha_blog_articles` WHERE id = ?");
  $stmt->bind_param('i', $get_id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="normalize.css">
  <title>Blog</title>
</head>
<body>
  <div class="outter__wrapper">
    <nav class="navbar">
      <div class="nav__left">
        <div class="site-name"><a href="index.php">My Blog</a></div>
        <ul class="navbar__list">
          <li class="navbar__list-item"><a href="article-page.php">文章列表</a></li>
          <li class="navbar__list-item"><a href="#">分類專區</a></li>
        </ul>
      </div>
      <div class="nav__right">
        <ul class="navbar__list">
          <?php
            if (!empty($_SESSION)) {
          ?>
          <li class="navbar__list-item"><a href="article-edit.php">新增文章</a></li>
          <li class="navbar__list-item"><a href="blog-admin.php">管理後臺</a></li>
          <li class="navbar__list-item"><a href="handle_logout.php">登出</a></li>
          <?php
            } else {
          ?>
          <li class="navbar__list-item"><a href="login.php">登入</a></li>
          <?php
            }
          ?>
        </ul>
      </div>
    </nav>

    <div class="banner">
      <div class="blog__title"><?php echo $blog_title; ?></div>
      <div class="blog__subtitle"><?php echo $blog_subtitle; ?></div>
    </div>

    <div class="main">
      <div class="article__wrapper">
        <div class="article__block">
          <div class="article__block-upper">
            <div class="article__title"><h1><?php echo escape($row['title']);?></h1></div>
            <div class="article__action">
              <a class="article__delete">刪除</a>
              <a class="article__edit">編輯</a>
            </div>
          </div>
          <div class="article__info">
            <span class="article__time">Created at: <?php echo escape($row['created_at']);?></span>
            <span class="article__category"><?php echo escape($row['category']);?></span>
          </div>
          <div class="article__content article__page"><?php echo $row['content'];?></div>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer__content">Copyright © 2020 Who's Blog All Rights Reserved.</div>
    </footer>
  </div>
</body>
</html>