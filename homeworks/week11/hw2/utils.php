<?php
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  $blog_title = '大草原好多牛吃草';
  $blog_subtitle = '哞哞哞';

?>