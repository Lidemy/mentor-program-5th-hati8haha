week8 hw3
===
## 什麼是 Ajax？
Ajax 全名是 Asynchronous JavaScript and XML，指的是非同步的 JavaScript 與 XML。

Javascript 指的是使用的程式語言，而 XML 則是交換資料的類型（現在也不限於 XML、許多 API 都採用 JSON 格式），至於非同步呢？

首先來釐清什麼是非同步，與同步之間的差異是什麼？

### 同步與非同步
#### 同步：
一般在執行 JavaScript 時，程式是逐行往下執行的，下一行的程式需要等到上一行執行完畢，才會開始執行下一行。
```javascript=
let i = 0
while (i < 100000000000) {  //需要執行相當多次的迴圈，會花費一定時間
i++
}

console.log(i)  //等到上一行結束時才會執行。若是非同步的話則不能確保 i 的值為多少
```
#### 同步請求（Synchronous request）：
當今天程式涉及網路時，若發送 request 與接收 response 是採用同步的形式進行，被稱作同步請求。
```javascript=
let result = sendRequest('https://api.twitch.tv/kraken/games/top?client_id=xxx')

console.log(result) //等到收到 response 才會執行
```
由於要等到收到 response 才能執行接下來的程式，因此會需要花費相當的時間。更重要的是，在等待的時間 **什麼事都不能做**，由於同步的關係，程式會停留在等待收 response 的階段，若等待時間相當長，結果就是造成糟糕的使用者體驗，像是下面這張圖。

![](https://i.imgur.com/Dv7RSSh.png)


#### 非同步：
非同步則代表不必等待上一行完全執行完畢，就可以先執行下一行。例如再 DOM 中常運用的 `addEventListener` 中的 callback function 並不會直接執行，而是等到監聽事件發生時才會執行。
```javascript=
document.querySelector('div').addEventListener('click', callbackFunction)
//callback function 不會直接執行，這也算是非同步表現
```

#### 非同步請求（Asynchronous request）：
在現代的網業中大多程式會採用非同步的方式發送 request，採用非同步的好處是網頁不必等待收到 response 才能進行下一個動作。可以先執行其他部分，若收到 response 再把收到的內容與既有內容融合呈現。

### Ajax 實例
在 JavaScript 中，可以透過瀏覽器準備好的物件 `XMLHttpRequest` 發送非同步方式的 request。

以下是參考自[輕鬆理解 Ajax 與跨來源請求](https://blog.huli.tw/2017/08/27/ajax-and-cors/)一文的程式碼：

```javascript=
var request = new XMLHttpRequest();
request.open('GET', `https://api.twitch.tv/kraken/games/top?client_id=xxx`, true);
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
  
    // Success!
    console.log(request.responseText);
  }
};
request.send();
```

## 用 Ajax 與我們用表單送出資料的差別在哪？
### 表單
用表單送出資料時，頁面會先跳轉再送出 request。
表單是瀏覽器內建就有的功能，若瀏覽器有禁用 Javascript 依然可以發送 request。
若是以 GET 的方式發送 request，則表單資訊會附加在 url 中送出。

### Ajax
使用 Ajax 傳送資料時不需要跳轉頁面，資料以非同步的方式傳送。送出 request 的同時，網頁其他部分可以繼續運作。
若瀏覽器有禁用 Javascript 的話就不能用 Ajax 的方式發送表單。

### 兩者比較
|                      |  表單  |    Ajax    |
|:--------------------:|:------:|:----------:|
|     **頁面跳轉**     |  需要  |    不需    |
| **需要什麼才能進行** | 瀏覽器 | Javascript |


## JSONP 是什麼？
JSONP 的全名是 JSON with Padding，是一種可以進行跨來源請求的方法。
原理是利用 `<script></script>` 標籤可以跨網域的特性，將遠端的資料利用 callback function 帶入本地端。
```htmlmixed=
<script href="https://another-origin.com/api/"></script>
<script>
  function receiveData (response) {
    console.log(response);
  }
</script>
```
若此時 `https://another-origin.com/api/` 返回的內容如下：
```javascript=
receiveData({
  data: 'test'
});
```
透過函式，那麼原本 html 中的 javascript 便可以存取來自其他網域的資料。

JSONP 的缺點是附加的參數（例如：client-ID 等）只能透過附加在 url 上傳送，也只能使用 GET 方法發送 request，無法使用 POST 或其他 request 方法。

## 要如何存取跨網域的 API？
要在瀏覽器中存取跨網域的 API，除了 JSONP 之外，也可以透過 CORS 的規範來達成。

### CORS
CORS，全名為 Cross-origin resource sharing，中文為跨來源資源共用。
由於瀏覽器基於安全性的考量，因此會有[同源政策 Same Origin Policy](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy) 的限制，會阻止跨網域的 request。
為了解決存取跨網域的需求，因此有了 CORS 規範，告訴使用者若要進行跨網域的請求的話該如何進行。

若發送一個 request 至跨網域的 API，那麼回傳的 response 的 header 中會有 `acess-control-allow-origin:` 一欄。該欄會標示有哪些網域是允許可以存取的，若該欄的值為 `*`，代表所有網域都可以進行存取。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
瀏覽器基於安全性的考量，因此會有同源政策的限制。
在第四周時，我們是以 Node.js 實作 API 存取，因為沒有瀏覽器的限制，因此不會遇到跨網域的問題。
