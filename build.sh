echo -n "Building... "

# Create build folder
rm -rf build # Remove any old copies
mkdir build  # Create build folder

# Çoncatenate all JavaScript files into build/mathquill-evaluate.js`
cat src/*.js > build/mathquill-evaluate.js

# Include PHP file
cp src/request.php build

echo "done!"
