const http = require('http');
const fs = require('fs');
const { join } = require('path');

const url = process.argv[2];
const fileName = "mvm-weights.bin";
const outputFile = join(__dirname, fileName);

console.log(`Downloading file...'`)

const file = fs.createWriteStream(outputFile);
const request = http.get(url, (res) => {
  res.pipe(file);

  file.on("finish", () => {
    file.close();
    console.log("Download Completed.");
  });
});
