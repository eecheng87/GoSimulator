// set isDev to false if u don't want to see console
let console = {
    isDev: true,
    log(...args) {
        if (!this.isDev) return;
        window.console.log(...args);
    }
}