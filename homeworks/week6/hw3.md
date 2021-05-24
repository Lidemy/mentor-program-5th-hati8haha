## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
### 1. `<blockquote>`
#### 說明
`<blockquote>` 標籤可以用來套用在引用的內容上，會以縮排方式呈現。
要改變 `<blockquote>` 的縮排，需使用 CSS 的 margin 屬性。

若要表示段落內的引文，則可以使用 `<q>` 來進行引用。
#### 可用屬性
1. `cite`
可以用來描述來源的 URL。不會有超連結，僅會在 html 中具有表達語意的功能。

#### 範例
```htmlmixed=
<blockquote cite="https://hulitw.medium.com/variable-and-frontdesk-a53a0440af3c">
  <p>
    不知道大家有沒有去過一些有寄物櫃的地方？<br>
    我這邊講的不是健身房或是車站會看到的那種置物櫃，不是那種投幣以後讓你把東西放裡面，然後給你一個鑰匙的那種。那是自助式的置物櫃，我要談的不是那種。
</p>
</blockquote>
```

>不知道大家有沒有去過一些有寄物櫃的地方？
我這邊講的不是健身房或是車站會看到的那種置物櫃，不是那種投幣以後讓你把東西放裡面，然後給你一個鑰匙的那種。那是自助式的置物櫃，我要談的不是那種。

### 2. `<object>`
#### 說明
`<object>` 標籤可以用來嵌入外部資源，例如 pdf 檔案或是已經被宣告死亡的 flash 等等。

圖片、音檔、影片、網頁，分別有相對應的嵌入標籤（`<img>`、`<audio>`、`<video>`、`<iframe>`），較不適合以 `<object>` 嵌入。
#### 可用屬性
以下只列出 html5 以後所適用的屬性：
1. `type`
外部資源的 [MIME](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 類型。
2. `data`
外部資源的 URL。
3. `height`
嵌入資源顯示的高度，單位是 pixel。
4. `width`
嵌入資源顯示的寬度，單位是 pixel。
5. `name`
指定此 object 的名稱。
6. `form`
此 object 關聯的 `<form>` 元素。
7. `usemap`
指定與 object 關聯的 `<map>` 元素的 hash-name。


#### 範例
```htmlmixed=
<object type="application/pdf"
    data="/media/examples/In-CC0.pdf"
    width="250"
    height="200">
</object>
```
![](https://i.imgur.com/nvcYd8P.png)


### 3. `<code>`
#### 說明
`<code>` 標籤用來表示程式碼的內容，常與 `<pre>` 一起使用，可以保留空白與縮排呈現。
#### 可用屬性
無
#### 範例
```htmlmixed=
<p>這是文字中的一段程式碼 <code>console.log("Hello World!")</code> 好耶！</p>
```
這是文字中的一段程式碼 `console.log("Hello World!")` 好耶！

## 請問什麼是盒模型（box modal）
html 中的可以看到的每個元素，都可以將它看作是盒模型。

盒模型由四個部分組成，分別如下圖所示：
![圖片來源：MDN box-model 介紹](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png)
1. Content （內容）
Content 為盒模型中置入內容的元素，元素中的文字會在此區塊呈現。
在預設（`box-sizing: content-box;`）情況下，可以透過 `width` 以及 `height` 控制寬高。

2. Padding（內邊距）
Padding 可以用來將 Content 往內推，背景色會與 Content 相同。
可以透過 `padding:` 控制邊距的上下左右距離，越增加會將元素越往內推。

3. Border（邊框）
Border 包在 Padding 的外層，若增加數值會向外延伸。
可以透過 `border:` 控制邊框的上下左右寬度。
設定 `box-sizing: border-box;` 時，`width` 與 `height` 控制的寬高會是以邊框為範圍。

4. Margin（外邊距）
Margin 的背景色永遠為透明。
如果是 inline 元素，margin 的垂直方向 ( 上、下 ) 沒有效果。
透過 `margin:` 設定的的外邊距上下左右寬度可以為負值。

`padding:`、`border:`、`margin:` 的語法如下：
- 單位可以設定為像素 px、百分比 % 或 em、rem 等。
- 四個值：上、右、下、左。範例：`padding: 36px 12px 24px 12px;`
- 三個值：上、左右、下。範例：`border: 36px 12px 24px;`
- 兩個值：上下、左右。範例：`margin: 36px 12px;`
- 一個值：上下左右。範例：`border: 12px;`

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
### display: inline
指行內元素，Content 的寬高會依據內容顯示，無法調整。左右 margin 可以調整，上下無法。左右 padding 可以調整，上下只會顯示背景的改變，但元素位置不會動。

屬於 inline 的 html 元素包含 `<span>`、`<a>`、`<input>`、`<img>`
### display: block
會佔滿一整行，padding、border、margin 調整對整個元素都有影響。

屬於 block 的 html 元素包含 `<div>`、`<ul>`、`<li>`、`<p>`、`<h1>`
### display: inline-block
對外像 inline 可以併排，對內像 block 可以調整屬性。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
### position: static
預設的元素定位類型。
當該元素定位類型為 `position: static` 時，`top`、`right`、`bottom`、`left` 和 `z-index` 屬性皆無效。
### position: relative
設定為 `postion: relative` 的元素可以透過`top`、`right`、`bottom`、`left` 和 `z-index` 等屬性改變定位。
以此方式定位的元素不會影響其他的元素定位。
### position: absolute
`position: absolute` 會需要參考點進行定位，參考點會以最近的（上層）非 static 定位元素為參考點。
以絕對定位定位的元素會被排除在預設排版之外，原本的空間會被接續的元素替補上。
### position: fixed
相對於瀏覽器做定位，位置可以固定定位在瀏覽器（更精確的說法為 viewport）上的位置，在頁面滾動不會隨頁面而上升或下降。
