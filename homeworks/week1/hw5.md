## 請解釋後端與前端的差異。

### 前端
使用者在網站可以看見、互動的元素皆屬於網頁前端，包含排版設計、連結、互動按鈕等等。
### 後端
在使用者與網頁前端互動之後，會產生資料需要存取。會運用到網頁資料的功能與資料庫屬於後端的範疇。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 瀏覽器會去訪問 DNS 伺服器
2. DNS 伺服器給 IP 位置
3. 瀏覽器送 request 給該 IP 
4. 位在該 IP 的 server 收到 request
5. server 去資料庫找關鍵字
6. 資料庫找到關鍵字，將結果回傳給server
7. server 回傳 response 給瀏覽器
8. 瀏覽器解析回傳 

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
1. `less`
`less` 加檔案名稱可分頁式看檔案內容，可用上下鍵調整頁面閱讀。按 `q` 退出。
2. `time`
查看時間
3. `chmod`
改變檔案權限，接上數字改變檔案權限的類別。數字與類別可參考[[Linux] chmod 檔案權限大統整! @ 工程的日子每天都很師](https://shian420.pixnet.net/blog/post/344938711-%5Blinux%5D-chmod-%E6%AA%94%E6%A1%88%E6%AC%8A%E9%99%90%E5%A4%A7%E7%B5%B1%E6%95%B4!)