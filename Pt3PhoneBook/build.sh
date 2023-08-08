#! /usr/bin/bash

rm -r ./frontend/build
echo -n "removed build from frontend"
npm run build --prefix frontend
echo -n "made new build"
cp -r ./frontend/build ./backend
echo -n "copied build to frontend"
