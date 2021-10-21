git pull;
npm ci;
tsc --resolveJsonModule src/scripts/generator.ts;
node src/scripts/generator.js;
npm run deploy;
git add src/json/roster.json;
git -m "automatic roster update";
git push;
