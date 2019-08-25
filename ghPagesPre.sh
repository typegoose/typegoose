# DO NOT EXECUTE THIS FILE IN YOUR WORKING DIRECTORY
# THIS IS MEANT FOR CI/CD ONLY

npm run doc
find . -not -regex "^\.\/doc.*" -delete
mv doc/* ./
rm -rf doc/
