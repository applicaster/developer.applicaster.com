# Book Boilerplate

## Overview

Using this Repo you'll be able to create a new gitbook and host it in heroku.

## Setup

* Clone the project

```bash
$ git clone git@github.com:applicaster/book-boilerplate.git <BOOK_NAME> && cd <BOOK_NAME>

```
* Reset git to start a new git project for the book

```bash
$ rm -rf .git && git init && git add . && git commit -m "initial commit"
```

* Install dependencies

```bash
$ yarn install
```

> Flow the command line instructions

* Publish the newlly created repo to github

## Write the book

Your book content is located ad the `book` folder.
TO find out more on how to arrange your content read the following:

* [Directory Structure](https://toolchain.gitbook.com/structure.html)
* [Pages and Summary](https://toolchain.gitbook.com/pages.html) 

## See book locally

You can view your compiled book by running.

```bash
$ yarn run serve

```

> Changes you do in the book content will show app immediately in the book

#### Test Authorization locally

If you want to test how Applicaster Accounts authorization works add a `.env` file to the root of the repo and add the environment variables listed bellow - [environment variables](#env_vars) e.g.:

```bash
PORT=4001
USE_ACCOUNTS_AUTH=1
CLIENT_ID=<CLIENT_ID_TAKEN_FROM_APPLICATER_ACCOUNTS>
CLIENT_SECRET<CLIENT_SECRET_TAKEN_FROM_APPLICATER_ACCOUNTS>

```

Then run

```bash
$ yarn build
$ yarn start
```


## Publish to Heroku

* Login to Heroku using Applicaster Account
* Create a new Heroku app and give it a name

> **NOTE:** If you want to make your book to have restricted login make sure your create the environment variables before proceeding [Restricting book access](#restrict)

* Go to the app `Deploy` tab and choose `Github` as the deployment method
* Search and connect your created repo
* Click on the `Enable Automatic Deploys` to enable book recompile when the repo's content is updated.
* Click on the `Deploy Brunch` to deploy the book for the first time.


### <a name="restrict"></a>Restrict book access
In case you want to restrict access of the book to only Applicaster logged in members do the following

#### Create a new Application in Applicaster accounts
* Go to - https://accounts.applicaster.com/admin/applications
* Create a new Application and for the `Redirect uri` put your heroku app URL with the following suffix `/bell/door` e.g. if your App heroku url is  `https://book-b1.herokuapp.com/` so set `https://book-b1.herokuapp.com/bell/door` as the `Redirect uri`

#### <a name="env_vars">Add the following environment variables
* `USE_ACCOUNTS_AUTH` - Should the book be restricted using Applicaster Accounts oAuth (0 - no restriected, 1 -restricted)


* `CLIENT_ID` - Applicaster Accounts CLIENT_ID

* `CLIENT_SECRET` - Applicaster Accounts CLIENT_SECRET
