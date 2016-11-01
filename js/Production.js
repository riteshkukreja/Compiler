var Production = function(prod) {
	/**
	 *	Production is of the form E -> ab$
	 *	left ->  E
	 *	right -> ab$
	 */

	 prod = prod.split("->");

	 var process = function(right) {
	 	right = right.split('|');
	 	for(i in right) {
	 		right[i] = right[i].split(' ');
	 	}

	 	return right;
	 }

	this.identifier = prod[0];
	this.tokens = process(prod[1]);

	this.isLeftRecursive = function() {
		// Check if left recursive
		for(i in this.tokens)
			if(this.identifier == this.tokens[i][0]) return true;

		return false;
	}

	this.match = function(tokenList) {
		// Match the given token 
		if(this.tokens == tokenList) return true;
		return false;
	}

	this.getStringTokens = function() {
		var list = [];
		for(var t of this.tokens) {
			var str = "";
			for(var k of t)
				str += k;
			list.push(str);
		}
		return list;
	}


	/*============================== Automatically Called Methods ==========================*/

	//analyzeBody();
}