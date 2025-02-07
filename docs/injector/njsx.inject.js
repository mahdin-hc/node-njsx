document.querySelectorAll('script').forEach(function(node) {
    let type = node.getAttribute("type")
    type = type.trim()
    if(type == 'text/njsx') {
		let src = node.getAttribute("src")
		if(typeof src == 'string') {
			fetch(src).then(function(e){
			    e.text().then(function(f){
					let code = njsx.toJS(f)
					var elm = document.createElement('script');
					elm.type = 'text/javascript';
					try {
						elm.appendChild(document.createTextNode(code));
						document.body.appendChild(elm);
					} 
					catch (e) {
						elm.text = code;
						document.body.appendChild(elm);
					}
				})
			})
		}
		else {
			let code = njsx.toJS(node.innerHTML)
			var elm = document.createElement('script');
			elm.type = 'text/javascript';
			try {
				elm.appendChild(document.createTextNode(code));
				document.body.appendChild(elm);
			} 
			catch (e) {
				elm.text = code;
				document.body.appendChild(elm);
			}
		}
	}
})