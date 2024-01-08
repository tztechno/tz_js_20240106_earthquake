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


function drawChart(earthquakeData) {
    const time = earthquakeData.map(entry => entry.time);
    //const magnitudes = earthquakeData.map(entry => entry.mag);
    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({ x: new Date(entry.time), y: new Date(entry.time) })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time',
                    },
                    time: {
                    unit: 'day', // 例: 'day', 'hour', 'month' など
                    displayFormats: {
                        day: 'MMM D', // 例: 'Jan 1', 'Feb 2' など
                        },
                    },
                },
                y: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time',
                    }
                }

              
            }
        }
    });
}
