// app.js

const csvFilePath = 'ishikawa_202401.csv';


// CSVデータを取得してグラフを描画
fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
        const earthquakeData = parseCSV(csvData);
        drawChart(earthquakeData);
    })
    .catch(error => console.error('Error fetching CSV:', error));


// CSVデータを解析する関数
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');

    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};
        
        for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = values[j];
        }

        data.push(entry);
    }

    return data;
}


function drawChart(earthquakeData) {
    // データを整形
    const labels = earthquakeData.map(entry => entry.time);
    const magnitudes = earthquakeData.map(entry => parseFloat(entry.mag)); // 文字列から数値に変換

    // グラフを描画するためのコンテキスト
    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    // チャートの作成
    const myChart = new Chart(ctx, {
        type: 'scatter', // チャートのタイプを散布図に設定
        data: {
            labels: labels,
            datasets: [{
                label: 'Earthquake Magnitude',
                data: magnitudes.map((mag, index) => ({ x: labels[index], y: mag })), // 散布図のデータに変換
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // マーカーの色
            }]
        },
        options: {
            scales: {
                x: [{
                    type: 'time',
                    time: {
                        unit: 'hour', // x軸の単位を'hour'に設定
                        displayFormats: {
                            hour: 'HH:mm', // 表示フォーマットを設定
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time',
                    }
                }],
                y: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    title: {
                        display: true,
                        text: 'Magnitude',
                    }
                }]
            }
        }
    });
}
