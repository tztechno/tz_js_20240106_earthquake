const csvFilePath = 'ishikawa_202401.csv';


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
                    },
                    ticks: {
                    min: 4,
                    max: 8,
                    }
                }
            }
        }
    });
}