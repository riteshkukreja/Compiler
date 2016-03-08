/**
 *	Token Class
 *
 *	Defines a Lexical Unit
 *
 *
 *	Author: Ritesh Kukreja
 *	Wordpress: riteshkukreja.wordpress.com
 *	GitHub: gitHub.com/riteshkukreja
 */

var Token = function(token, TokenClass, line) {

	this.Tokenclass = typeof TokenClass == 'undefined' ? null: TokenClass;
	this.token = typeof token == 'undefined' ? null: token;
	this.line = typeof line == 'undefined' ? null: line;

	this.getTokenClass = function() {
		return this.Tokenclass;
	}

	this.getToken = function() {
		return this.token;
	}

	this.getLine = function() {
		return this.line;
	}

}