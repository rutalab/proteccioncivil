function validateBrowserForFileUpload(){
	if (window.File && window.FileReader && window.FileList && window.Blob) {
			  // Great success! All the File APIs are supported.
	}
	else {
	  alert('The File APIs are not fully supported in this browser.');
	}
}

//var reader = new FileReader();

//	  reader.onload = function(e) {

//	    var parser = new DOMParser();

//	    var doc = parser.parseFromString(reader.result, "text/xml");

//	    readXML(doc, true);

//	};





function processFiles(files) {
	
	var file = files[0];

	var reader = new FileReader();

		reader.onload = function (e) {


		    var parser = new DOMParser();

		    var doc = parser.parseFromString(reader.result, "text/xml");

		    readXML(doc, true);

		    document.getElementById("upl").innerHTML = "Archivo Procesado";

		};

	reader.readAsText(file);
}


validateBrowserForFileUpload();
// Setup the dnd listeners.
//var dropZone = document.getElementById('drop_zone');
//dropZone.addEventListener('dragover', handleDragOver, false);
//dropZone.addEventListener('drop', handleFileSelect, false);
//document.getElementById('files').addEventListener('change', handleFileSelect, false);
