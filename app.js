// app.js

// サンプルの地震データ
const earthquakeData = [
    { time: '2024-01-01T12:00:00', mag: 5.0 },
    { time: '2024-01-02T15:30:00', mag: 6.2 },
    // 他のデータを追加
];

// データを整形
const labels = earthquakeData.map(entry => entry.time);
const magnitudes = earthquakeData.map(entry => entry.mag);

// グラフを描画するためのコンテキスト
const ctx = document.getElementById('earthquakeChart').getContext('2d');

// チャートの作成
const myChart = new Chart(ctx, {
    type: 'line',
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

