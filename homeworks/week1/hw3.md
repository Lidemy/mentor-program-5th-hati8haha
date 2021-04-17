## 教你朋友 CLI

>有天，你的麻吉 h0w 哥跑來找你說：「欸！能不能教我 command line 到底是什麼，然後怎麼用啊？我想用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。就交給你了，教學寫好記得傳給我，ㄅㄅ」
>
>可...可惡，居然這樣子就跑走了。但因為他是你的麻吉，所以你也沒辦法拒絕。

### command line 是什麼
command line 中文為**命令列**，是一種透過純文字操作電腦的方式。

為了使用我們的電腦，電腦需要有一套可以讓使用者操作的系統介面。

透過操作方式來分類，可以將介面分為 Command Line Interface  （命令列介面，縮寫：CLI）以及 Graphic User Interface （圖形使用者介面，縮寫：GUI）。

- Command Line Interface  (CLI)
透過輸入命令列，以純文字的方式操作電腦。如下圖：
![Gentoo Linux中的Bash命令列介面](https://upload.wikimedia.org/wikipedia/commons/e/e7/Bash_screenshot.png)

- Graphic User Interface （GUI）
採用圖形方式讓使用者操作電腦，比 CLI 學習成本更低。因為 GUI 的誕生，電腦的大眾化也得以實現。常用的 Windows 系統、macOS 都是 GUI 的介面。
![KDE Plasma Desktop](https://upload.wikimedia.org/wikipedia/commons/5/54/KDE_4.png)

### command line 怎麼用
在 Windows 系統中，可以使用系統內建的**命令提示字元**或 **Git Bash**。**Git Bash** 能讓使用者在 Windows 系統可使用 Linux 指令操作檔案與系統。

這邊以 Git Bash 示範如何解決 H0w哥的問題！

#### 建立資料夾 wifi
在 Git Bash 中輸入 `mkdir wifi` 當前資料夾中即會產生出名稱為 wifi 的資料夾。
`mkdir` 為建立資料夾的指令，`mkdir` 後接上資料夾名稱輸入，便能新增一個該名稱的資料夾。
#### 切換至資料夾 wifi 中
輸入 `cd wifi` 將當前工作資料夾切換至資料夾 wifi 中。
`cd` 為切換目錄指令，`cd` 後接上資料夾名稱，即可切換至該資料夾中工作。
#### 建立檔案 afu.js
輸入 `touch afu.js` 建立 afu.js 檔案。
`touch` 指令可更改檔案修改時間，也能用來建立檔案。