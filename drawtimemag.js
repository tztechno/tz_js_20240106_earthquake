
function drawChart(earthquakeData) {
    const time = earthquakeData.map(entry => entry.time);
    const magnitudes = earthquakeData.map(entry => entry.mag);
    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({ x: new Date(entry.time), y: entry.mag })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    position: 'bottom',
                    time: {
                        parser: 'YYYY-MM-DDTHH:mm:ss',  // パーサーの指定
                        tooltipFormat: 'YYYY-MM-DDTHH:mm:ss',  // ツールチップのフォーマット
                    },
                    title: {
                        display: true,
                        text: 'Time',
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Magnitude',
                    }
                }
            }
        }
    });
}
