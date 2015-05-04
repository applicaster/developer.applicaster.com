[ ![Codeship Status for applicaster/developer.applicaster.com](https://codeship.com/projects/5f7e9510-d479-0132-56d5-5a6d300c202d/status?branch=master)](https://codeship.com/projects/77789)

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

* From accounts.applicaster.com click on the Applications tab.
* Choose "Applicaster Docs" and click on the (i) button.
* Copy the UID and Secret (on the next steps you'll need to put those values
into the .env file)
* Make sure you are on the **applicaster-developer-documentation (PULL ONLY)**
team. If you are not, please ask to be added to the team by a Github Account
owner (e.g. Gavri)
* Go to https://github.com/settings/applications and generate a new token.
Make sure the repo option is checked (should be checked by default).
Copy the generated token.


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

To deploy to http://developer.applicaster.com/ we use Codeship for continuous
deployment. Please create a Pull Request with your changes. once merged to
the master branch it will be deployed automatically.

