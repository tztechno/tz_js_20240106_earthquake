
const csvFilePath = 'ishikawa_202401.csv'; 

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};
        for (let j = 0; j < headers.length; j++) {
            const key = headers[j].trim();
            let value = values[j].trim();

            if (key === 'time') {
                value = value;
            } else {
                value = parseFloat(value.replace(/[^\d.]/g, ''));
            }
            entry[key] = value;
        }
        data.push(entry);
    }
    return data;
}
