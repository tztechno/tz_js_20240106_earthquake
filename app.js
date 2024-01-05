// app.js

const csvFilePath = 'ishikawa_202401_query.csv';


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


/////////////////////

// サンプルの地震データ
//const earthquakeData = [
//    { time: '2024-01-01T12:00:00', mag: 5.0 },
//    { time: '2024-01-02T15:30:00', mag: 6.2 },
//];


// データを整形
const labels = earthquakeData.map(entry => entry.time);
const magnitudes = earthquakeData.map(entry => entry.mag);

// グラフを描画するためのコンテキスト
const ctx = document.getElementById('earthquakeChart').getContext('2d');

// チャートの作成
const myChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        labels: labels,
        datasets: [{
            label: 'Earthquake Magnitude',
            data: magnitudes,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
        }]
    },
    options: {
        scales: {
            x: [{
                type: 'time',
                time: {
                    unit: 'day', // 適切な単位を指定
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

