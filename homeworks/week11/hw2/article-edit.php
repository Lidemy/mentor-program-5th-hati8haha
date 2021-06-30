<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  if (!empty($_SESSION) && $_SESSION['login_key'] === 'hati8haha_blog') {
    $username = $_SESSION['username'];
  } else {
    header('Location: handle_logout.php');
    die('需登入');
    exit();
  }
  
  if (!empty($_GET)) {
    $edit_old_article = true;
    $get_id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM `hati8haha_blog_articles` WHERE id = ?");
    $stmt->bind_param('i', $get_id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
  } else {
    $edit_old_article = false;
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
            <div class="article__title"><h1>發表文章：</h1></div>
            <div class="article__action"></div>
          </div>
          <div class="article__form-block">
            <?php
              if ($edit_old_article) {
                echo "<form action='handle_update.php?id=". $get_id ."' method='post' class='article__form'>";
                echo "<input type='number' name='id' value=" . $get_id . " style='display: none;'>";
              ?>
              <input type="text" name="article-title" class="article__edit-title" placeholder="請輸入標題"
              <?php
                  echo "value='" . escape($row['title']) . "'";
              ?>
              >
              <select name="article-category" class="article__edit-category">
                <option value="" disabled selected>請選擇文章分類</option>
                <option value="德國邊境牧羊犬" <?php if ($row['category'] === '德國邊境牧羊犬') {
                    echo "selected='selected'";
                  } ?>>
                  德國邊境牧羊犬
                </option>
                <option value="敘利亞倉鼠" <?php if ($row['category'] === '敘利亞倉鼠') {
                    echo "selected='selected'";
                  } ?>>
                  敘利亞倉鼠
                </option>
                <option value="亞馬遜猛龍" <?php if ($row['category'] === '亞馬遜猛龍') {
                    echo "selected='selected'";
                  } ?>>
                  亞馬遜猛龍
                </option>
              </select>
              <textarea id="editor" name="article-textarea" class="article__edit-content"><?php
                    echo escape($row['content']);
                ?>
              </textarea>
              <input type="submit" class="article__submit">
            </form>
            <?php
              } else {
            ?>
            <form action="handle_new_article.php" method="post" class="article__form">
              <input type="text" name="article-title" class="article__edit-title" placeholder="請輸入標題">
              <select name="article-category" class="article__edit-category">
                <option value="" disabled selected>請選擇文章分類</option>
                <option value="德國邊境牧羊犬">
                  德國邊境牧羊犬
                </option>
                <option value="敘利亞倉鼠">
                  敘利亞倉鼠
                </option>
                <option value="亞馬遜猛龍">
                  亞馬遜猛龍
                </option>
              </select>
              <textarea id="editor" name="article-textarea" class="article__edit-content"></textarea>
              <input type="submit" class="article__submit">
            </form>
            <?php
              }
            ?>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer__content">Copyright © 2020 Who's Blog All Rights Reserved.</div>
    </footer>
  </div>
  <script src="https://cdn.ckeditor.com/ckeditor5/28.0.0/classic/ckeditor.js"></script>
  <script>
    let editor;
    ClassicEditor
      .create( document.querySelector( '#editor' ) )
      .then( newEditor => {
        editor = newEditor;
        console.log( editor );
      } )
      .catch( error => {
        console.error( error );
      } );

    document.querySelector("input[type='submit']").addEventListener('click', (e) => {
      let submitPass = true
      let checkTitle = document.querySelector('.article__edit-title').value
      let checkCategory = document.querySelector('.article__edit-category').value
      const editorData = editor.getData()

      if (document.querySelector('.empty-alert')) {
        document.querySelector('.empty-alert').remove()
      }
      
      let notify = (data) => {
        let div = document.createElement('div')
        div.classList.add('empty-alert')
        div.innerHTML = `欄位未填寫完整`
        data.parentNode.appendChild(div)
      }

      if (checkTitle === '' || checkCategory === '' || editorData === '') {
        notify(document.querySelector('.article__edit-title'))
        e.preventDefault()
      }
    })
  </script>
</body>
</html>