const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const watcher = require('./watcher');

const exitHandler = require('./exitHandler');
exitHandler.setSafeExits();

// Getting full paths for all three directories
const watched = path.join(__dirname, config.watched);
const output = path.join(__dirname, config.output);
const processed = path.join(__dirname, config.processed);

console.info();
// The following ANSI code sets the color, followed by the string to set, then a reset code
// Using the following pattern:
//                 38;2;R;G;Bm
console.info('\x1b[38;2;0;0;170m%s\x1b[0m', 'Starting the Document Parser');
console.info();

// Create the necessary directories if necessary
if (!fs.existsSync(watched)) {
    fs.mkdirSync(watched);
}

if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
}

if (!fs.existsSync(processed)) {
    fs.mkdirSync(processed);
}

watcher.watch(watched, output, processed);