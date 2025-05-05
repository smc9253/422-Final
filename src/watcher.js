const parser = require('./parser');
const chokidar = require('chokidar');

const ignore = [
    '.DS_Store',
    '.Spotlight-V100',
    '.Trashes',
    'ehthumbs.db',
    'Thumbs.db'
];

module.exports = {
    watch: (watched, output, processed) => {
        parser.setWatched(watched);
        parser.setOutput(output);
        parser.setProcessed(processed);

        console.info();
        console.info('\x1b[38;2;0;0;170m%s\x1b[0m', 'Watching folder:');
        console.info(`${watched}`);
        console.info();

        // Use chokidar because fs.watch is a pile of garbage
        const watcher = chokidar.watch(watched, {
            ignored: (path, stats) => {
                return stats?.isFile() && !path.endsWith('.csv')
            },
            persistent: true
        });

        watcher
            .on('add', (path) => {
                parser.processChange(path);
            })
            .on('error', (err) => { });
    }
};