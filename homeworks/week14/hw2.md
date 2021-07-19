網站部署心得
===
## 雲端主機租用
一開始直接在 Goolge 搜尋 "網站部署" 於是找到了 [了解如何在AWS 上建立- 網站 - Amazon AWS](https://aws.amazon.com/tw/getting-started/hands-on/websites/)，其中部署 LAMP 堆疊應用程式的介紹是用 Lightsail 進行網站部署的教學。因為與前幾期的筆記所使用的方式不同，所以還特地去查了 Lightsail 與 EC2 部署網站的不同，來選擇要用哪種方案部署網站。

簡單來說，Lightsail 是 AWS 提供的 VPS 套裝，它是基於 Amazon 涵蓋了運算、儲存、網路與 DNS 服務，並有內建資料庫管理系統、負載平衡器等功能。若想要快速的建置網站服務，並沒有太複雜的需求的話，Lightsail 可能較為適合。

Amazon EC2 則是 Amazon Elastic Compute Cloud 的簡稱。與 Lightsail 相比，EC2 在部署、管理上與其它各方面有更多可能與彈性。實際上 Lightsail 便是基於 EC2 建立的所提供的服務。EC2 與 Lightsail 相比，有點是使用者可以更細緻的選擇與控制整個 VPS。

最後採用 Amazon EC2 作為雲端主機，因為 Lightsail 的簡化可能反而無法掌握部分的設定。當然也是因為有先前的筆記可以參考比較保險。

接下來依序進行：
1. 註冊 AWS 會員
2. 選擇免費方案 - 啟用 EC2
3. 選擇最新版本的 Ubuntu Server
4. 按 Next 到 Step 6: Configure Security Group，新增 HTTP 跟 HTTPS
5. 按 Review and Launch 
6. 設定私鑰並下載檔案
7. 按「View Instances」回到管理介面

點選 Connect，可以得到以下指令

```shell=
chmod 400 <私鑰檔案路徑>
ssh -i "<私鑰檔案路徑>" ubuntu@ec2-< IPv4 位置>.us-east-2.compute.amazonaws.com
```

開啟 Git Bash，並把私鑰檔案路徑替換進指令，便可以連線到 AWS EC2 的 Server。

## 設定 LAMP Server

1. 首先先更新 ubuntu 系統
   ```shell=
   sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
   ```
   會跳出是否安裝的訊息，輸入：y
2. 安裝 Tasksel
   ```shell=
   sudo apt install tasksel
   ```
   會跳出是否安裝的訊息，輸入：y
3. 用 Tasksel 下載 lamp-server
   ```shell=
   sudo tasksel install lamp-server
   ```
   
## 設定 phpmyadmin
1. 安裝 phpmyadmin
   ```shell=
   sudo apt install phpmyadmin
   ```
2. 連接 apache2
3. 設定密碼
4. 將 phpmyadmin 的登入設定，改為可以用密碼登入
   輸入以下指令
   ```shell=
   sudo mysql -u root mysql
   ```
   進到 sql 指令
   ```sql=
   UPDATE user SET plugin='mysql_native_password' WHERE User='root';
   FLUSH PRIVILEGES;
   ```
   離開 sql
   ```sql=
   exit
   ```
5. 設定設定 root 的密碼
   ```shell=
   sudo mysql_secure_installation
   ```
   會跳出是否設定密碼？這時按 `y`
   接著會依序設定密碼強度與密碼，設定完之後就可以在 phpmyadmin 用 root 帳號登入。
   
設定完密碼之後我一度忘記要用 root 的帳號登入，一直在找帳號是什麼 
### 故障排除
在瀏覽器輸入自己的 IPv4/phpmyadmin，但卻出現 404 Not Found。
這時參考 [[ 紀錄 ] 部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/) 所提供的三個方法，不過第一個方法無效，最後是輸入以下指令才成功
```shell=
$ sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf.d/phpmyadmin.conf
$ sudo /etc/init.d/apache2 restart
```
## 設定域名
在用乾爹贊助的優惠碼買完域名後，到區域檔紀錄，把 A 的 IPv4 改成 AWS 的 IP 就可以透過域名連上網站。

## 檔案部署到 Server
可以採用 GitHub 將檔案 clone 至 `var/www/html` 資料夾，接著在網址輸入檔案路徑便能連結到網頁。

## 設定子網域
如果要在網頁中放各種作業，可以使用採用子網域來做為各個網業網址。例如原本是 hati8haha.tw/restaurant/index.html 可以改為 restaurant.hati8haha.tw 這樣網址可以更乾淨。

要設定的話需要先修改 vitural host 的設定。移動到 `/etc/apache2/sites-available/` 資料夾，複製一份 000-default.conf 檔案並更改名稱與修改內容。
要修改的有 ServerName、DocumentRoot，ServerAlias、ErrorLog、CustomLog 也可以依據需求更改。

完成之後就可以輸入以下指令啟用設定檔：
```shell=
sudo a2ensite restaurant.conf
```
設定完之後重啟 apache 伺服器
```shell=
sudo service apache2 restart
```

最後去 gendi 設定 CNAME，把子網域設定好之後就完成了。

## 心得

部署過程因為有參考筆記，所以其實部署蠻快的，大概一天之內就完成了。但是過程中有蠻多操作都蠻小心的，擔心用錯就需要重來。而且對於網站部署的整個機制與流程也不太熟，直到做完之後再另外去找一些相關資訊才比較理解。一開始甚至連 LAMP 是什麼都還沒搞懂就開始做了 XD

做完之後就蠻有成就感的，之後有比較完整的專案就能放上去做為一個完整的產品。不過也是發現到部署網站過程真的發現到許多自己還沒學習過的領域，覺得可以再深入研究，看看自己真的有興趣的是哪一方面，再決定往前端或後端發展。
