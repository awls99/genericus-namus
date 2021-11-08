# Genericus Namus (Magtheridon-EU) Guild Page

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Current way of updating data:
1. Create a src/scripts/blizzCreds.ts file, it's used for contacting with battle.net and blizzard's API. it should follow this interface 
```
interface Creds {
  base: string; // url
  clientid: string; // see blizzard's api documentation to generate this
  secret: string; // and this
  locale: string; // usually `en-GB`
  origin: string; // usually `eu`
  token?: string; // this gets updated autoamtically by the login call
  patch: string; // usually `static-eu`
};
```
2. `npm run generate` this will write down a new `src/json/roster.json` which is where the information lies.

## Automatic Deploys
The script `src/scripts/update.sh` is ran every two hours and updats the data and deploys the new version of the GitHub Page, this allows the page to function without a backend for now.


## Available Scripts

In the project directory, you can run:

### `npm run generate`
Updates the data jsons with fresher data.
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm deploy`

Deploys the app as a github page.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
