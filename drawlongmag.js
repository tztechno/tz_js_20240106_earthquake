function drawChart(earthquakeData) {
    const longitude = earthquakeData.map(entry => entry.longitude);
    const magnitudes = earthquakeData.map(entry => entry.mag);
    const ctx = document.getElementById('earthquakeChart').getContext('2d');
    const myChart = new Chart(ctx, {

        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({ x: entry.longitude, y: entry.mag })),
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
                        text: 'Magnitude',
                    }
                }
            }
        }
    });
}
