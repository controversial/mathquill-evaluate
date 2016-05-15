# Allow accessing npm executables
PATH=$(npm bin):$PATH

echo -n "Building... "

# Create build folder
rm -rf build # Remove any old copies
mkdir build  # Create build folder

# Çoncatenate all JavaScript files into build/mathquill-evaluate.js`
cat src/*.js > build/mathquill-evaluate.js

# Include PHP file
cp src/request.php build

# Minify javascript file
uglifyjs build/mathquill-evaluate.js > build/mathquill-evaluate.min.js

echo "done!"
