## 前四週心得與解題心得

### 第一週
第一週算是比較輕鬆的一週，由於課程開始前兩周我才剛脫離上班與上課的規律生活，所以在程式導師計畫前揪了好幾趟爬山。課程剛開始的前幾週也都抽出一天平日去爬山，回到上課時也沒辦法那麼快轉換心態到學習上，有種心還在外面的世界遊蕩的感覺。

由於心態還略微鬆散，學習進度大多都是剛好達成而已，挑戰題與進階挑戰題就比較沒有心思跟時間去做。

而本週的學習重點是 Git 與 Command line 的操作，對我來說這兩項都算是很陌生的，自己剛接觸去研究很容易掉到一個大問題然後就覺得這東西太複雜了。不過由於本週學的東西都是後續課程會一直運用的，而運用的功能其實也就那幾項，其他東西若忘記了，有概念的話很快就可以找到該如何去做。

這週我覺得比較難懂的是 Git 的概念，雖然**記錄更動**這個概念不難懂，但是這個概念的實作中有不少細節需要釐清。

另外一點值得紀錄的是用 Markdown 作筆記真的蠻方便的，不少筆記軟體也都支援 Markdown 檔案，而且還有許多方便功能，能有效提升學習效率。

### 第二週
之前學過其他程式語言，但 JavaScript 是這時候才第一次寫的。讓我比較印象深刻的是 JavaScript 的弱型別與條件判斷，我覺得下面這張圖很貼切的說明剛開始我對於 JavaScript 的各種困惑 XD
![圖片來源：https://dev.to/damxipo/javascript-versus-memes-explaining-various-funny-memes-2o8c](https://res.cloudinary.com/practicaldev/image/fetch/s--ZDtqrBOj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://github.com/damiancipolat/js_vs_memes/blob/master/doc/js_thanks.png%3Fraw%3Dtrue)

程式的基本邏輯大概因為之前有學過其他程式語言，所以對於寫簡單的題目比較沒有問題。

另一點對我幫助蠻大的是[從博物館寄物櫃理解變數儲存模型](https://hulitw.medium.com/variable-and-frontdesk-a53a0440af3c)，這篇讓我有效地記住陣列與物件儲存變數的方式，不然常常用條件判斷兩個 array 是否相等結果都出錯。

再來就是 LIOJ 雖然有教學影片說要怎麼樣才能正確提交答案，不過一開始還是試了好久才弄到成功。

### 第三週
這週開始引進 ES6、npm 與 Jest，在 eslint 的輔助下改掉不少寫程式方面的不良習慣。
例如：
1. Tab 與空白鍵混用問題，因為原本都習慣直接按 Enter 進下一行，導致直接新增的一行是以 Tab 縮排。
2. 運算子、賦值前後缺空格問題，原先寫程式都沒有注意這些細節是否有統一，現在被強迫要改掉壞習慣了。
3. var 改成 const 與 let。
4. object 的 key 不必加引號。
5. function 改以箭頭函示寫法。

不過距離寫的漂亮，兼具一致性與可讀性，還有一大段距離。這週寫 LIOJ 題目時也有點卡住了，已經遇到比較不直觀的問題，需要多想幾層或是直接去查相關的解法。

npm 的部分算是知道用法但是還沒有很常使用，目前在做的題目大部分用 Javascript 內建的功能就可以做到，不過運用其他套件的狀況未來大概會很多。

這週的課程進度也有點沒趕上，**[ALG101] 先別急著寫 leetcode**還有不少影片沒有看完。覺得第三週算是前五週裡面課程份量最多的一週。

### 第四週
這週的課程內容式網路概念與 API，覺得跟前幾週比起來，這週的課程沒那麼直接對應到實作上，理論理解之後到實作是如何進行中間的差距較大。不像前幾週程式語法學一學就可以直接用，直到寫完作業看自我檢討時才比較清楚 request 的用法。


### 第五週與 Lidemy HTTP Challenge 心得
複習週玩了 Lidemy HTTP Challenge，解題工具是瀏覽器加上 Node.js。過程中有卡關的是 lv9、lv13、lv14。
#### lv9
找 IE6 的 user-agent 如何設置找了一陣子，想說怎麼有好幾種不同的，最後才找到範例知道要放哪一個。
```javascript=
const request = require('request')
const authorID = 'admin:admin123'
const Buffer =  require('buffer').Buffer
const base64AuthorID = Buffer.from(authorID).toString('base64')


request(
  'https://lidemy-http-challenge.herokuapp.com/api/v2/sys_info', {
    headers: {
      Authorization: `Basic ${base64AuthorID}`,
      'X-Library-Number': 20,
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)'  
    }
  },
  (err, response, body) => {
    console.log(body)
  }
)
```
#### lv13
這題最後是看別人的答案才解出來的，原本想說要在 header 裡面帶 proxy 設定，後來才找到要用網路上的菲律賓 http proxy，直接更改電腦的 proxy 設定後，用瀏覽器就可以拿到下一關的 token。

```javascript=
//原本的寫法是這樣子：

request({url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/logs',
    headers: {origin: 'https://www.google.com.ph/ph'}},
  (err, response, body) => {console.log(body)}
)

//結果當然是 "此 request 不是來自菲律賓，禁止存取系統資訊。"
```


lv14：這題題目沒看懂要怎麼做，也是找別人分享的做法才知道是要在 user-agent 中帶 Googlebot User Agent 才行。
```javascript=
request( 
  {url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/index',
  headers: {'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}},
  (err, response, body) => {
    console.log(body)
  }
)
```
