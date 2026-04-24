const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url')

const chunkSize = 1024 * 1024 * 128; // 128MB

let models = []
for (let i = 2; i < process.argv.length; i++) {
  const url = process.argv[i];
  const urlParsed = new URL(url);

  const splitFile = path.parse(urlParsed.pathname);
  const outputFile = path.join(__dirname, '..', 'cypress', 'fixtures', splitFile.name);

  models.push({
    url,
    splitFile,
    outputFile,
  });
}

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

const testImageSource = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'resources',
  '.test',
  'images',
  'test_image.png'
);
fs.copyFileSync(testImageSource, path.join(testDirectory, 'test_image.png'));

const modelData = Promise.all(models.map(m => new Promise((resolve, reject) => {
  const {url, splitFile, outputFile} = m;

  console.log(`Downloading file '${splitFile.base}'...`);

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
      console.log(`Download '${splitFile.base}' Complete!`);
      resolve(testData);
    });
  });
})));

modelData.then(modelData => {
  let modelDataObject = {};
  modelData.forEach(
    m => {
      modelDataObject[m.modelName] = m;
    }
  );

  const jsonTestData = JSON.stringify(modelDataObject);
  const jsonTestFile = path.join(__dirname, '..', 'cypress', 'fixtures', 'model_data.json');
  fs.writeFile(jsonTestFile, jsonTestData, err => {
    if (err) {
      console.error('Error writing test JSON file:', err);
      return;
    }
    console.log('Test JSON file has been saved successfully!');
  });
})