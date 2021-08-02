## hw2：Event Loop + Scope
```javascript=
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

### 程式執行說明
1. 執行迴圈，初始化條件 `var i=0`，當 `i<5` 時執行迴圈中的程式碼，每一圈結束時 `i++`

2. 迴圈第 1 圈：執行 `console.log('i:' + i)`，印出 `i: 0`
3. 迴圈第 1 圈：執行 `setTimeout(callbackFunction(), i*1000)`，因為 `setTimeout()` 屬於 Web API，因此瀏覽器會處理 `setTimeout()`，移除 call stack 中的 `setTimeout()`
4. Web API 中的 `setTimeout(callbackFunction(), i*1000)`，此時 `i=0`，因此至少 0 毫秒後，`() => {console.log(i)}` 被放入 task queue
5. 迴圈第 2 圈：執行 `console.log('i:' + i)`，印出 `i: 1`
6. 迴圈第 2 圈：執行 `setTimeout(callbackFunction(), i*1000)`，因為 `setTimeout()` 屬於 Web API，因此瀏覽器會處理 `setTimeout()`，移除 call stack 中的 `setTimeout()`
7. Web API 中的 `setTimeout(callbackFunction(), i*1000)`，此時 `i=1`，因此至少 1000 毫秒後，`() => {console.log(i)}` 被放入 task queue
8. 迴圈第 3 圈：執行 `console.log('i:' + i)`，印出 `i:2`
9. 迴圈第 3 圈：執行 `setTimeout(callbackFunction(), i*1000)`，因為 `setTimeout()` 屬於 Web API，因此瀏覽器會處理 `setTimeout()`，移除 call stack 中的 `setTimeout()`
10. Web API 中的 `setTimeout(callbackFunction(), i*1000)`，此時 `i=2`，因此至少 2000 毫秒後，`() => {console.log(i)}` 被放入 task queue
11. 迴圈第 4 圈：執行 `console.log('i:' + i)`，印出 `i: 3`
12. 迴圈第 4 圈：執行 `setTimeout(callbackFunction(), i*1000)`，因為 `setTimeout()` 屬於 Web API，因此瀏覽器會處理 `setTimeout()`，移除 call stack 中的 `setTimeout()`
13. Web API 中的 `setTimeout(callbackFunction(), i*1000)`，此時 `i=3`，因此至少 3000 毫秒後，`() => {console.log(i)}` 被放入 task queue
14. 迴圈第 5 圈：執行 `console.log('i:' + i)`，印出 `i: 4`
15. 迴圈第 5 圈：執行 `setTimeout(callbackFunction(), i*1000)`，因為 `setTimeout()` 屬於 Web API，因此瀏覽器會處理 `setTimeout()`，移除 call stack 中的 `setTimeout()`
16. Web API 中的 `setTimeout(callbackFunction(), i*1000)`，此時 `i=4`，因此至少 4000 毫秒後，`() => {console.log(i)}` 被放入 task queue
17. 迴圈執行完畢，call stack 被清空
18. event loop 確認到 call stack 被清空，將 task queue 中的 `() => {console.log(i)}` 依序放入 call stack
19. `var` 所宣告的變數作用於為函式， 由於宣告 `var i = 0` 時未包在函式中，因此 `i` 的作用域為 global
20. 執行 call stack 中的函式 `() => {console.log(i)}`，此時 `i` 值為 5，印出 `5`
21. 執行完 清空 call stack，將 task queue 下一個程式傳入 call stack，直到全部執行完畢

### 輸出結果
```js
i: 0
i: 1
i: 2
i: 3
i: 4
5  //等待 0 秒
5  //等待 1 秒，上一個 5 印出 1 秒後印出
5  //等待 2 秒，上一個 5 印出 1 秒後印出
5  //等待 3 秒，上一個 5 印出 1 秒後印出
5  //等待 4 秒，上一個 5 印出 1 秒後印出
```
