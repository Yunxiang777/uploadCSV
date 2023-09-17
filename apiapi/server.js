const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

//建立資料庫連線
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appapi'
});
db.connect((err) => {
  if (err) {
    console.error('無法連線到數據庫：', err);
    return;
  }
  console.log('已連接到數據庫');
});

//靜態文件處理
app.use(express.static(__dirname));

// 使用multer來處理上傳的文件
const upload = multer();

app.post('/upload', upload.single('csvFile'), (req, res) => {
  const csvData = req.file.buffer.toString();
  const csvRows = csvData.split('\n');
  for (let i = 1; i < csvRows.length-1; i++) { //跳過標題行
    const [User_id, User_password] = csvRows[i].split(',');

    // 使用 bcrypt 對密碼進行加密
    bcrypt.hash(User_password, 10, (err, hash) => {
      if (err) {
        console.error('加密程序出錯：', err);
        res.status(500).send('加密程序出錯：');
        return;
      }

      // 如果加密順利，繼續執行
      db.query('INSERT INTO user (User_id, User_password) VALUES (?, ?)', [User_id, hash], (error, results) => {
        if (error) {
          console.error('寫入數據庫時出錯：', error);
          res.status(500).send('寫入數據庫時出錯：');
          return;
        }
        console.log('數據已成功寫入數據庫');
      });
    });
  }

  res.status(200).send('數據已成功寫入數據庫');
});

app.listen(port, () => {
  console.log(`服務器啟動，端口號 ${port}`);
});
