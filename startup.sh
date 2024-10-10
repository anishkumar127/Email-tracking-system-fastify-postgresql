
#!/bin/bash

echo "Installing pnpm..."
npm install -g pnpm

echo "Installing dependencies using pnpm..."
pnpm i

echo "Building server..."
pnpm run build

echo "Starting server..."
node ./dist/server.js