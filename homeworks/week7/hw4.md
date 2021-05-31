## 什麼是 DOM？
DOM 為 Document Object Model 的縮寫，中文為文件物件模型。

透過 DOM，可以將 html 文件以**物件**的形式提供給程式進行存取，進而可以改變 html 的架構、style 以及內容。而這個物件是根據 html 中的標籤所建立出的樹狀結構，html 中的標籤在樹狀結構上會以**節點**表示。DOM 的樹狀結構可參考下圖：

![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/330px-DOM-model.svg.png)

有了 DOM 之後，Javascript 便可以呼叫 DOM API 來對 html 文件內容進行操作。

如果要透過 DOM API 取得元素內容，可以使用以下幾種方式：
1. `document.getElementById("elementID")`
依據元素 ID 取得元素
2. `document.getElementsByTagName("elementTagName")`
依據標籤選取所有符合的元素
3. `document.getElementByClassName("elementClassName")`
依據 Class 選取所有符合的元素
4. `document.querySelector(".elementClass")`
使用 CSS 選擇器的方式選取元素，只會選取到符合的第一個元素
5. `document.querySelectorAll("div")`
使用 CSS 選擇器的方式選取所有符合的元素

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

DOM 的事件在傳遞時，是由根結點向下傳遞至目標，傳遞至目標後會依序向上傳遞。在這過程中，<font color=#FF0000>向下傳遞</font>的過程被稱為<font color=#FF0000>捕獲階段（Capture Phase）</font>，而<font color=#008000>向上傳遞</font>的過程則是<font color=#008000>冒泡階段（Bubbling Phase）</font>，在事件抵達目標時則會有目標階段（Target Phase）。

因此事件傳遞的順序必然是「**先捕獲，再冒泡**」。

下圖引用自 W3C，從下圖可看到整個事件的傳遞機制，是先發生捕獲階段，由根結點向下傳遞，抵達目標後，再發生冒泡階段，由目標向上傳遞回根節點。

![](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)

## 什麼是 event delegation，為什麼我們需要它？

event delegation 意思為事件代理。

當網頁中有許多事件需要監聽，除了針對每一個事件增加監聽之外，透過 DOM 的事件傳遞機制，可以發現到若要觸發一個節點上的事件，該節點上層的所有節點都會經過捕獲與冒泡階段，這也代表可以透過在上層節點增加監聽事件，就可以達到對目標節點監聽的效果。

event delegation 的好處是可以節省資源，讓程式有更好的效能。此外，對於動態新增的事件也可以進行監聽。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

### event.preventDefault()
取消事件的預設行為，例如避免送出表單或阻止超連結。
但是不會影響事件傳遞，事件的捕獲與冒泡會正常傳遞。
### event.stopPropagation()
可以取消事件的傳遞，可以透過 `target.addEventListener(type, listener, useCapture)`  的第三個參數來控制要在捕獲階段還是冒泡階段取消事件傳遞。
### 範例
![](https://i.imgur.com/l05Aoth.png)

今天有一個 html 文件，html 中有 box1 與 box2 兩個區塊，並且對兩個區塊增加監聽事件。

若 box1 事件被觸發，則會執行 `console.log()` 印出 `box1`。
若 box2 事件被觸發，則會送出表單，並會執行 `console.log()` 印出 `box2`。

#### 情況一：無 event.preventDefault() 也無 event.stopPropagation()
在此情況下 box1 與 box2 事件都被觸發，會送出表單並且同時印出 `box1` 與 `box2`。

#### 情況二：在 box2 中加上 event.preventDefault()
此時表單不會被送出，但 `box1` 與 `box2` 都會被印出來。這邊的預設行為是送出表單，因為 `event.preventDefault()` 因此被取消了。由於事件傳遞依然會繼續，因此 `box1` 仍會被印出。

#### 情況三：在 box2 中加上 event.stopPropagation()
此時表單會被送出，會印出 `box2` 但不會印出 `box1`。因為向上傳遞的事件被取消了，因此 box1 不會歷經冒泡階段，所以不會印出 `box1`。