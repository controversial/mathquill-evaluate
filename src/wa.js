// Functions specifically for interaction with the Wolfram|Alpha API


// API REQUEST FUNCTION

// Make a Wolfram|Alpha API call given the path to request.php, a query, and an
// API key. endpoint should point to a local, running copy of `request.php` in
// order to get around same-origin.
function getWAResult(endpoint, query, key, callback) {
  var url = endpoint + "?input=" + encodeURIComponent(query) + "&appid=" + key;
  requestPage(url, function(data) {
    callback(xmlParse(data));
  });
}
