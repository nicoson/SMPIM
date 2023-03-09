
function sconsole() {}

sconsole.log = function(...args) {
    let flag = true;
    if(flag) {
        console.log(...args);
    }
}

sconsole.info = function(...args) {
    console.log(...args);
}

sconsole.warn = sconsole.info;

sconsole.error = function(...args) {
    console.log(...args);
}


module.exports = sconsole;