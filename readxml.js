
function getXML(xmlpath){
	// Create a connection to the file.
	var Connect = new XMLHttpRequest();

	// Define which file to open and
	// send the request.
	Connect.open("GET", xmlpath, false);
	Connect.setRequestHeader("Content-Type", "text/xml");
	Connect.send(null);

	// Place the response in an XML document.
	var TheDocument = Connect.responseXML;

	return TheDocument;
};


function readXML(xmlpath, isDocument){
	
	TheDocument = isDocument ? xmlpath : getXML(xmlpath);
	var processedText = "";


	var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
	// Place the root node in an element.
	var testi = TheDocument.childNodes[0];


	for (var i = 0; i < testi.children.length; i++){
	//var currentInfo = testi.children[i];
	var node = testi.children[i].nodeName.toString();
	var nodeTP = "<strong>"+node+"</strong>";
	var ident = testi.children[i].textContent.toString();

	// Write the data to the page.
	if(node == "info"){
		//document.writeln(nodeTP);
		processedText+=nodeTP+"<br>";
		//document.write("<br>");
			for (var j = 0; j < testi.children[i].children.length; j++){
				var nodeInt = testi.children[i].children[j].nodeName.toString();
				var nodeIntTP = "<strong>"+nodeInt+"</strong>";
				var identInt =  testi.children[i].children[j].textContent.toString();

				
				if (nodeInt == "event"){
					document.getElementById('event').innerHTML = identInt;
				}
				else if(nodeInt == "headline"){
					document.getElementById('headline').innerHTML = identInt;
				}

			//document.writeln(tab+nodeIntTP);
			processedText+=tab+nodeIntTP+"<br>";
			//document.write("<br>");
			//document.writeln(tab+tab+identInt);
			processedText+=tab+tab+identInt+"<br>";
			//document.write("<br>");
			}
	}
	else{
	   	//document.writeln(nodeTP);
	   	processedText+=nodeTP+"<br>";
		//document.write("<br>");

		//document.writeln(tab+ident);
		processedText+=tab+ident+"<br>";
		//document.write("<br>");
	}

	//document.writeln();
	}
	//document.getElementById('doc').innerHTML = processedText;
};


function xmlToJson(xml) {

	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function printJSON(jsobject){
	var jsonString = JSON.stringify(jsobject)
	var jsonPretty = JSON.stringify(JSON.parse(jsonString),null,2); 
	//document.writeln(jsonPretty);

}

//readXML("ciclon.xml");
//var xmljson = xmlToJson(getXML("ciclon.xml"));
//printJSON(xmljson);