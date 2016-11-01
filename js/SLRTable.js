var SLRTable = function(terminalList, nonTerminalList, LRItems, originalProductions) {
	this.terminalList = terminalList;
	this.nonTerminalList = nonTerminalList;
	this.items = LRItems;
	this.productions = originalProductions;

	var self = this;
	self.productions.unshift("S*->S");

	this.table = [];

	// Hash the production
	var hash = function(prod) {
		return prod.left + '->' + prod.right + ':' + prod.pos;
	}

	var clear = function() {
		for(var i in Object.keys(self.items)) {
			var temp = [];
			for(var j in self.terminalList)
				temp.push('');
			self.table.push(temp);
		}
	}

	this.build = function() {
		// build the shit table
		// including goto and shift
		//clear();
		
		for(key of Object.keys(self.items)) {
			var T = [];
			var item = self.items[key].children;

			// Add Shift Data
			for(terminal of self.terminalList) {
				var K = [];
				if(typeof item[terminal] != "undefined") {
					// Terminal Transition exists
					for(each of item[terminal]) {
						K.push('S' + Object.keys(self.items).indexOf(each));
					}
					if(self.items[key].final == true) {
						var prod = self.items[key].productions[0].left + "->" + self.items[key].productions[0].right;
						prod = prod.replace(/\,/gi, '');
						console.log(prod);
						K.push("R" + self.productions.indexOf(prod));
					}
				} else {
					if(self.items[key].final == true) {
						var prod = self.items[key].productions[0].left + "->" + self.items[key].productions[0].right;
						prod = prod.replace(/\,/gi, '');
						console.log(prod);
						K.push("R" + self.productions.indexOf(prod));
					}
					else
						K.push('-');
				}
				T.push(K);
			}

			// Add Goto Data
			for(nonTerminal of self.nonTerminalList) {
				var K = [];
				if(typeof item[nonTerminal] != "undefined") {
					// Terminal Transition exists
					for(each of item[nonTerminal]) {
						K.push(Object.keys(self.items).indexOf(each));
					}
				} else {
					K.push('-');
				}
				T.push(K);
			}

			self.table.push(T);
		}
	}

	var buildRow = function(header, list) {
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		th.innerText = header;
		tr.appendChild(th);
		for(item of list) {
			var td = document.createElement("td");
			td.innerText = item;
			tr.appendChild(td);
		}
		return tr;
	}

	this.show = function() {
		var table = document.createElement("table");
		
		table.setAttribute("cellpadding", 10);
		table.setAttribute("border", 1);
		
		// Add The headers
		var tr = document.createElement("tr");

		// Empty dpace
		var th = document.createElement("th");
		th.innerText = " ";
		tr.appendChild(th);

		// Add Terminal Headers
		for(terminal of terminalList) {
			var th = document.createElement("th");
			th.innerText = terminal;
			tr.appendChild(th);
		}

		// Add Non terminal Headers
		for(nterminal of nonTerminalList) {
			var th = document.createElement("th");
			th.innerText = nterminal;
			tr.appendChild(th);
		}

		table.appendChild(tr);

		// Add Data with header on each row
		for(rowID in self.table) {
			table.appendChild(buildRow(Object.keys(self.items)[rowID], self.table[rowID]));
		}

		// Add to body
		document.body.innerHTML = "";
		document.body.appendChild(table);
	}
};