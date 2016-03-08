function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var files = evt.target.files[0]; 
 
    if (files) {
	    var reader = new FileReader();
	    reader.onload = function(e) { 
			var Source = document.getElementById("code");
			var Destination = document.getElementById("tokens");

		    var contents = e.target.result;
		    Source.value = contents;
		     
		    lex = new LexicalAnalyzer(contents);
		    json = JSON.stringify(lex.tokens(), undefined, 4);
			Destination.innerHTML = json;
		}
		reader.readAsText(files);
	} else { 
	    alert("Failed to load file");
	}
}

window.onload = function() {
	var Source = document.getElementById("code");
	var Destination = document.getElementById("tokens");
	var inputs = document.querySelectorAll( '.inputfile' );
	
	Source.addEventListener("keyup", function() {
		var code = Source.value;
		lex = new LexicalAnalyzer(code);

		json = JSON.stringify(lex.tokens(), undefined, 4);
		Destination.innerHTML = json;
	});


	Array.prototype.forEach.call( inputs, function( input )	{
		var label = input.nextElementSibling,
			labelVal = label.innerHTML;

		label.onclick = function() { input.click(); }

		input.addEventListener( 'change', function( e ) {
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});

	document.getElementById('fileinput').addEventListener('change', readSingleFile, false);

}