const csvFilePath = 'ishikawa_202401.csv';

// CSVデータを取得してグラフを描画
fetch(csvFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV, status ${response.status}`);
        }
        return response.text();
    })
    .then(csvData => {
        const earthquakeData = parseCSV(csvData);
        drawChart(earthquakeData);
    })
    .catch(error => console.error('Error:', error));

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

// グラフを描画する関数
function drawChart(earthquakeData) {
    // データを整形
    const timeLabels = earthquakeData.map(entry => new Date(entry.time));
    const magnitudes = earthquakeData.map(entry => parseFloat(entry.mag));

    // グラフを描画するためのコンテキスト
    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    // チャートの作成
    const myChart = new Chart(ctx, {
        type: 'line', // チャートのタイプを折れ線グラフに設定
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Earthquake Magnitude',
                data: magnitudes,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                fill: false, // 線の下を塗りつぶさない
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'HH:mm', // 表示フォーマットを設定 (only hours and minutes)
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time',
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true,
                    },
                    title: {
                        display: true,
                        text: 'Magnitude',
                    }
                }
            }
        }
    });
}
