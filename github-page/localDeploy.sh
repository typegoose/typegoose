#!/bin/bash

# Use this file, if you want to test jekyll / the github-page locally
# This script creates a copy of the repo in /tmp just to keep the original source untampered
# This script expects you to have ruby & ruby-dev installed, and at least once run the bundle install of the modules in this site

shopt -s dotglob nullglob

rm -rf /tmp/typegoose-jekyll || exit 0 # if already existing, remove the folder

mkdir /tmp/typegoose-jekyll # create the new folder

cp -r ./* /tmp/typegoose-jekyll # copy everything over

cd /tmp/typegoose-jekyll # change CWD to the new folder (to not damage the old one)

bash ghPagesPre.sh # run the CI script

bundle exec jekyll serve # run the local server

exit $? # exit this script with whatever jekyll exited
