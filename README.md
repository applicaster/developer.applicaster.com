# Applicaster Developer Documentation
Info about the project can be found at docs/README.md

The project is hosted on Heroku by the name: applicaster-developer

## Install


```bash
  $ git clone https://github.com/applicaster/developer.applicaster.com.git
  $ npm install # install dependencies
```

## Usage

### Prerequisites
To test and develop locally you first need to get the following data:

* from accounts.applicaster.com click on the and click the apps tab.
* Choose "Applicaster Docs" and click on the (i) button.
* Copy the UID and Secret (on the next steps you'll need to put those values
into the .env file)
* Make sure you are on the **applicaster-developer-documentation (PULL ONLY)**
team. If you are not, please ask to be added to the team by a Github Account
owner (e.g. Gavri)
* Go to https://github.com/settings/applications and generate a new token.
Make sure the repo option is checked (should be checked by default).
Copy the genrated token.


create a file named .env in the root directory and the following environment 
variables:

```bash
OAUTH_CLIENT_ID=<accounts client uid>
OAUTH_CLIENT_SECRET=<accounts client secret>
TOKEN=<github token> 
```

```bash
  $ gulp build # Import all documentation packages and build the website
  $ node index # Start node server
```

## Add new docs package

Instructions can be found on the web here:
http://developer.applicaster.com/internal/dev-doc-readme/

Or locally under ./docs/README.md 


## Deploy

With an authorised account username do:
```bash
  $ git push heroku master
```
