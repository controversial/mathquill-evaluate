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


// RESPONSE PARSING FUNCTIONS

// Get an object representing all response "pods" given a Wolfram|Alpha API XML
// response. Pairs a pod's title with an object representing its id and subpods
// Subpods are represented as plaintext.
function getPods(xml) {
  var pods = xml.getElementsByTagName("pod");
  var out = {};

  var pod, subpods; // Vars used in loop
  for (var i = 0; i < pods.length; i++) {
    pod = pods[i];
    out[pod.id] = {
      "title": pod.getAttribute("title"),
      "subpods": [/* Subpods will go here */],
    };
    subpod_texts = pod.getElementsByTagName("plaintext");

    for (var s=0; s < subpod_texts.length; s++) {
      out[pod.id].subpods.push(subpod_texts[s].textContent);
    }
  }
  return out;
}
