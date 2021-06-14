<!DOCTYPE html>
<?php
  require_once('conn.php');
  session_start();
  if (!empty($_SESSION)) {
    $username = $_SESSION['username'];
    $nickname = $_SESSION['nickname'];
  }
?>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>

  <header class="warning">
    注意！本站為練習用網站，因教學用途而刻意忽略資安實作，註冊時請勿使用任何真實帳號密碼。
  </header>
  <main class="board">
    <div class="member">
      <?php 
        if (!empty($_SESSION)) {
      ?>
          <div class="member__info">您好，<?php echo $nickname ?></div>
          <a class="logout" href="./handle_logout.php">登出</a>
      <?php
        } else {
      ?>
          <a class="sign-up" href="./sign-up.php">註冊</a> 
          <a class="login" href="./login.php">登入</a>
      <?php
        }
      ?>
    </div>
    <h1 class="board__title">
      留言板
    </h1>
    <?php
      if (!empty($_GET['errCode'])) {
    ?>
    <div class="empty-alert">資料未填寫完整</div>
    <?php
      }
    ?>
    <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
      <?php 
        if (empty($_SESSION)) {
      ?>
          <div class="board__nickname">
            <span>暱稱：</span>
            <input type="text" name="nickname"/>
          </div>
      <?php 
        }
      ?>
      <textarea name="content" rows="5"></textarea>
      <input class="board__submit-btn" type="submit" />
    </form>
    <div class="board__hr"></div>
    <section>
      <?php
        $result = $conn->query("SELECT * FROM `hati8haha_posts`");
        while ($row = $result->fetch_assoc()) { 
      ?>
          <div class="card">
            <div class="card__avatar">
            </div>
            <div class="card__body"><div class="card__info">
                <span class="card__author"><?php echo $row['nickname']; ?></span>
                <span class="card__time"><?php echo $row['created_at']; ?></span>
              </div>
              <p class="card__content"><?php echo $row['content']; ?></p>
            </div>
          </div>
        <?php } ?>
    </section>
  </main>
</body>
</html>