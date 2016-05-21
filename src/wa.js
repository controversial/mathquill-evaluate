// Functions specifically for interaction with the Wolfram|Alpha API


// API REQUEST FUNCTION

/*
Make a Wolfram|Alpha API call given a `params` object, which should contain:
  appid: your API
  input: your Wolfram|Alpha API input
  endpoint: a URL to a served copy of `request.php` (in order to circumvent same-origin)
  callback: a callback to be run after the request is finished

Any additional data in `params` will be passed to the Wolfram|Alpha API, but is not required
*/
function getWAResult(params) {
  // Extract the data that won't be passed to constructParams
  var callback = params.callback || function(){};  delete params.callback;
  var endpoint = params.endpoint;                  delete params.endpoint;
  // Make some assumptions if data is missing
  if (params.format === undefined) {params.format = "plaintext,";} // Only return plaintext results
  if (params.scanner === undefined) {params.scanner = "Numeric,Reduce,Simplification";} // Only return math stuff
  var url = constructParams(endpoint, params);
  requestPage(url, function(data) {
    callback(xmlParse(data));
  });
}


// RESPONSE PARSING FUNCTIONS

// Try to make Wolfram|Alpha's <plaintext> elements more bearable
function processText(text) {
    // Replace the strange unicode character they use for an equals sign with a normal one
    text = text.replace(/\uf7d9/g, "=");
    // Remove spaces (they're never necessary, I don't think)
    text = text.replace(/\s/g, "");

    return text;
}

// Convert XML for a pod to a JSON representation
function pod2json(pod) {
  var out = { // Will be returned
    "subpods": [/* Subpods will go here later */],
    "attributes": {}
  };
  // Build the list of subpods
  var subpod_texts = pod.getElementsByTagName("plaintext");
  for (var s=0; s < subpod_texts.length; s++) {
    out.subpods.push(
      processText(subpod_texts[s].textContent)
    );
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

// Get the primary pod from XML DOM object. In the case of multiple primary pods,
// try to return the more parseable of the two.
function getPrimaryPod(xml) {
  var primaryPods = xml.querySelectorAll("[primary=true]");
  var primaryPod;
  if (primaryPods.length === 1) { // Only pod is labelled as "primary"
    primaryPod = primaryPods[0];
  } else { // Attempt to resolve multiple "primary pods" by specifying scanner precedence
    var pods = Array.prototype.slice.call(primaryPods);

    primaryPod = sortByPrecedence(
      Array.prototype.slice.call(primaryPods),
      [
        "Numeric", // Most likely to be parseable
        "Reduce",
        "Simplification"
      ],
      function(p){return p.getAttribute("scanner");}
    )[0];
  }
  return pod2json(primaryPod);
}

// Get plaintext for the primary pod and try to parse into a good format
function getResult(xml) {
  // Basic data
  var primarypod = getPrimaryPod(xml);
  var text = primarypod.subpods[0];
  var scanner = primarypod.attributes.scanner;

  // Numeric scanner. Result is a simple number, queries such as "pi" or "square root of 4"
  if (scanner === "Numeric") {
    // Strip trailing ellipsis
    if (text.charCodeAt(text.length-1) === 8230) {
      text = text.slice(0, text.length-1);
    }
    return parseFloat(text);
  }

  // Scanner for solving an expression, like "3y=3x+4" -> "y=3x+4/3"
  if (scanner === "Reduce") {
    // This might have something later
  }

  // I'm not sure what this is for.
  if (scanner === "Simplification") {
    // This also might have something later
  }

  return text;

}
