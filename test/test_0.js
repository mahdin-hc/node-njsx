var njsx = require('../src/njsx.js');

let jsx_code = `
	let my_elm = <div id="my_elm"></div>
	document.body.append(my_elm)
`

let js_code = njsx.toJS(jsx_code)

console.log(js_code)