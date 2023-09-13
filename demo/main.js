// Initialize CodeMirror for the input textarea
const inputTextarea = document.getElementById('inputTextarea');
const inputEditor = CodeMirror.fromTextArea(inputTextarea, {
	mode: 'javascript', // Change this to the language mode you want to support
	theme: 'material',  // Use the Material theme
	lineNumbers: true   // Enable line numbers if needed
});

// Initialize CodeMirror for the output textarea
const outputTextarea = document.getElementById('outputTextarea');
const outputEditor = CodeMirror.fromTextArea(outputTextarea, {
	mode: 'javascript', // Change this to the language mode you want to support
	theme: 'material',  // Use the Material theme
	readOnly: true      // Make the output textarea read-only
});

// Function to reverse text from input textarea and display it in the output textarea
function NJSX2JS() {
	const inputText = inputEditor.getValue();
	let res = ''
	try {
		res = njsx.toJS(inputText, {
			sourceType: "module",
		}, {
			indent : "\t"
		});
	}
	catch(err) {
		res = err.toString()
	}
	outputEditor.setValue(res);
}

window.onbeforeunload = function(){
    localStorage.setItem("code", inputEditor.getValue())
}

window.onload = function(){
    inputEditor.setValue(localStorage.getItem("code") || '')
	NJSX2JS()
}

inputEditor.on("keyup", function (cm, event) {
	NJSX2JS()
})

// console.log(inputTextarea)