const fs = require('fs')
const readLine = require('readLine')

const readStream = fs.createReadStream('../access.log', 'utf-8');
const writeStream1 = fs.createWriteStream('../89.123.1.41_requests.log');
const writeStream2 = fs.createWriteStream('../34.48.240.111_requests.log');

let numStr = 0;

const rl = readLine.createInterface({
  input: readStream,
  terminal : true
});

rl.on('line', (line) => {
  if(line.includes("89.123.1.41")) {
    writeStream1.write(lin + "\n")
  }

  if(line.includes("34.48.240.111")) {
    writeStream2.write(line + "\n")
  }

  console.log(++numStr)
})