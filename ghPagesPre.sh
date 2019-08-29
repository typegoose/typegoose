# DO NOT EXECUTE THIS FILE IN YOUR WORKING DIRECTORY
# THIS IS MEANT FOR CI/CD ONLY

shopt -s dotglob nullglob

npm run doc
mv doc/* github-page/typedoc/
find . -not -regex "^\.\/doc.*\|^\.\/github-page.*\|^\.\/\.git.*" -delete
mv github-page/* ./
rm .gitignore
mv travis-.gitignore .gitignore # because "typedoc" folder should be ignored on normal pushed, but not by travis

# redundant, just to have it clean
rm -rf github-page
