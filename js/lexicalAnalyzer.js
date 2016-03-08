/**
 *	Lexical Analyzer
 *
 *	This Module is responsible for converting a source code into lexical units (lexemes) which
 *	would be later used in syntactical analyzer.
 *
 *
 *	Author: Ritesh Kukreja
 *	Wordpress: riteshkukreja.wordpress.com
 *	GitHub: gitHub.com/riteshkukreja
 */

 var LexicalAnalyzer = function(code) {

 	/**
 	 *	Seperators defines the tokens / keyword that would seperate other tokens
 	 */
	var separators = Seperator.regex;

	/**
 	 *	Contains the list of all TokenClasses
 	 */
	var classes = [Identifier, Constant, Literal, Operator];

	// To keep track of progress
 	var iterator = -1;
	var response = [];
	var errors = [];

	/**
 	 *	To parse the code into tokens
 	 */
	var parse = function(source) {

		// To Keep Track of line number
		// We will parse line by line
		var lines = source.split("\n");

		for(key in lines) {

			// Convert multiple spaces to single space
			var line = lines[key].replace(/\s+/g, " ");

			// Split the program into seperate tokens
			var tokens = line.split(separators);

			// Get rid of empty tokens
			tokens = tokens.filter(a => a != '' && a != ' ');

			// Loop through tokens and match with respected classes
			for(token of tokens) {

				var match = false;

				for(tokenClass of classes) {
				
					// If token match the tokenClass
					if(tokenClass.is(token)) {
					
						response.push(new Token(token, tokenClass, parseInt(key) + 1));
						match = true;
						break;
					}
				}

				// If no match found, put the token in errors
				if(!match) {
					var error = {};
					error.line = parseInt(key) + 1;
					error.token = token;

					errors.push(error);
				}
			}

		}
	}

 	/* ============================== Methods for lexical analyzer ======================== */

 	/**
 	 *	To Determine if the next token is available
 	 */
	this.hasNext = function() {
		return iterator+1 < response.length;
	}

	/**
 	 *	To get the next token if available
 	 */
	this.nextToken = function() {
		if(this.hasNext())
			return response[++iterator];
		return false;
	}

	/**
 	 *	To Determine if errors are present in code
 	 */
	this.hasErrors = function() {
		return errors.length > 0;
	}

	/**
 	 *	To retrieve the list of errors
 	 */
	this.errors = function() {
		return errors;
	}

	/**
 	 *	To retrieve the list of tokens
 	 */
	this.tokens = function() {
		return response;
	}

	// Parse Immediately
	parse(code);

}