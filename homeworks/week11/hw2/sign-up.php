<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  if (!empty($_SESSION) && $_SESSION['login_key'] === 'hati8haha_blog') {
    $username = $_SESSION['username'];
  } elseif (!empty($_SESSION) && $_SESSION['login_key'] !== 'hati8haha_blog') {
    header('Location: handle_logout.php');
    die('需登入');
    exit();
  }
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
          <li class="navbar__list-item"><a href="#">關於我</a></li>
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
        <div class="login__block">
          <form class="login__form" method="POST" action="handle_sign-up.php">
            <div class="login__title">Sign up</div>
            <?php
              if (!empty($_GET['errCode'])) {
                if ($_GET['errCode'] === '1') {
                  echo "<div class='empty-alert'>資料未填寫完整</div>";      
                } elseif ($_GET['errCode'] === '2') {
                  echo "<div class='empty-alert'>此帳號已有人註冊</div>";
                }
              }
            ?>
            <div class="login__type">
              <span>username</span>
            </div>
            <input type="text" name="username" class="login__username">
            <div class="login__type">
              <span>password</span>
            </div>
            <input type="password" name="password" class="login__password">
            <input type="submit" class="login__submit">
          </form>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer__content">Copyright © 2020 Who's Blog All Rights Reserved.</div>
    </footer>
  </div>
</body>
</html>