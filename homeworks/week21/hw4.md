## 為什麼我們需要 React？可以不用嗎？

### 新工具的出現，是為了解決既有的問題

而 React 做為一個 UI 的 JavaScript 的函式庫，它的出現便是為了解決 jQuery 以及原生 JavaScript 直接透過 DOM API 操作 DOM 時所衍生出的問題。

### 那問題是什麼呢？
- **重複渲染 DOM 過於消耗效能**
- **資料與畫面不一致**

接下來分別說明這兩點，以及 React 是透過什麼樣的方式找到解決方案。

#### 重複渲染 DOM 過於消耗效能
直接操作 DOM 的方式容易造成效能上的負擔，影響特別大的就是其中兩項過程：
1. 回流（Reflow）：計算 Render Tree 上各項元素的物理屬性，例如位置、大小。
2. 重繪（Repaint）：將 Reflow 的計算結果轉換為螢幕上實際的像素顯示。

由於每次的 Reflow 與 Repaint 需要重新計算所有節點，並且全部重新渲染，因此在架構較龐雜的網頁中每次的互動都需要耗費相當的資源。

為了因應這種問題，React 以 Virtual DOM 來實現只更改畫面中有需要更新的元素，不必每次繪製畫面都得全部打掉重來，藉此提升效能。

#### 資料與畫面不一致
若直接以 JavaScript 或 jQuery 設計網頁，網頁中的畫面需透過直接操作 DOM 的方式來改變，而資料則需要另外撰寫程式來控制。如果沒有刻意設計，網頁中的資料與畫面並不會隨時保持一致，對開發者而言，更動資料的同時也必須以另外寫程式去改變畫面，在維護與管理上較不容易。

React 的核心精神，與這個問題息息相關。透過 state，讓 UI 永遠由資料產生，藉此達到資料與畫面保持一致的目的。

### 所以可以不用 React 嗎？
當然可以XDD
雖然 React 可以解決傳統 HTML + JavaScript 的痛點，但它依舊只是一項工具，只是達到目的的千百種工具的其中一種。
不過 React 的簡單、彈性以及有著豐富的生態系可以搭配，妥善運用的話可以大大地提昇開發效率與程式的重用性，不妨就嘗試看看巨人肩膀上的風景吧。

## React 的思考模式跟以前的思考模式有什麼不一樣？

寫 React 時的思考模式與過往寫 HTML + JavaScript 的思考模式，個人認為最不一樣的兩點是：
- 以元件（Component）為基本元素建構網頁
- 由 state 來決定網頁的畫面
### 以元件（Component）為基本元素建構網頁
在 React 中，網頁是由大大小小的 Component 所組合而成。而這些 Component 的該如何切分，才能達到更好的重用性便是重點。

對於初學 React 的新手來說，這與過去先將 HTML 寫好，再透過 JavaScript 改變 HTML 元素的方式很不一樣。在寫 Component 的同時就會需要考慮到這個 Component 會透過哪些 State 改變，需要傳什麼 props 給下一層等等問題。
### 由 state 來決定網頁的畫面
React 中很重要的一點是資料與畫面的一致。只要透過改變 state，畫面就可以跟著改變。

我認為這是寫 React 時很方便的一點，只要事先將 Component 寫好，state 一改變，畫面就可以跟著改變，不需要額外的程式控制畫面。

### 火鍋跟烤肉
如果要比喻的話，傳統的 HTML + JavaScript 就像是火鍋，而 React 則是烤肉？？？（什麼意思）
<center>
<img src="https://images.unsplash.com/photo-1584509171119-9054d2d7d9a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2535&q=80" height=500 /><img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" height=500 />
</center>
<center><font color=#A9A9A9>圖片來源：</font><a href="https://unsplash.com/photos/BlUxJx3eNp0">unsplash </a> <font color=#A9A9A9>&</font> <a href="https://unsplash.com/photos/UC0HZdUitWY">unsplash</a>
</center>

HTML 就像湯底，只能看沒得吃，要把食材（JavaScript）倒入才算是功能齊全、可以享用的美食。
React 則像是烤肉，每一種食材（Component）都可以直接吃，有著各自的風味（功能），不過要把這些烤好的食材通通端出來才算是像樣的烤肉啊！

比喻的不是很好，不過好餓喔...

## state 跟 props 的差別在哪裡？
### state
state 是管理元件的**狀態**，state 的值可以改變。
### props
props 則是被傳遞進元件，用於父元件與子元件的溝通，值不可以改變。
