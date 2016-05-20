// Various helper functions

// Sort an array by the order of its elements' appearance in a `precedence` array.
// Optionally specify a function for finding the value compared in sort.
function sortByPrecedence(array, precedence, indexFunction) {
  indexFunction = indexFunction || function(a) {return a;};
  var copy = array.slice();
  copy.sort(function(a, b) {
    return precedence.indexOf(indexFunction(a)) - precedence.indexOf(indexFunction(b));
  });
  return copy;
}
