// app_trial2.js

const csvFilePath = './ishikawa_202401.csv';


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
    //for (let i = 1; i < lines.length; i++) {
    for (let i = 1; i < 2; i++) {
        const values = lines[i].split(',');
        const entry = {};
        for (let j = 0; j < headers.length; j++) {
            const key = headers[j].trim();
            let value = values[j].trim();

            // Convert 'time' column to Date object
            if (key === 'time') {
                value = new Date(value);
            }  
            entry[key] = value;
        }
        data.push(entry);
    }
    return data;
}




function drawCircle(ctx, entry) {
    
    xi=parseFloat(entry.x);
    yi= parseFloat(entry.y); 
    ri=parseFloat(entry.r);
    
    ctx.beginPath();
    ctx.arc(xi,yi, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red'; // 中心のドットの色を指定
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc( xi,yi,ri*20, 0, 2*Math.PI, false );
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

}


function drawChart(earthquakeData) {
    const ctx = document.getElementById('earthquakeChart').getContext('2d');
        // Extract longitude, latitude, and magnitude data
    
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Earthquake Locations',
                data: earthquakeData.map(entry => (
                    {
                        x: entry.longitude,
                        y: entry.latitude,
                        r: entry.mag
                    }
                )),
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
                },         
            },
        }
    });
    Chart.register({
        id: 'customPlugin',
        afterDraw: (chart) => {
            const { ctx } = chart;
            const data = chart.config.data.datasets[0].data;
            console.log(data)
            
            data.forEach(entry => {
                drawCircle(ctx, entry);
            });
        }
    });
}
