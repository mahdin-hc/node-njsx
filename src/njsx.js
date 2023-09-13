#!/usr/bin/env node

const acorn_jsx = require("acorn-jsx");
const acorn = require("acorn");
const astring = require('astring')
const astconv = require('./astconv.js')
const version = '1.0.0'

function toJS(code, acorn_options, astring_options) {
	if(!acorn_options) acorn_options = { ecmaVersion : 2023 }
	let ast = acorn.Parser.extend(acorn_jsx()).parse(code, acorn_options)
	let js_ast = astconv(ast)
	return astring.generate(js_ast, astring_options)
}

function toAST(code, acorn_options) {
	let ast = acorn.Parser.extend(acorn_jsx()).parse(code, acorn_options)
	return ast
}

function toJSAST(code, acorn_options) {
	let ast = acorn.Parser.extend(acorn_jsx()).parse(code, acorn_options)
	return astconv(ast)
}

module.exports = {
	toJS,
	toAST,
	toJSAST,
	version
}