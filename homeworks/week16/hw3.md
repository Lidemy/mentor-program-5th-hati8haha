## hw3：Hoisting
```javascript=
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```
### 程式執行說明
1. 編譯階段會進行 hoisting，若沒有賦值預設為 `undefined`，產生的 Execution Context 如下：
   ```javascript= 
   fn2EC = {
     AO: {
       arguments,
     },
     scopeChain: [fn2EC.AO, fn2.[[Scope]]]
   }
   
   fnEC = {
     AO: {
       arguments,
       a: undefined,    //fn 先使用才宣告並賦值，因此會先被宣告為 undefined
       fn2: function
     },
     scopeChain: [fnEC.AO, fn.[[Scope]]]
   }
   
   globalEC = {
     VO: {
       a: 1,    //宣告時同時賦值
       fn: function,
       b: undefined     //未宣告但有使用，JS 引擎會宣告 undefined
     },
     scopeChain: globalEC.VO
   }
   ```

2. 逐行執行程式，執行函式 `fn()`
   ```javascript=
   fnEC = {
     AO: {
       arguments,
       a: undefined,    //fn 先使用才宣告並賦值，因此會先被宣告為 undefined
       fn2: function
     },
     scopeChain: [fnEC.AO, fn.[[Scope]]]
   }
   
   globalEC = {
     VO: {
       a: 1,    //宣告時同時賦值
       fn: function,
       b: undefined     //未宣告但有使用，JS 引擎會宣告 undefined
     },
     scopeChain: globalEC.VO
   }
   ```

3. 第 3 行 `console.log(a)` ，因為 `fn()` 有宣告 `a`，但是是在第 4 行才宣告，因此此時 `a` 值為 `undefined`，印出 `undefined`
4. 第 4 行，因為 `a` 已經透過 hoisting 宣告過，故此行為將 `a` 賦值 5
   ```javascript=
   fnEC = {
     AO: {
       arguments,
       a: 5,    //賦值為 5
       fn2: function
     },
     scopeChain: [fnEC.AO, fn.[[Scope]]]
   }
   
   globalEC = {
     VO: {
       a: 1,
       fn: function,
       b: undefined
     },
     scopeChain: globalEC.VO
   }
   ```
5. 第 5 行，執行 `console.log(a)`，印出 `5`
6. 第 6 行，`a++`，`a` 值為 `6`
   ```javascript=
   fnEC = {
     AO: {
       arguments,
       a: 6,    // 5+1 = 6
       fn2: function
     },
     scopeChain: [fnEC.AO, fn.[[Scope]]]
   }
   
   globalEC = {
     VO: {
       a: 1,
       fn: function,
       b: undefined
     },
     scopeChain: globalEC.VO
   }
   ```
7. 第 7 行，`var a`，對程式無影響
8. 第 8 行，執行 `fn2()`
9. 第 11 行，`console.log(a)`，經由 scopeChain 向上找 `a`，`a` 值為 `6`，印出 `6`
10. 第 12 行，`fnEC` 中的 `a` 賦值 `20`
   ```javascript=
   fnEC = {
     AO: {
       arguments,
       a: 20,    //賦值 20
       fn2: function
     },
     scopeChain: [fnEC.AO, fn.[[Scope]]]
   }
   
   globalEC = {
     VO: {
       a: 1,
       fn: function,
       b: undefined
     },
     scopeChain: globalEC.VO
   }
   ```
11. 第 13 行，`globalEC` 中的 `b` 賦值 `100`
   ```javascript=
   fnEC = {
     AO: {
       arguments,
       a: 20,
       fn2: function
     },
     scopeChain: [fnEC.AO, fn.[[Scope]]]
   }
   
   globalEC = {
     VO: {
       a: 1,
       fn: function,
       b: 100    //賦值 100
     },
     scopeChain: globalEC.VO
   }
   ```
12. 第 9 行，印出 `fnEC` 中的 `a`，印出 `20`
13. 第 17 行，印出 `globalEC` 中的 `a`，印出 `1`
14. 第 18 行，`globalEC` 中的 `a` 賦值 `10`
15. 第 19 行，印出 `globalEC` 中的 `a`，印出 `10`
16. 第 20 行，印出 `globalEC` 中的 `b`，印出 `100`

### 輸出結果
```
undefined
5
6
20
1
10
100
```