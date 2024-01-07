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


//////////////////x: moment(entry.time),

function drawChart(earthquakeData) {
    const time = earthquakeData.map(entry => moment(entry.time));
    const magnitudes = earthquakeData.map(entry => entry.mag);

    // Output data to console
    console.log('Earthquake Data:', earthquakeData);

    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({ x: moment(entry.time), y: entry.mag })),
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
