var Grammer = function(grm) {

	var self = this;
	var nProductions = 0, prodList = [];

	var VarList, TermList, LetterList;

	var epsilon = {};

	// Method to check and put grammer into non terminals, terminals and productions
	var init = function(gram) {
		// split the grammer into productions
		var list = gram.split(/\n+/);

		// devide each production in an identifier(non terminal) and body with -> operator
		for(var prod in list) {

			if(!list[prod].match(Dictionary.regex.productions)) {
				Dictionary.errors.push([list[prod], "Invalid Syntax"]);
				continue;
			}

			prodList[nProductions++] = new Production(list[prod]);
		}

		// find all the non terminals
		initAlphabet(prodList);

		epsilonStep();
	}

	// Method to represent Grammer into Graph
	var build = function() {
		
	}

	/**
	 *	Epsilon Matching
	 *
	 */
	var epsilonStep = function() {
		for (i in prodList) {
			production = prodList[i];

			for(j in production.tokens) {
				var k;
				for(k in production.tokens[j]) {
					if(typeof epsilon[production.tokens[j][k]] == "undefined")
						break;
				}

				if(k == production.tokens[j].length)
					epsilon[production.identifier] = true;
			}
		}
	}

	/**
	 *	@params productionList is array of Productions
	 *
	 */
	var initAlphabet = function(productionList) {
	 	var nbVar = 0, nbTerminals = 0, nbLetters = 0;
	 	var nVar = 0, nTerm = 0, nLetter = 0;

	 	var Variables = {}, Terminals = {}, Letters = {};

	 	for(i in productionList) {

			// Process each production
			var production = productionList[i];

			// set left side as variables
			if(typeof Variables[production.identifier] == "undefined") {
				Variables[production.identifier] = true;
				nbVar++;
			}

			// set right side as letters
			for(j in production.tokens) {
				for(k in production.tokens[j]) {
					Letters[production.tokens[j][k]] = true;
				}
			}
		}
		// find terminals by subtracting letters from variables
		for(j in Letters) {
			if(!Variables[j]) {
				nbTerminals++;
				Terminals[j] = true;
			}
		}

		// no of distinct letters
		nbLetters = nbTerminals + nbVar;

		VarList = Object.keys(Variables);
		TermList = Object.keys(Terminals);
		LetterList = Object.keys(Letters);
	}

	/**
	 *	Find the First child of V
	 *	@param V - letter
	 *
	 */
	var FirstChild = function(V) {
		var child = [], nchild = 0;
		for(prod in prodList) {
			var production = prodList[prod];

			if(production.identifier == V) {

				if(production.tokens.length == 0) break;

				for(var j in production.tokens) {
					var i = 0;
					
					do {
						
						child[nchild++] = production.tokens[j][i];
						i++;

					} while(epsilon[production.tokens[j][i]] && i < production.tokens[j].length);
				}

			}
		}

		return child;
	}

	/**
	 *	Find the First child of V
	 *	@param V - letter
	 *	@param explored - boolean hashmap to store explored nodes of graph
	 *	@param firstChild - array to store terminals that constitutes first child
	 */
	var exploreFirstChild = function(V, explored, firstChild) {
		explored[V] = true;
		var children = FirstChild(V);

		for(i in children) {
			child = children[i];

			if(TermList.indexOf(child) != -1)
				firstChild[firstChild.length] = child;

			if(typeof explored[child] == "undefined")
				exploreFirstChild(child, explored, firstChild);
		}
	}

	/**
	 *	Find the First child of V
	 *	@param V - letter
	 *
	 */
	var firstTerminal = function(V) {
		var explored = {}, child = [];

		exploreFirstChild(V, explored, child);

		return child;
	}

	this.first = function(v) {
		return firstTerminal(v);
	}

	var sibling = function(V) {             
		var s = [];
		for(var i = 0; i < prodList.length; i++){
		    var p = prodList[i];

		    for(var j = 0; j < p.tokens.length; j++) {
		    	for(var k = 0; k < p.tokens[j].length; k++) {
		    		var r = p.tokens[j][k];

					if(r == V) {
					    var step = 1;
					    do {
							var e = p.tokens[j][k+step];
							var res = firstTerminal(e);
							if(res.length == 0)
								s.push(e);
							else
								s = s.concat(res);
							k++;
					    } while(epsilon[e] && k+step < p.tokens[j].length);
					}

					var l = p.tokens[j].length;
					do{
					    if(l > 0 && V == p.tokens[j][l-1])
							s.push(p.identifier);
					    l--;
					} while(l > 0 && epsilon[p.tokens[j][l]]);
				}
		    }
		}
       	return s;
    }

    var exploreSibling = function(V, mark){
		var s = sibling(V);
		for(i in s) {
		    if(!mark[s[i]] ) {
				mark[s[i]] = true;
				if(VarList.indexOf(s[i]))
				   exploreSibling(s[i], mark);
		    }
		}
    }

    this.follow = function(V){
		var s = [];
		var mark = {};

		exploreSibling(V, mark);

		for(var i = 0; i < TermList.length; i++) { 
		    if(mark[TermList[i]])
				s.push(TermList[i]);
		}

		return s;
    }

    this.getProductions = function() {
    	return prodList;
    }

    this.getTerminals = function() {
    	return TermList;
    }

    this.getNonTerminals = function() {
    	return VarList;
    }

	/*============================== Automatically Called Methods ==========================*/

	init(grm);

}