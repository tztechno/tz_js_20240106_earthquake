// app＿trial.js

const csvFilePath = './ishikawa_202401.csv';

/*
fetch('./ishikawa_202401.csv')
    .then(response => response.text())
    .then(console.log)
    .catch(console.error);
*/


fetch(csvFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV at ${csvFilePath}, status ${response.status}`);
        }
        return response.text();
    })
    .then(csvData => {
        console.log('CSV Data:', csvData); // Log CSV data to check if it's retrieved correctly
        const earthquakeData = parseCSV(csvData);
        console.log('Parsed Earthquake Data:', earthquakeData); // Log parsed data to check if it's correct
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
            const key = headers[j].trim();  // Remove leading/trailing whitespaces from headers
            let value = values[j].trim();  // Remove leading/trailing whitespaces from values

            // Convert 'time' column to Date object
            if (key === 'time') {
                value = new Date(value);
            } else {
                // Remove any non-numeric characters before parsing
                value = parseFloat(value.replace(/[^\d.]/g, ''));
            }
            entry[key] = value;
        }
        data.push(entry);
    }
    return data;
}

function drawCircle(ctx, location, mag, color = 'red', lineWidth = 1) {
    const { x, y } = location;
    ctx.beginPath();
    ctx.arc(x, y, mag, 0, 2 * Math.PI, false);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Draw circles based on earthquake data
function drawChart(earthquakeData) {
    const ctx = document.getElementById('earthquakeChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({
                    x: parseFloat(entry.longitude),
                    y: parseFloat(entry.latitude),
                    r: parseFloat(entry.mag)
                })),
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
            },
            plugins: {
                afterDraw: (chart) => {
                    const { ctx } = chart;
                    const data = chart.config.data.datasets[0].data;
                    // Draw circles for each earthquake entry
                    data.forEach(entry => {
                        drawCircle(ctx, { x: entry.x, y: entry.y }, entry.r);
                    });
                }
            }
        }
    });
}
