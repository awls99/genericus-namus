git pull;
/home/pi/.nvm/versions/node/v14.17.0/bin/npm ci;
/home/pi/.nvm/versions/node/v14.17.0/bin/tsc --resolveJsonModule src/scripts/generator.ts;
/home/pi/.nvm/versions/node/v14.17.0/bin/node src/scripts/generator.js;
/home/pi/.nvm/versions/node/v14.17.0/bin/npm run deploy;
git add src/json/roster.json;
git commit -m "automatic roster update";
git push;
