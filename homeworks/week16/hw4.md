## hw4：What is this?

```javascript=
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
### 程式執行說明
#### `obj.inner.hello()`
`this` 的值跟如何呼叫有關，`obj.inner.hello()` 的呼叫方式是從最外層的物件 `obj` 呼叫至 `inner` 中的 `hello()`。因此 `this` 會是函式呼叫的上一層物件，也就是 `inner`，`inner.value` 為 `2`。
#### `obj2.hello()`
`obj2` 可以視為以下物件
```javascript=
inner: {
  value: 2,
  hello: function() {
    console.log(this.value)
  }
}
```
因此 `this` 會是函式呼叫的上一層物件，也就是 `inner`，`inner.value` 為 `2`。
#### `hello()`
直接呼叫函式因為沒有上一層的物件，因此在嚴格模式下會輸出 `undefined`，非嚴格模式的瀏覽器則會輸出 `window`， node.js 則是 `global`。
### 輸出結果
``` js
2
2
undefined    //非嚴格模式下，瀏覽器環境為 window，node.js 為 global
```
