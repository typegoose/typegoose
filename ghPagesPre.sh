#!/bin/bash

# DO NOT EXECUTE THIS FILE IN YOUR WORKING DIRECTORY
# THIS IS MEANT FOR CI/CD ONLY

# Exit Script when command exits with non-0
set -e

shopt -s dotglob nullglob

cd website
yarn
yarn build
cd ..
find . -not -regex "^\.\/website.*\|^.\/\.git.*" -delete # delete everything that is not starting with ".git" or "website/build"
mv website/build/* ./

# redundant, just to have it clean
rm -rf website
