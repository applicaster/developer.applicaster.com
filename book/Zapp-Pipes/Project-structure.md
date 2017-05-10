**this page is only relevant for the Reshet-First team, working on the `reshet` branch of this repo**

This project contains the following files and folders : 

- src : contains the source code of the project
  - config : some config files for the server and the project. It contains the list of providers to load, which by default is `applicaster` and `reshet-first`
  - home : simple home page for the server. not relevant
  - providers : contains the applicaster & reshet-first providers. This is where you need to update code when provider change and you want to deploy a new bundle
  - resolver: not in use currently
  - router : main router logic for the library
  - utils : helpers and utility functions
  - index.js : entry point for the bundle
  - server.js : entry point for the server mode
- test files
- .babelrc : config file for babel
- .eslintrc : config file for eslint
- .gitignore : built files are ignored in the repo
- .npmignore : source files are not pushed to npm when it the package is published
- README.md : handle with care :D may not be the most up to date. The install section should be fine though
- package.json : npm config & dependencies
- webpack-hot.js : webpack config for serving the bundle locally form the source, with hot-reloading (can be useful for debugging issues)
- webpack.config.js : webpack config for building the bundle
