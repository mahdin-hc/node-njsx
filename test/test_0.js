var njsx = require('../src/njsx.js');

let jsx_code = `
	let d = <span>hello</span>
	let my_elm = <div id="my_elm">
		hello
		{d}
		world
	</div>
	document.body.append(my_elm)
`

let js_code = njsx.toJS(jsx_code)

console.log(js_code)