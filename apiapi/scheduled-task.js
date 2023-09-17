const cron = require('node-cron');
const { exec } = require('child_process');

//  */10 * * * * *  [每10秒執行一次]
//  *0 0 * * *      [每24小時執行一次]
cron.schedule('*/10 * * * * *', () => {
  // 使用 child_process 執行 generate-csv.js 這支js檔
  exec('node generate-csv_user.js', (error, stdout, stderr) => {
    if (error) {
      console.error('執行 generate-csv.js 出錯：', error); //錯誤抓取
      return;
    }
    console.log('generate-csv.js 已執行'); //執行成功，正常運行
    console.log('stdout:', stdout); //運行
    console.error('stderr:', stderr);//報錯
  });
});
