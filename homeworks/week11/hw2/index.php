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
  
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;
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
        <div class="site-name"><a href="index.php">Blog</a></div>
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
    <?php
      $stmt = $conn->prepare("SELECT * FROM `hati8haha_blog_articles` WHERE is_deleted = 1 ORDER BY id DESC LIMIT ? OFFSET ? ");
      $stmt->bind_param('ii', $items_per_page, $offset);
      $result = $stmt->execute();
      $result = $stmt->get_result();
      while ($row = $result->fetch_assoc()) { 
    ?>
      <div class="article__wrapper">
        <div class="article__block">
          <div class="article__block-upper">
            <div class="article__title"><?php echo escape($row['title']); ?></div>
            <?php
              if (!empty($_SESSION)) {
            ?>
            <div class="article__action">
              <a class="article__delete" href=<?php echo 'handle_delete.php?id=' . $row['id']?>>刪除</a>
              <a class="article__edit"  href=<?php echo 'article-edit.php?id=' . $row['id']?>>編輯</a>
            </div>
            <?php } ?>
          </div>
          <div class="article__info">
            <span class="article__time">Created at: <?php echo escape($row['created_at']); ?></span>
            <span class="article__category"><?php echo escape($row['category']); ?></span>
          </div>
          <div class="article__content"><?php echo $row['content']; ?></div>
          <a class="article__read-more" href=<?php echo 'article-page.php?id=' . $row['id']?>>READ MORE</a>
        </div>
      </div>
    <?php
    }
      $stmt = $conn->prepare(
        'select count(id) as count from hati8haha_blog_articles where is_deleted = 1'
      );
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $items_per_page);
    ?>
      <div class="paginator">
        <?php if ($page != 1) { ?> 
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page ?>">最後一頁</a> 
        <?php } ?>
      </div>
      <div class="page-info">
        <span>總共有 <?php echo $count ?> 篇文章，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
    </div>
    <footer>
      <div class="footer__content">Copyright © 2020 Who's Blog All Rights Reserved.</div>
    </footer>
	</div>
</body>
</html>