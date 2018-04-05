function getOSUPtime(uptime) {
    var hours = parseInt(uptime / 3600);
    var minutes = parseInt((uptime - hours * 3600) / 60);
    var seconds = (uptime - hours * 3600 - minutes * 60).toFixed(0);
    console.log('Uptime:'.green, hours, 'h', minutes, 'min', seconds, 'sec');
}
exports.print = getOSUPtime;