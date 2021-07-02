## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
雜湊跟加密的最重要的差別是加密可以解密，而雜湊不行還原。因此密碼要雜湊過後才存入資料庫。
### 加密 encryption
透過演算法與 key，將字串計算得出加密後的密文，根據是否使用同一組 key 加密與解密可分為對稱加密法與與非對稱加密法。
加密是一對一關係，若知道 key 跟演算法也會被解開

明文 => 加密 => 密文
密文 => 解密 => 明文

### 雜湊 hash
將字元丟進去某個公式計算的方式就叫做雜湊（Hash），而這個計算公式就稱為雜湊函數（Hash function）

雜湊為多對一關係，這也是無法還原的原因

明文 => hash => 文字

若兩個不同密碼產生同個 hash 稱碰撞

## `include`、`require`、`include_once`、`require_once` 的差別

`include` 與 `require` 都是用來引入既有的外部 php 檔案至目前檔案中執行。

兩者差別在於若引入的檔案執行出現錯誤時，`include` 會產生 E_WARNING（非致命的執行時錯誤，程式會繼續執行），而 `require` 則會產生 E_COMPILE_ERROR（程式會停止）

`include_once`、`require_once` 與 `include`、`require` 功能幾乎一樣，唯一的差別是 `include_once`、`require_once` 會先檢查要引入的檔案是否已經在該程式中被引入過，如果有的話就不會再次重複引入該檔案。


## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
輸入特定含有 sql 語法的資料，讓 sql query 內容被竄改，達到符合攻擊目的。
例如以下範例：
```sql=
SELECT * FROM hati8haha_users WHERE username = $username AND password = $password
```
正常情況下變數 `$username` 與 `$password` 會帶入使用者輸入的資料，若有符合條件才會列出。
但若將 `$password` 替換成 `' OR 1=1 #` 那麼就會執行以下 sql query
```sql=
SELECT * FROM hati8haha_users WHERE username = 'username' AND password = '' OR 1=1 #'
```
因為 `OR 1=1`，因此無論輸入任何帳號密碼都可以取得身分認證成功登入。

### 防範方法：Prepared statement
將傳進去的資料用編譯後的參數替代，不會直接用原始資料進行 sql query

php 的 prepared statement 範例：
```php=
$sql = "insert into comments(nickname, content) values(?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $content);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}
$result = $stmt->get_result()
```

##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
XSS 為 Cross-site Scriptinng 的縮寫，中文為「跨網站指令碼」。

利用網站漏洞將帶有程式的 `<script>` 標籤或其它腳本程式注入網站，讓攻擊者可以取得更高的權限，例如讓網站重新導向至惡意連結或取得 cookie 等。

### 防範方法：避免直接輸出
1. 跳脫
   若能將 `<script>` 經過編碼轉換，在 html 渲染時以純文字的方式印出，就能避免 XSS。
2. 過濾
   若需要將使用者輸入文字以 html 渲染出來，例如部落格文章中的 `<h1>`、`<h2>`、`<h3>` 等標籤，則可以採用過濾的方式，把 `script`、`iframe` 等標籤針對性的不直接印出。


## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
CSRF 的全名為 Cross Site Request Forgery，中文名為「跨站請求偽造」，也被稱為 one-click attack。

CSRF 的攻擊模式是在使用者連線至惡意網站時，以 client 端儲存的 cookie 或 session 偽造使用者發送的 request，達到攻擊目的。

例如小明在登入網路銀行之後，在開啟新分頁玩小遊戲，但小遊戲網頁卻有隱藏的惡意連結，會發送轉帳的 request，因為有網路銀行的 session 是登入狀態，因此小明的錢就莫名其妙被轉帳到駭客帳戶了。

### 防範方法：檢查 Referer、CSRF token
CSRF 的 reuqest 跟使用者本人發出的 request 的不同就在於發送 request 的 domain 一個是來自不同 domain，另一個則是來自同 domain。檢查 Referer、CSRF token 兩種方法都是透過此概念實行的防禦手段。
1. 檢查 Referer
   request 的 header 裡面會帶一個欄位是 referer ，可以從 referer 這個欄位看到該 request 是從哪發送的。因此可以透過此方式檢查是否為跨站 request。但有部分瀏覽器不會帶 referer 或使用者會關掉自動帶 referer 功能，同時檢查 referer 的程式若沒寫好可能會有漏洞。
2. CSRF token
   CSRF token 是產生一組只有使用者知道的隨機 token，在發送 request 時需要帶上這個 token 才能通過驗證。CSRF token 有儲存在 server 端或儲存在 client 端的作法。因為攻擊者的沒辦法讀寫目標網站的 cookie，所以可以用來驗證是否為跨 domain 的 request。
