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
        // Output data to console
        console.log('Earthquake Data:', earthquakeData);
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
            } else if (key === 'mag') {
                // Remove any non-numeric characters before parsing
                value = parseFloat(value.replace(/[^\d.]/g, ''));
            }
            entry[key] = value;
        }
        data.push(entry);
    }
    return data;
}


function drawChart(earthquakeData) {
    const time = earthquakeData.map(entry => entry.time);
    const magnitudes = earthquakeData.map(entry => entry.mag);

    const ctx = document.getElementById('earthquakeChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => ({ x: entry.time, y: entry.mag })),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time', // Use 'time' scale type for Date objects
                    position: 'bottom',
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
