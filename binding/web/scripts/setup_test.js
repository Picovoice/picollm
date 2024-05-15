const http = require('http');
const fs = require('fs');
const path = require('path');

const chunkSize = 1024 * 1024 * 128; // 128MB

const url = process.argv[2];
const fileName = process.argv[3];
const splitFile = path.parse(fileName);
const outputFile = path.join(__dirname, '..', 'cypress', 'fixtures', splitFile.name);

const testDirectory = path.join(__dirname, '..', 'test');

const testDataSource = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'resources',
  '.test',
  'test_data.json'
);

fs.copyFileSync(testDataSource, path.join(testDirectory, 'test_data.json'));

console.log(`Downloading file...`);

http.get(url, res => {
  let currentChunkSize = 0;
  let currentChunk = 0;

  const testData = {
    modelName: splitFile.name,
    modelFiles: [],
  };

  let modelFileName = `${outputFile}-${currentChunk}${splitFile.ext}`;
  let modelFile = fs.createWriteStream(modelFileName);
  testData.modelFiles.push(modelFileName);

  res.on('data', chunk => {
    if (currentChunkSize + chunk.length > chunkSize) {
      modelFile.close();
      currentChunk += 1;
      currentChunkSize = 0;

      modelFileName = `${outputFile}-${currentChunk}${splitFile.ext}`;
      modelFile = fs.createWriteStream(modelFileName);
      testData.modelFiles.push(modelFileName);
    }

    modelFile.write(chunk);
    currentChunkSize += chunk.length;
  });

  res.on('end', () => {
    modelFile.close();
    console.log('Download Complete!');

    const jsonTestData = JSON.stringify(testData);
    const jsonTestFile = path.join(__dirname, '..', 'cypress', 'fixtures', 'model_data.json');
    fs.writeFile(jsonTestFile, jsonTestData, err => {
      if (err) {
        console.error('Error writing test JSON file:', err);
        return;
      }
      console.log('Test JSON file has been saved successfully!');
    });
  });
});
