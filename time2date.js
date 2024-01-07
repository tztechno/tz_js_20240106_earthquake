
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

// CSVファイルの読み込み
const inputCsvPath = 'ishikawa_202401.csv';
const csvData = fs.readFileSync(inputCsvPath, 'utf8');
const records = parse(csvData, { columns: true });

// 'time'列をDateオブジェクトに変換して新しい'date'列を追加
records.forEach(record => {
    record.date = new Date(record.time);
});

// 新しいCSVファイルとして保存
const outputCsvPath = 'ishikawa_202401t.csv';
const outputCsvData = records.map(record => {
    // オブジェクトからCSV形式の文字列に変換
    return `${record.time},${record.date.toISOString()}`;
}).join('\n');

fs.writeFileSync(outputCsvPath, outputCsvData, 'utf8');
