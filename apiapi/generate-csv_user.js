const fs = require('fs'); //文件模塊

const folderPath = 'C:/Users/王韻翔/Desktop/userTable';

//如果桌面沒有product這個資料夾，就建立一個
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// 建立時間格式
const taiwanTime = new Date();
const year = taiwanTime.getFullYear();
const month = taiwanTime.getMonth() + 1; 
const day = taiwanTime.getDate();
const hours = taiwanTime.getHours();
const minutes = taiwanTime.getMinutes();
const seconds = taiwanTime.getSeconds();
const formattedDate = `${year}-${month}-${day}`;
const formattedTime = `${hours}時${minutes}分${seconds}秒`;

//建構要保存的檔案格式與路徑
const filePath = `C:/Users/王韻翔/Desktop/userTable/${formattedDate}(${formattedTime}).csv`;

// 定義CSV文件類型
const csvWriter = createCsvWriter({
  path: filePath, // 指定要保存的文件路徑
  header: [
    { id: 'User_id', title: 'User_id' },
    { id: 'User_password', title: 'User_password' },
  ],
});

//建立兩個不重複的值
const shortid = require('shortid');
const uuid = require('uuid');

// 準備要寫入的數據
const data = [
    { User_id: shortid.generate(), User_password: uuid.v4() },
    { User_id: shortid.generate(), User_password: uuid.v4() },
    { User_id: shortid.generate(), User_password: uuid.v4() },
  ];

// 將數據寫入 CSV 文件
csvWriter.writeRecords(data)
  .then(() => console.log('CSV 文件已生成'))
  .catch((error) => console.error('生成 CSV 文件時出錯:', error));

