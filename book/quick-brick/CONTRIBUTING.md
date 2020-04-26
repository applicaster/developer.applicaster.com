# Contributing to the QuickBrick Repository

## Tools

Any text editor will do, but we advise to use Microsoft VisualStudio Code.
On top of this, you should run the `Prettier` extension, with `formatOnSave` option enabled. This allows for consistent code styling, no matter who is the author of the code

## Process

All contributions must go through a pull request.

- Create your local branch
- prepare your app
- **check out the changes to yarn.lock and package.json** this is important to avoid locking dependencies which are only relevant to a specific app or a plugin
- write your code
- add unit tests, written with Jest as much as possible. Tests should be in your module in a `__tests__` folder, and suffixed with `.test.js`
- add inline JSDoc comments to document what your function does, and what the signature and return value are
- create meaningfull commit with explicit & explanatory messages. try to avoid commits like `test`, `fix`, `update`. Commit messages are the starting point for people to understand your change
- your commit messages should follow the rules of [conventional commit](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification)
- when you are happy with your changes, make sure you run the linter & the tests locally before pushing
- If the linter & tests pass, push your branch to the repository, and create your pull request in Github. Fill in the PR template, and make sure the name of your PR also follows the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification) rules
- Adress comments raised by your reviewers, while always making sure your commit messages are clear and comply to the points above
- when your PR is approved, you can merge it using Github's Squash & merge feature. Make sure your full commit message is correct, as this will be used for generating changelog, and figuring out the versionning the next time a release is made.

## Releasing versions

QuickBrick releases are done automatically on CircleCI, by approving optional workflow jobs on PR or master builds.
There are 2 types of releases :

1. `rc` or release candidates.
   They can be created from branch or master builds. they will have a version number like `x.y.z-rc.a`, and will be published to NPM under the `@next` tag, which will prevent users accidentally upgrading to potentially unstable code.

- Standard release can be only created on master branches. The creation of standard release is subject to a more complex process with QA and the release of builder SDKs. As a rule of thumb, you should not create standard releases

When creating a release, the CircleCI workflow will publish the versions to NPM, create a tag in the repository, update the references of the versions in all the packages, and push that commit. This is why it is critical, when creating a release candidate from a PR, to make sure the commit of the version publication is merged to master, otherwise other version push will fail. If your PR is closed and not merged, make sure you create another PR which cherry-picks the release commit, and that this is merged to master.

## Coding guidelines

Here are a few guidelines for the javascript code:

- prefer functional stateless component when possible
- use the standard `function` syntax, unless you specifically need to bind an anonymous function to its context
- use component methods bound in the constructor instead of class properties
- document your prop types with `flow` instead of `prop-types`
- destructure arrays and objects at the top of the scope as much as possible. This allows to quickly see what the function / method is using
- if you're not sure about a function's signature, use a single object argument, destructured in the signature
- use named exports instead of default exports
-
