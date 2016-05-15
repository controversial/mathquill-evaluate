<?php

// Simple PHP script to forward the query string passed to WolframAlpha's API.
// This exists only because WolframAlpha does not have CORS set up for its API.

header("Content-Type: application/xml");

$query = $_SERVER["QUERY_STRING"]; // Query string
$url2 = "http://api.wolframalpha.com/v2/query?".$query; // Append to WolframAlpha API endpoint
echo file_get_contents($url2); // Return result

?>
