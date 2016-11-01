var Dictionary = {
	"nonTerminals": [],
	"terminals": [],
	"productions": [],
	"errors": [],

	"regex": {
		"nonTerminals": /[A-Z]+/,
		"terminals": /[a-z\+\-\*\/\,\.]+/,
		"productions": /[A-Z]+\->([a-zA-Z \+\(\)\-\*\/\,\.]+)(\|[a-zA-Z \+\-\*\/\,\.]+)*/
	}
};