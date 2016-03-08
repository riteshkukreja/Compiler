/**
 *	Token Class
 *
 *
 *	Author: Ritesh Kukreja
 *	Wordpress: riteshkukreja.wordpress.com
 *	GitHub: gitHub.com/riteshkukreja
 */

var TokenClass = function(opt) {
	this.regex = opt.regex;
	this.type = opt.type;

	this.is = function(token) {
	 	if(!token.match(this.regex)) return false;
	 	return token.length == (token.match(this.regex))[0].length;
	 }
}

/**
 *	Identifier Token Class
 */
var Identifier = new TokenClass({
	regex: /(\$[a-zA-Z_][a-zA-Z_\-0-9]*)/, 
	type: "Identifier"
});


/**
 *	Constant Token Class
 */
var Constant = new TokenClass({
 	regex: /([0-9]+(\.[0-9]+)?)/,
 	type: "Constant"
 });


/**
 *	String Literals Token Class
 */
var Literal = new TokenClass({
 	regex: /([\"\']).*\1/,
 	type: "Literal"
 });


/**
 *	Constant Token Class
 */
var Operator = new TokenClass({
 	regex: /([+\-*\/%\^=])/,
 	type: "Operator"
 });


/**
 *	Seperator Token Class
 */
var Seperator = new TokenClass({
 	regex : /\s/,
 	type: "Seperator"
 });