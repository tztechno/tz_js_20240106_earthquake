// app.js

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
            // } else if (key === 'mag') {
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



//　検討中
//　検討中
//　検討中

function drawCircle(ctx, location, mag) {
    var centerX = location.x;
    var centerY = location.y;
    var radius = mag;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1; // Circle line thickness
    ctx.strokeStyle = 'red'; // Circle line color
    ctx.stroke(); // Draw the circle
}

// Draw circles based on earthquake data
function drawChart(earthquakeData) {
    // Get the chart canvas context
    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    // Draw the scatter plot
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
                // Use the 'afterDraw' hook to draw circles on top of the scatter plot
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
