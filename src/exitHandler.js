module.exports = {
    setSafeExits: () => {
        // Handle normal exit
        process.on('exit', (code) => {
            console.info();
            // Blue
            console.info('\x1b[38;2;0;0;170m%s\x1b[0m', 'Shutting down the Document Parser');
            console.info();
        });

        // Handle Ctrl+C
        process.on('SIGINT', () => {
            console.info();
            // Orange
            console.info('\x1b[38;2;255;165;0m%s\x1b[0m', 'Caught SIGINT (Ctrl+C)');
            console.info();

            process.exit();
        });

        // Handle kill signal
        process.on('SIGTERM', () => {
            console.info();
            // Blue
            console.info('\x1b[38;2;0;0;170m%s\x1b[0m', 'Caught SIGTERM');
            console.info();

            process.exit();
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (err) => {
            console.info();
            // Red
            console.error('\x1b[38;2;255;0;0m%s\x1b[0m', 'Uncaught exception:', err);
            console.info();

            process.exit(1);
        });

        // Optional: run before exiting but allow async I/O
        process.on('beforeExit', (code) => {
            console.info();
            // Orange
            console.info('\x1b[38;2;255;165;0m%s\x1b[0m', 'Process will exit soon with code:', code);
            console.info();
        });
    }
};