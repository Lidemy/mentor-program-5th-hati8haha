## hw1：Event Loop
```javascript=
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

### 程式執行說明
1. 執行程式 call stack 疊入 `main()` （or `global()`）

2. 將第 1 行 `console.log(1)` 放入 call stack
3. 執行 `console.log(1)` ，移除 call stack 中的 `console.log(1)`
4. 將第 2~4 行放入 call stack
5. 因為 `setTimeout()` 屬於 Web API，因此 `setTimeout()` 會由瀏覽器的 Web API 處理，移除 call stack 中的 `setTimeout()`，當 Web API 中的 `setTimeout()` 執行完畢，將 callback function `console.log(2)` 放入 task queue
6. 將第 5 行 `console.log(3)` 放入 call stack
7. 執行 `console.log(3)` ，移除 call stack 中的 `console.log(3)`
8. 將第 6~8 行放入 call stack
9. 因為 `setTimeout()` 屬於 Web API，因此 `setTimeout()` 會由瀏覽器的 Web API 處理，移除 call stack 中的 `setTimeout()`，當 Web API 中的 `setTimeout()` 執行完畢，將 callback function `console.log(4)` 放入 task queue
10. 將第 1 行 `console.log(5)` 放入 call stack
11. 執行 `console.log(5)` ，移除 call stack 中的 `console.log(5)`
12. `main()` 執行完畢，清空 call stack
13. event loop 確認 call stack 被清空，依序將 task queue 的 callback function 依序傳入 call stack
14. `console.log(2)` 從 task queue 被傳入 call stack，執行 `console.log(2)`
15. `console.log(2)` 執行完畢， call stack 清空
16. event loop 確認 call stack 被清空，`console.log(4)` 從 task queue 被傳入 call stack，執行 `console.log(4)`
17. `console.log(4)` 執行完畢， call stack 清空

### 輸出結果
```
1
3
5
2
4
```
