var mathfield;

var mq = MathQuill.getInterface(2);

function onEdit() {
  document.getElementById("output").innerHTML = "Latex: "+mathfield.latex();
}

$(document).ready(function() {
  var input = document.getElementById("math-field");
  var output = document.getElementById("output");

  mathfield = mq.MathField(input, { handlers: {edit: onEdit} } );

});

// Register click event for button
$("#evalButton").click(function() {

  console.log("clicked");
  evaluate(mathfield, {
    endpoint: "http://localhost:8080/example/request.php",
    appid: "***REMOVED***",
    callback: function(data){
      alert(data);
    }
  });

});
