// api.js - generic functions for interacting with an XML API.

// Construct a URL with a query string
function constructParams(baseURL, params) {
  var keys = Object.keys(params);
  var out = baseURL + "?";
  var values = [];
  for (var i=0; i<keys.length; i++) {
    var k = keys[i];
    values.push(k+"="+params[k]);
  }
  return out+values.join("&");
}

// Make an asynchronous GET request and pass the received data to the callback
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

// Make an asynchronous GET request and pass the XML as a DOM object to the callback
function requestXml(url, callback) {
  requestPage(url, function(data) {
    callback(xmlParse(data));
  });
}
