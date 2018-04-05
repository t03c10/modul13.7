var EventEmitter = require("events").EventEmitter;
var os = require('os');
var OSinfo = require('./modules/OSinfo');
var colors = require('colors');
var emitter = new EventEmitter();
var fs = require('fs');
var StatMode = require('stat-mode');
var testFolder = './';
var LogFile = './tekst.txt'
emitter.on("beforeCommand", function (instruction) {
    console.log('You wrote: ' + instruction + ', trying to run command');
});
emitter.on("afterCommand", function () {
    console.log('Finished command');
});
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function () {
    var input = process.stdin.read();
    if (input !== null) {
        var instruction = input.trim();
        switch (instruction) {
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;
            case '/sayhello':
                process.stdout.write('hello!\n');
                break;
            case '/osinfo':
                process.stdout.write('System Info:\n');
                OSinfo.print();
                break;
            case '/cat':
                fs.stat('./cat.jpg', function (err, stats) {
                    var statMode = new StatMode(stats);
                    console.log(statMode.toString());
                });
                break
            case '/dir':
                console.log('Lista plików i folderów'.blue);
                var dirlist = '';
                fs.readdirSync(testFolder).forEach(dirlist => {
                    console.log(dirlist);
                    fs.appendFile(LogFile, dirlist + os.EOL, function (err) {
                        if (err) throw err;
                    })
                });
                console.log('Zapisano w pliku '.green + LogFile.green + '!'.green);
                break
            default:
                process.stderr.write('Wrong instruction!\n');
                process.exit();
        };
        // emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');
    }
});