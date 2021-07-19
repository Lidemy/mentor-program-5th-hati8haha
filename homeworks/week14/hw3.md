## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS 為 Domain Name System 縮寫，中文為網域名稱系統，是用來管理域名與 IP 位址對應關係的一項服務。

DNS 的運作方式像電話簿，裏頭有網域名稱與 IP 位址。當使用者在輸入網址時，url 會被傳到 DNS 解析為 IP 位址，讓使用者可以連上對應的主機。

若更深入理解 DNS，就會發現 DNS 的運作主要涉及 4 個部分，分別為：
- DNS 遞迴程式（DNS Recursive Resolver）
- 根名稱伺服器（DNS Root Nameserver）
- TLD 名稱伺服器（DNS TLD Namerserver）
- 權威名稱伺服器（Authoritative Nameserver）

![圖片來源：https://www.cloudflare.com/zh-tw/learning/dns/what-is-dns/](https://www.cloudflare.com/img/learning/dns/what-is-dns/dns-record-request-sequence-1.png)

### 公開的 DNS 好處
#### 對於使用者
- 更新速度快
- 安全性較好
- 上網速度較快
- 減少重新導向

#### 對於 Google
- 更容易掌握使用者的瀏覽的網頁

## 什麼是資料庫的 lock？為什麼我們需要 lock？
### lock 是什麼

資料庫的 lock 是指鎖住資料庫的狀態，不讓在 lock 狀態下的資料庫，資料無法更動。

為了避免 race condition 發生，因此需要透過 lock 來將資料庫鎖定狀態。

#### php lock 範例程式碼
```php=
$conn->autocommit(FALSE);  
$conn->begin_transaction();  
$conn->query("SELECT amount from products where id = 1 for update");  
$conn->commit();  
```


### 什麼是 race condition

例如某網路商城的貨品 A 只剩下一件，小明和老王都同時下貨品 A 的訂單，而下訂單的程式邏輯為：
```
1. 確認庫存數量大於或等於下單貨品數量
2. 若結果為 false，則下單失敗；若為 true，繼續執行
3. 庫存數量 - 下訂單貨品數量
4. 購物車數量 - 下訂單貨品數量
5. 帳戶訂單 + 下訂單貨品數量
```

若小明訂單在步驟 1~2 結果為 「庫存數量大於或等於下單貨品數量」，還沒執行到步驟 3 時，老王的訂單就開始執行步驟 1~2，那麼就會造成兩人在步驟 1~2 結果都為 「庫存數量大於或等於下單貨品數量」。

結果就是會造成程式會執行兩筆訂單的 3~5 步驟，造成超賣現象。而這種情形稱作 race condition。

## NoSQL 跟 SQL 的差別在哪裡？
NoSQL是Not Only SQL的縮寫，與 SQL（關聯式資料庫）有以下差別：
1. 沒有 schema，通常以 JSON、XML 或 CSV 等檔案類型儲存
2. 用 key-value 來存資料
3. 不支援 JOIN
4. 通常用來存一些結構不固定的資料（log 之類的）


## 資料庫的 ACID 是什麼？
### Transaction 交易
在以下情況中，會涉及多個以上的 query，而這些 query 必須確保所有動作都是成功且不受干擾。這類動作會被稱為 Transaction。
* 轉帳
* 購物（一次買多個品項）
* 其他一次牽扯到多個 query 的操作

#### php 範例程式碼
```php=
$conn->autocommit(FALSE);  
$conn->begin_transaction();  
$conn->query("update from money set amount = 20");  
$conn->query("update from money set sum = 10");  
$conn->commit();
```

### ACID

為了保證 Transaction 的正確性，要符合以下四個特性
1. **原子性 atomicity**：只能全部失敗或全部成功
2. **一致性 consistency**：維持資料的一致性（錢的總數相同）
3. **隔離性 isolation**：多筆交易不會互相影響（不能同時改同一個值）
4. **持久性 durability**：交易成功之後，寫入的資料不會不見

這四個特性的字首縮寫便是 ACID。
