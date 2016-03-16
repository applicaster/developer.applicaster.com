[![Circle CI](https://circleci.com/gh/applicaster/developer.applicaster.com/tree/developer2.svg?style=svg&circle-token=270bab912b237794482346a0dbece739cf7515fe)](https://circleci.com/gh/applicaster/developer.applicaster.com/tree/developer2)

# Applicaster Developer Documentation

## Overview

Applicaster Developer Documentation is a tool that holds all the relevant technical and development documentation in a single place.

The project is hosted on Heroku by the name: applicaster-developer

> If you are looking for information about how to add docs to the project please
head to [this link](http://developer.applicaster.com/products-list?product=Developer%20Documentation).

This is a `Node` project based on `React` (data is managed by `Redux`) at the-front end and Hapijs at the backend. it uses also `gulp` to build the documentation and serve it on developer.applicaster.com website.

## Install

```bash
  $ git clone https://github.com/applicaster/developer.applicaster.com.git
  $ npm install # install dependencies
  $ git checkout developer2 # currently the development branch is developer2 and not master
``` 


## Set up
To set up your development environment. please create a `.env` file at the root directory of the project.
in it add the following:

```bash
OAUTH_CLIENT_ID=<accounts client uid>
OAUTH_CLIENT_SECRET=<accounts client secret>
```
To obtain those variables values please refer to the applications section on the accounts.applicatser.com website.


## Run

To run the app locally:

```bash
$ PORT=4001 npm start
```

This will run the app on a local server at port 4001 - http://localhost:4001

### React development

To develop locally the react part of the app run

```bash
$ webpack --watch
``` 

> make sure you have webpack installed globally (if not run `npm install -g webpack`)







