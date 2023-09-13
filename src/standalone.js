var njsx = require('./njsx.js');

if (typeof global.window.define == 'function' && global.window.define.amd) {
    global.window.define('njsx', function () {
        return njsx;
	});
}
else {
    global.window.njsx = njsx;
}