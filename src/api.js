//Make an asynchronous GET request and pass the recieved data to the callback
function requestPage(url, callback) {
  onSuccess = callback || function(){};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      callback(xhttp.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

// Turn XML into a DOM object (magic!)
function xmlParse(data) {
  p = new window.DOMParser();
  return p.parseFromString(data, "text/xml");
}

// Make a WolframAlpha API call given the path to request.php, a query, and an
// API key. endpoint should point to a local, running copy of `request.php` in
// order to get around same-origin.
function getXMLResult(endpoint, query, callback, key) {
  var url = endpoint + "?input=" + query + "&appid=" + key;
  requestPage(url, function(data) {
    callback(xmlParse(data));
  });
}
