//三個id值
const csvFileInput = document.getElementById('csvFileInput');
const uploadButton = document.getElementById('uploadButton');
const uploadResult = document.getElementById('uploadResult');

//上傳CSV事件聆聽
uploadButton.addEventListener('click', () => {
    const file = csvFileInput.files[0];//第一個檔案

    //如果沒有選取檔案，則不能上傳且結束
    if (!file) {
        uploadResult.innerText = '請先選擇一個 CSV 文件';
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const csvData = event.target.result;
        const formData = new FormData();

        //csvFile是後端接收數據的字串名，把文件包成formData
        formData.append('csvFile', new Blob([csvData], { type: 'text/csv' }), 'data.csv'); 
      
        // 使用 Axios 将 CSV 文件發送到後端處理
        axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // 使用 multipart/form-data 類型
          },
        })
        .then((response) => {
          uploadResult.innerText = '上傳结果：\n' + response.data;
        })
        .catch((error) => {
          console.error('上傳出錯：', error);
          uploadResult.innerText = '上傳數據時出錯';
        });
      };
      

    reader.readAsText(file);
});
