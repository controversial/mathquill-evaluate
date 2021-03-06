# mathquill-evaluate
Use the Wolfram|Alpha API to evaluate expressions typed into a
[`MathQuill`](https://github.com/mathquill/mathquill) `MathField`.

## Usage

After building (see "Building"), include either the `build/mathquill-evaluate.js`
file or the `build/mathquill-evaluate.min.js` file in your project.

To evaluate the contents of a `MathField`, simply use

```javascript
evaluate(my_mathfield, options);
```

which will return a numerical answer, if available.

## Building
To build, navigate to the project root and first run `npm install`, then
`npm run build`.

## Running the example
The example is designed to run on a personal computer, rather than a server.
To run the example, first change the file at `example/api-key.js`, replacing
`XXXXX` with an API key obtained from http://products.wolframalpha.com/api/.

Making sure you've already done an `npm install`, run `npm test -s` to build
`mathquill-evaluate` and start the server. Navigate to the `example/index.html`
file in your browser.

## Security
If you want to keep your API key safe, you need to omit the `appid` parameter
from the options passed to `evaluate`. Then, so that you can still access the
API, you can modify `request.php` to automatically add the API key like so:

```php
<?php
header("Content-Type: application/xml");
$query = $_SERVER["QUERY_STRING"];
$url2 = "http://api.wolframalpha.com/v2/query?".$query."&appid=YOUR_API_KEY_HERE";
echo file_get_contents($url2);
?>
```
