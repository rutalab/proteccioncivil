function validateBrowserForFileUpload(){
	if (window.File && window.FileReader && window.FileList && window.Blob) {
			  // Great success! All the File APIs are supported.
	}
	else {
	  alert('The File APIs are not fully supported in this browser.');
	}
};

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
	  output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	              f.size, ' bytes, last modified: ',
	              f.lastModifiedDate.toLocaleDateString(), '</li>');
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

  var reader = new FileReader();

  reader.onload = function(e) {

    var parser = new DOMParser();

    var doc = parser.parseFromString(reader.result, "text/xml");

    readXML(doc, true);

  };


};

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
};

validateBrowserForFileUpload();
// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
