const fs = require('fs');
const path = require('path');
const { parse } = require('csv');

module.exports = {
    watched: null,
    output: null,
    processed: null,
    setWatched: function(watch) {
        this.watched = watch;
    },
    setOutput: function (out) {
        this.output = out;
    },
    setProcessed: function (proc) {
        this.processed = proc;
    },
    processChange: function (file) {
        const outputFile = path.resolve(this.output, path.basename(file).replace('.csv', '.json'));
        const processedFile = path.resolve(this.processed, path.basename(file));
        let rows = [];

        fs.createReadStream(file)
            .pipe(parse({
                columns: true,
                trim: true
            }))
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                fs.rename(file, processedFile, (err) => {
                    if (err) { return; }

                    fs.writeFile(outputFile, JSON.stringify(rows, null, 2), (err) => {
                        if (err) { return; }

                        console.info('\x1b[38;2;0;0;170m%s\x1b[0m', `Parsed ${file}`);
                    });
                });
            })
            .on('error', (err) => { });
    }
};