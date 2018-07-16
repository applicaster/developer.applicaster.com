# Node.js

We're using Node.js LTS version, currently ^8.x.x
We recommend using [NVM](https://github.com/creationix/nvm) to easily manage node versions

## Versions

- node ^8.0.0
- npm ^5.5.0
- yarn ^1.6.0

## NVM

- `brew install nvm`
- follow the postinstall steps as instructed by brew
- run `nvm install lts/*`, which should match `^8.x.x`

You should now have node `^8.x.x` and npm `^5.x.x`
At any time, you can add a new node version by running `nvm install x.x.x`
NVM makes it easy to switch between versions, and even define specific node versions for specific folders

## Authenticating to NPM

We are using private npm packages. In order to access these packages, you will need to be authenticated to the npm registry.

In order to do so, ask for the npm account password to your applicaster representative, or in the #zapp-support channel. Once you have the password, you can do the following :

- for Applicaster employees only :

```bash
$ git clone git@github.com:applicaster/applicaster-env-vars.git && ./applicaster-env-vars/get.sh <npm_password>
```

- for external developers :

```bash
$ curl -L https://gist.github.com/f-roland/392c185c3d83927504c7c955730cdefd/raw/applicaster-env-vars.sh | bash /dev/stdin <npm_password>
```

- for everyone : run `npx npm-shell-login`

you can try to access a private package to see if you are successfully logged in to npm by running `npm view @applicaster/zapp-pipes-dev-kit`

## Yarn

We are using yarn to manage node.js dependencies. Simply install it with

- `brew install yarn --without-node`
