function Identifier() {
	return {
		type: "Identifier",
		start: 0,
		end: 0,
		name: ""
	}
}

function ReturnStatement() {
	return {
		type: "ReturnStatement",
		start: 0,
		end: 0,
		argument: {}
	}
}

function Literal() {
	return {
		type: "Literal",
		start: 0,
		end: 0,
		value: null,
		raw: ""
	}
}

function CallExpression() {
	return {
		type: "CallExpression",
		start: 0,
		end: 0,
		callee: {},
		arguments: [],
		optional: false
	}
}

function ThisExpression() {
	return {
		type: "ThisExpression",
		start: 0,
		end: 0
	}
}

function MemberExpression() {
	return {
		type: "MemberExpression",
		start: 0,
		end: 0,
		object: {},
		property: {},
		computed: false,
		optional: false
	}
}

function AssignmentExpression() {
	return {
		type: "AssignmentExpression",
		start: 0,
		end: 0,
		operator: null,
		left: {},
		right: {}
	}
}

function ExpressionStatement() {
	return {
		type: "ExpressionStatement",
		start: 0,
		end: 0,
		expression: {}
	}
}

function NewExpression() {
	return {
		type: "NewExpression",
		start: 0,
		end: 0,
		callee: null,
		arguments: []
	}
}

function FunctionExpression () {
	return {
		type: "FunctionExpression",
		start: 0,
		end: 0,
		id: null,
		expression: false,
		generator: false,
		async: false,
		params: [],
		body: {}
	}
}

function BlockStatement() {
	return {
		type: "BlockStatement",
		start: 0,
		end: 0,
		body: []
	}
}

module.exports = {
	Identifier,
	ReturnStatement,
	Literal,
	CallExpression,
	ThisExpression,
	MemberExpression,
	AssignmentExpression,
	ExpressionStatement,
	NewExpression,
	FunctionExpression,
	BlockStatement
} 