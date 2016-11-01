var SLRParser = function(grm) {

	var self = this;

	// Create a table to store SLR moves
	var table = [];

	// Store already generated LR items
	var items = {};

	// Grammer Object
	var grammer = new Grammer("S->S + T|T\nT->T * F|F\nF->( S )|id");

	// Store original productions
	var productions = {};
	var stringProductions = [];
	var generateProductions = function() {
		var temp = grammer.getProductions();
		for(pos in temp) {
			var h = "" +temp[pos].getStringTokens();
			h = h.split(',');
			for(each of h)
				stringProductions.push(temp[pos].identifier + "->" + each);
			productions[temp[pos].identifier] = temp[pos].tokens;
		}
	}

	var uniqueID = 0;

	// LR item Tree Node
	var LRItem = function(prod) {
		// store if travered to avoid infinte loops
		this.isTraversed = false;

		// unique id
		this.id = uniqueID++;

		// Children
		this.children = {};

		// Production list
		this.productions = [];

		if(typeof prod == "object")
			this.productions.push(prod);

		// Final Production
		this.final = false;
	};

	// Hash the production
	var hash = function(prod) {
		return prod.left + '->' + prod.right + ':' + prod.pos;
	}

	var inArray = function(item, list) {
		for(var i = 0; i < list.length; i++)
			if(list[i] === item)
				return true;
		return false;
		//return list.indexOf(item) != -1;
	}

	// Populate Productions
	var populate = function(prod, vis) {
		var list = [prod];

		if(typeof vis == "undefined")
			vis = [];

		if (inArray(hash(prod), vis)) return [];
		vis.push(hash(prod));

		if(typeof productions[prod.right[prod.pos]] != "undefined") {
			var right = productions[prod.right[prod.pos]];
			for(each of right) {
				var item = {left: prod.right[prod.pos], right: each, pos: 0};
				if(!inArray(hash(item), vis)) {
					list = list.concat(populate(item, vis));
				}
			}
		}

		return list;
	}

	// Method to recursively produce each LR items
	var startRecursiveBuild = function(start) {
		if(start.productions.length == 0) return;
		if(start.isTraversed || start.final || typeof items[hash(start.productions[0])] != "undefined") return;
		start.isTraversed = true;

		// Add item to a dictionary with key as the hashed value of production
		items[hash(start.productions[0])] = start;

		// Populate Productions
		start.productions = populate(start.productions[0]);

		//console.log(start.productions);

		for(var pprod of start.productions) {
			// Iterate through each production
			var prod = {left:pprod.left, right:pprod.right, pos:pprod.pos};
			// Update position
			prod.pos += 1;

			// check if already havent made that move
			if(typeof start.children[prod.right[prod.pos-1]] == "undefined")
				start.children[prod.right[prod.pos-1]] = [];

			// check if production is already created
			if(typeof items[prod.right] != "undefined") {
				// point to already created
				start.children[prod.right[prod.pos-1]].push(hash(prod));
			} else {
				// create LR item
				var child = new LRItem(prod);

				// Add hashed position of item to start
				start.children[prod.right[prod.pos-1]].push(hash(prod));
				
				// check if pos is at the end
				if(prod.pos >= prod.right.length) {
					// create LRItem and set it as final
					child.final = true;
					
					// Add item to a dictionary with key as the hashed value of production
					items[hash(prod)] = child;
				} else {
					// if not final rcursively traverse it
					startRecursiveBuild(child);
				}
			}

		}
	}

	var start;

	// Method to build LR Tree
	var build = function() {
		// Populate Productions
		generateProductions();

		// Build the root element
		start = new LRItem({left: 'S*', right: 'S', 'pos':0});
		
		// Recursively traverse and create elements of DFA
		startRecursiveBuild(start);

		// Get Terminal Elements in the grammer
		var termList = grammer.getTerminals();

		// Get Non Terminal List
		var nonTermList = grammer.getNonTerminals();

		// Build the table
		self.slrTable = new SLRTable(termList, nonTermList, items, stringProductions);
	}

	build();

	this.root = start;
	this.getChild = function(key) {
		return items[key];
	}

	this.table = function() {
		return self.slrTable;
	}
};