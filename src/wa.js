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

// Convert XML for a pod to a JSON representation
function pod2json(pod) {
  var out = { // Will be returned
    "subpods": [/* Subpods will go here later */],
    "attributes": {}
  };
  // Build the list of subpods
  var subpod_texts = pod.getElementsByTagName("plaintext");
  for (var s=0; s < subpod_texts.length; s++) {
    out.subpods.push(subpod_texts[s].textContent);
  }
  // Include all other attributes
  var attr;
  for (s = 0; s < pod.attributes.length; s++) {
    attr = pod.attributes[s];
    out.attributes[attr.name] = attr.value;
  }

  return out;
}

// Get an object representing all response "pods" given a Wolfram|Alpha API XML
// response. Pairs a pod's title with an object representing its id and subpods
// Subpods are represented as plaintext.
function getPods(xml) {
  var pods = xml.getElementsByTagName("pod");
  var out = {}; // Will be returned

  // Iterate through pods
  var pod, subpods; // Vars used in loop
  for (var i = 0; i < pods.length; i++) {
    pod = pods[i];
    // Add this pod to the dict
    out[pod.id] = pod2json(pod);
  }
  return out;
}

// Get the primary pod from XML DOM object
function getPrimaryPod(xml) {
  var primaryPod = xml.querySelector("[primary=true]");
  return pod2json(primaryPod);
}
