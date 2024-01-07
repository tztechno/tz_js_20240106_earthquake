function drawChart(earthquakeData) {
    // データを整形
    const latitudes = earthquakeData.map(entry => parseFloat(entry.latitude));
    const longitudes = earthquakeData.map(entry => parseFloat(entry.longitude));

    // グラフを描画するためのコンテキスト
    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    // チャートの作成
    const myChart = new Chart(ctx, {
        type: 'scatter', // チャートのタイプを散布図に設定
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({ x: parseFloat(entry.longitude), y: parseFloat(entry.latitude) })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Longitude',
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Latitude',
                    }
                }
            }
        }
    });
}
