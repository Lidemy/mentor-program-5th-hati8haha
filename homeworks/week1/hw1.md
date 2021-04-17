## 交作業流程

### 初次設定
1. 連線到 Lidemy 組織下的 GitHub classroom，用自己的 GitHub 帳號設定 github repository。

2. 在 github repository 的 code 頁面，點選綠色下載 code 按鈕，並複製浮出視窗中的網址。

3. 開啟 git bash，使用 `cd` 指令切換至放置課程的資料夾。

4. 輸入 `git clone (剛才複製的網址)`，將 github repository 下載至自己的電腦。

### 每次交作業流程
1. 在 git bash 開啟 repository，輸入 `git branch (branch 名稱)` 建立該週作業的 branch。

2. 輸入 `git checkout (branch 名稱)` ，切換至該 branch，在該 branch 上寫作業。

3. 完成作業後，輸入 `git commit -am "作業說明"`。

4. 輸入 `git push origin (branch 名稱)`，將作業推送至遠端 repository。

5. 到 GitHub 上點選 Compare & pull request 按鈕，輸入說明並送出。

6. 送出後將 PR 網址複製，在學習系統的繳交作業貼上並送出。

### 作業改完後
1. 作業被改完後，助教會將作業的branch merge 至主分支，並刪除遠端的 branch。

2. 輸入 `git checkout master` 切換至主分支，再輸入 `git pull origin master` 將遠端的主分支拉至本機端。

3. 輸入 `git branch -d (branch 名稱)` 刪除分支


