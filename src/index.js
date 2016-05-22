// Try to evaluate the content of a MathField
function evaluate (mathfield, config) {
  // Set input to MathField's LaTeX (processed)
  config.input = processLatex(mathfield.latex());
  // Default endpoint is powered by http://crossorigin.me/. This could very
  // easily break, so it's good to specify your own endpoint if you can.
  config.endpoint = config.endpoint || "http://crossorigin.me/http://api.wolframalpha.com/v2/query";

  // Add an extra layer around the callback
  var oldCallback = config.callback;
  var newCallback = function(data) {
    oldCallback(getResult(data));
  };
  config.callback = newCallback;

  var result = getWAResult(config);
}
