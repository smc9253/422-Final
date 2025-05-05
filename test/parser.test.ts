const fs = require('fs');
const path = require('path');
const os = require('os');
const parser = require('../src/parser.js');

describe('parser.processChange', () => {
  let tempDir, outputDir, processedDir, csvFile;

  beforeEach(() => {
    // create a fresh temp workspace
    tempDir      = fs.mkdtempSync(path.join(os.tmpdir(), 'parser-'));
    outputDir    = path.join(tempDir, 'out');
    processedDir = path.join(tempDir, 'processed');
    fs.mkdirSync(outputDir);
    fs.mkdirSync(processedDir);

    // point parser at those dirs
    parser.setWatched(tempDir);
    parser.setOutput(outputDir);
    parser.setProcessed(processedDir);

    // sample CSV path
    csvFile = path.join(tempDir, 'patient_data_1.csv');
  });

  it('creates a .json file with the same row in JSON format', (done) => {
    // write a one-row CSV
    fs.writeFileSync(csvFile, 'id,name\n1,John Doe\n');

    // spy the completion log
    jest.spyOn(console, 'info').mockImplementationOnce(() => {
      const jsonPath = path.join(outputDir, 'patient_data_1.json');
      expect(fs.existsSync(jsonPath)).toBe(true);

      const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      expect(content).toEqual([{ id: '1', name: 'John Doe' }]);
      done();
    });

    parser.processChange(csvFile);
  });

  it('moves the original CSV into the processed directory', (done) => {
    fs.writeFileSync(csvFile, 'id,name\n2,Jane Smith\n');

    jest.spyOn(console, 'info').mockImplementationOnce(() => {
      const movedPath = path.join(processedDir, 'patient_data_1.csv');
      expect(fs.existsSync(movedPath)).toBe(true);
      done();
    });

    parser.processChange(csvFile);
  });
});

