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
