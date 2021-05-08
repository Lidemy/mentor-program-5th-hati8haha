## 請以自己的話解釋 API 是什麼

API 是 Application Programming Interface 的縮寫，中文稱作「應用程式介面」，是應用程式之間用以進行**資料交換**的介面。

例如我想取用 twitch 的實況人數資料，這時就可以從 twitch 的 API 取得資料；或著我想在網站上新增 PayPal 付款的功能，這時就可以透過 PayPal API 實現功能。

從上面的例子可以知道，如果要利用別人已經建立好的資料、函式庫或功能，這時就可以透過 API 來實現。而作為使用者與被使用者之間的橋樑，就是 API 這個介面。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

### 205 Reset Content
與 204 同樣是伺服器成功處理了請求，沒有任何內容返回。但 205 會要求使用者重置文件，例如清空表單、重置 canvas 狀態或刷新 UI。

### 401 Unauthorized
401 為使用者在發送 request 時缺少必要的憑據。

### 409 Conflict
表示因為 request 之間存在衝突導致無法處理，例如多個同步更新之間的編輯衝突。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### 餐廳平台 API 文件

|       說明       | Method |       path      |           參數          |         範例         |
|------------------|--------|-----------------|-------------------------|----------------------|
| 回傳所有餐廳資料  | GET    | /restaurants     | _limit:限制回傳資料數量  | /restaurants?_limit=5 |
| 回傳單一餐廳資料  | GET    | /restaurants/:id | 無                     | /restaurants/20       |
| 新增餐廳         | POST   | /restaurants    | name:餐廳名稱           | 無                   |
| 刪除餐廳         | DELETE | /restaurants/:id | 無                    | 無                   |
| 更改餐廳資訊     | PATH   | /restaurant/:id | name:餐廳名稱           | 無                   |