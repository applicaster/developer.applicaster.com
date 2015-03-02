# Applicaster Developer Documentation
Info about the project can be found at docs/README.md

The project is hosted on Heroku by the name: applicaster-developer

## Install


```bash
  $ git clone https://github.com/applicaster/developer.applicaster.com.git
  $ npm install # install dependencies
```

## Usage

create a file named .env in the root directory and the following environment variables:
```bash
PORT=<Default port name>
OAUTH_CLIENT_ID=developer
OAUTH_CLIENT_SECRET=<accounts client secret>
CLIENT_ENV=development
TOKEN=<github applicaster-developer-documentation user token followed by the @ sign>
```

```bash
  $ git clone https://github.com/applicaster/developer.applicaster.com.git
  $ npm install # install dependencies
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
