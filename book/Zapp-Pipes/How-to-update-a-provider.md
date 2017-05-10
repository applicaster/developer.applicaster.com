**this page is only relevant for the Reshet-First team, working on the `reshet` branch of this repo**

If you need to update a provider, follow these steps : 

Before you start, make sure you pulled the latest code, and checked out the `reshet` branch

1. Edit the providers in `src/providers/{provider-name}`
2. Run `npm install`
3. Run the test server locally to make sure everything works fine `npm run start:dev`
4. Fix whatever needs to be fixed to make sure you get a response. If the browser shows an error, but not the console, then it means the zapp-pipes logic and the provider are working - but the issue is likely to be on the server from where the data comes from
5. (optional) If you want to test the bundle on Heroku, commit and push changes to a new branch, then go to Heroku dashboard, and manually deploy that branch. All merge to master will automatically trigger a deploy an Heroku
6. (optional) you can test locally the bundle in the app by running `npm run start:script` and use the `local` environment in the native JSPipes Manager (see native classes documentation for info on this)
7. If everything works fine, you can build and deploy the bundle by running `npm run deploy`