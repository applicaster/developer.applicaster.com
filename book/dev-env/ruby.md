# Ruby

Part of our tooling relies on rake and Ruby. In order to make sure things run smoothly, we recommend installing [rbenv](https://github.com/rbenv/rbenv) to easily manage ruby versions

## Versions

- Ruby 2.3.5 || 2.4.2

## Install

- run `brew install rbenv`
- run `rbenv init`
- follow the postinstall steps as instructed on the screen, then restart your terminal
- you can check your install by running `curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash`
- from this point, you can run `rbenv install 2.3.5` and `rbenv install 2.4.2`

As a rule of thumb, most projects will use ruby 2.3.5, except Zapp-iOS which relies on ruby 2.4.2

## Gems

You will need the bundler Gem to install project dependencies.
Simply run `gem install bundler`
Once this is done, you can easily install project dependencies by running `bundle install`
