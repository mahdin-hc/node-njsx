const tempAST = require('./tempAST.js')

function toStr(str) {
	let output = '"'
	i = 0
	while (i < str.length) {
		let x = str[i]
		switch(x) {
			case '"':
			output += '\\"'
			break
			case '\n':
			output += '\\n'
			break
			case '\r':
			output += '\\r'
			break
			case '\t':
			output += '\\t'
			break
			default:
			output += x
		}
		i++
	}
	
	return  output + '"'
}



function Loop(node) {
	if (node.type === "JSXElement" || node.type === "JSXFragment") {
		let ast = tempAST.NewExpression()
		ast.callee = tempAST.FunctionExpression()
		ast.callee.body = tempAST.BlockStatement()
		
		if(node.type === "JSXFragment") ast.callee.body.body.push(Loop(node.openingFragment))
		else if(node.type === "JSXElement") ast.callee.body.body.push(...Loop(node.openingElement))
		// let children = node.children
		for (child of node.children) {
			// if(child.type == 'JSXText' && node.type == 'JSXFragment') console.log("hello")
			if(!(child.type == 'JSXText' && node.type == 'JSXFragment')) {
				// console.log(child.type, node.type)
				
				if(child.type == "JSXExpressionContainer") {
					let type = child.expression.type
					if(type == 'FunctionExpression' || type == 'CallExpression') {
						if(type == 'CallExpression') {
							if(child.expression.callee) {
								if(child.expression.callee.type == 'FunctionExpression') {
									let _child = Loop(child)
									if(_child != null) ast.callee.body.body.push(_child)
									continue;
								}
							}
						}
						else {
							let _child = Loop(child)
							if(_child != null) ast.callee.body.body.push(_child)
							continue;
						}
					}
					
					let n = tempAST.ExpressionStatement()
					n.expression = tempAST.CallExpression()
					n.expression.callee = tempAST.MemberExpression()
					n.expression.callee.property = tempAST.Identifier()
					n.expression.callee.property.name = "append"
					n.expression.callee.object = tempAST.MemberExpression()
					n.expression.callee.object.property = tempAST.Identifier()
					n.expression.callee.object.property.name = "node"
					n.expression.callee.object.object = tempAST.ThisExpression()
					let _child = Loop(child)
					n.expression.arguments.push(_child)
					if(_child != null) ast.callee.body.body.push(n)
					continue;
				}
				else if (child.type == 'JSXText' || child.type == 'JSXElement') {
					let n = tempAST.ExpressionStatement()
					n.expression = tempAST.CallExpression()
					n.expression.callee = tempAST.MemberExpression()
					n.expression.callee.property = tempAST.Identifier()
					n.expression.callee.property.name = "append"
					n.expression.callee.object = tempAST.MemberExpression()
					n.expression.callee.object.property = tempAST.Identifier()
					n.expression.callee.object.property.name = "node"
					n.expression.callee.object.object = tempAST.ThisExpression()
					let _child = Loop(child)
					n.expression.arguments.push(_child)
					if(_child != null) ast.callee.body.body.push(n)
					continue;
				}
			}
		}
		
		let r = tempAST.ReturnStatement()
		r.argument = tempAST.MemberExpression()
		r.argument.object = tempAST.ThisExpression()
		r.argument.property = tempAST.Identifier()
		r.argument.property.name = "node"
		
		ast.callee.body.body.push(r)
		
		return ast;
	}
	else if (node.type === "JSXText") {
		let l = tempAST.Literal()
		let value = node.value.trim()
		if (value == "") return null
		l.value = value
		l.raw = toStr(value)
		return l
	}
	else if (node.type === "JSXIdentifier") {
		let i = tempAST.Literal()
		i.value = node.name
		i.raw = '"' + node.name + '"'
		return i
	}
	else if (node.type === "JSXEmptyExpression") {
		return null
	}
	else if (node.type === "JSXExpressionContainer") {
		return Loop(node.expression)
	}
	else if (node.type === "JSXOpeningFragment") {
		let ast0 = tempAST.ExpressionStatement()
		ast0.expression = tempAST.AssignmentExpression()
		ast0.expression.operator = "="
		
		ast0.expression.left = tempAST.MemberExpression()
		ast0.expression.left.object = tempAST.ThisExpression()
		ast0.expression.left.property = tempAST.Identifier()
		ast0.expression.left.property.name = "node"
		
		ast0.expression.right = tempAST.CallExpression()
		let l = tempAST.Literal()
		l.value = 'div'
		l.raw = '"div"'
		ast0.expression.right.arguments.push(l)
		
		ast0.expression.right.callee = tempAST.MemberExpression()
		ast0.expression.right.callee.object = tempAST.Identifier()
		ast0.expression.right.callee.object.name = "document"
		ast0.expression.right.callee.property = tempAST.Identifier()
		ast0.expression.right.callee.property.name = "createElement"
		
		return ast0
	}
	else if (node.type === "JSXIdentifier") {
		let l = tempAST.Literal()
		l.value = node.name.name
		l.raw = `"${node.name.name}"`
		return l
	}
	else if (node.type === "JSXNamespacedName") {
		let namespace = Loop(node.namespace)
		let name = Loop(node.name)
		let n = tempAST.Literal()
		n.value =  `${namespace.value}:${name.value}`
		n.raw = `"${namespace.value}:${name.value}"`
		return n
	}
	else if (node.type === "JSXMemberExpression") {
		let object = Loop(node.object)
		let property = Loop(node.property)
		let m = tempAST.Literal()
		m.value =  `${object.value}.${property.value}`
		m.raw = `"${object.value}.${property.value}"`
		return m
	}
	else if (node.type === "JSXOpeningElement") {
		let arr = []
		
		let ast0 = tempAST.ExpressionStatement()
		ast0.expression = tempAST.AssignmentExpression()
		ast0.expression.operator = "="
		
		ast0.expression.left = tempAST.MemberExpression()
		ast0.expression.left.object = tempAST.ThisExpression()
		ast0.expression.left.property = tempAST.Identifier()
		ast0.expression.left.property.name = "node"
		
		ast0.expression.right = tempAST.CallExpression()
		ast0.expression.right.arguments.push(Loop(node.name))
		
		ast0.expression.right.callee = tempAST.MemberExpression()
		ast0.expression.right.callee.object = tempAST.Identifier()
		ast0.expression.right.callee.object.name = "document"
		ast0.expression.right.callee.property = tempAST.Identifier()
		ast0.expression.right.callee.property.name = "createElement"
		
		arr.push(ast0)
		
		for (attribute of node.attributes) {
			let __name = Loop(attribute.name)
			let __value = Loop(attribute.value)
			let n = tempAST.ExpressionStatement()
			
			if (__name.value[0] == '_'){
				__name.value = __name.value.slice(1)
				__name.raw = '"' + __name.value + '"'
				
				n.expression = tempAST.CallExpression()
				n.expression.callee = tempAST.MemberExpression()
				n.expression.callee.property = tempAST.Identifier()
				
				n.expression.callee.property.name = "setAttribute"
				n.expression.callee.object = tempAST.MemberExpression()
				n.expression.callee.object.property = tempAST.Identifier()
				n.expression.callee.object.property.name = "node"
				n.expression.callee.object.object = tempAST.ThisExpression()
				n.expression.arguments.push(__name)
				n.expression.arguments.push(__value)
			}
			else {
				n.expression = tempAST.AssignmentExpression()
				n.expression.operator = "="
				n.expression.left = tempAST.MemberExpression()
				
				n.expression.left.property = tempAST.MemberExpression()
				n.expression.left.property.property = tempAST.Identifier()
				n.expression.left.property.property.name = __name.value
				n.expression.left.property.object = tempAST.Identifier()
				n.expression.left.property.object.name = "node"
				
				n.expression.left.object = tempAST.ThisExpression()
				
				n.expression.right = __value
			}
			arr.push(n)
		}
		
		
		return arr
	}
	
	const newNode = { ...node };
	
	for (const key in newNode) {
		if (newNode[key] && typeof newNode[key] === "object") {
			if (Array.isArray(newNode[key])) {
				// Handle arrays of child nodes
				newNode[key] = newNode[key].map(Loop).filter(Boolean);
			}
			else {
				// Handle individual child nodes
				newNode[key] = Loop(newNode[key]);
			}
		}
	}
	
	return newNode;
}





module.exports = Loop	