# Deploy your iOS plugin to CocoaPods

In order to distribute the plugin - part of the necessary steps is publishing a podspec.
The following guide will review the logic we use for versioning, pod publishing options, and best practices.

For a sample podspec, please refer to our [iOS getting started guide](/dev-env/iOS.md).

## Versioning
The best practice for versioning is to use a 3 number structure versioning scheme.
We try to stick to [Semantic versioning](https://semver.org) structure meaning - MAJOR.MINOR.PATCH
* Major version is used for incompatible API changes - so all breaking changes should increase the major version number.
* Minor version is used for adding functionality in a backwards-compatible manner.
* Patch version is used when making a bug fix while not changing any compatibility or existing features.

To further simplify working with Zapp, setting dependency version in a plugin manifest allows Zapp to build with the latest patch version without requiring a new plugin manifest be resubmitted - just perform a new build.

## Publishing a pod strategies
There are 4 pod publishing strategies that a developer can use to create a version based on a podspec:
1. Create a public podspec repository containing the podspecs
2. Contribute to the Applicaster pods repositories (available for certain partners and Applicaster developers)
3. Host the pod inside the plugin repository in a `Specs` folder
4. Create a private podspec repository containing the podspecs

Unfortunately, at the moment, a public pod isn't an option due to the fact that `ZappPlugins` dependency isn't published in Cocoapods public podspec repository.
While the code is opensourced - the nature of the needs to update versions derived by CI doesn't allow for a good workflow.

### Create a public podspec repository
The first option is simply creating an in house public podspec repository.
In order to do this - simply create a new public git repository with the following structure:
```
/Specs
  /<Dependancy name>
    /<Dependancy version>
      /<Dependancy name.podspec>
```

In the plugin manifest please add the following:
```
  "dependency_repository_url": [
      "git@github.com:<git account name - containing the repository>/<Specs repository name>.git"
  ]
```

### Contribute to the Applicaster pods repositories
If you have access to the Applicaster [Cocoapods Private Repository](https://github.com/applicaster/CocoaPods-Private), please create a pull request to this repository.

If you do not have access to the private repository use our [Public Cocoapods Repository](https://github.com/applicaster/CocoaPods).
Either by pushing a branch and opening a PR or forking and creating a PR to the repository.

In this case - there is no need to add the repository in the plugin manifest.
Zapp by default uses this repository to look for dependancies.

### Host the pod inside the plugin repository
This method should be mainly used to get off the ground and is not recommended.
The main issue with this method is the repository is pulled on any `pod update` run and is stored in the local pods cache.

While the repository might start as being light weight (especially if it contains no assets) - this gets graduatly heavier. Especially if the plugin contains assets or compiled binaries.

Just like creating a public podspec repository, you will need to create the following structure:
```
/Specs
  /<Dependancy name>
    /<Dependancy version>
      /<Dependancy name.podspec>
```

In the plugin manifest, please add the following:
```
  "dependency_repository_url": [
      "git@github.com:<git account name - containing the repository>/<Plugin repository name>.git"
  ]
```

### Create a private podspec repository
This approach is similar to creating a public podspec repository in terms of setup.
The main difference would be adding the Applicaster CI git user and Dev relations contact user to the repository with read permissions.
Please contact your Dev Relations partner to get the updated github users to set this up.

In order to do this, simply create a new public git repository with the following structure:
```
/Specs
  /<Dependancy name>
    /<Dependancy version>
      /<Dependancy name.podspec>
```

In the plugin manifest, please add the following:
```
  "dependency_repository_url": [
      "git@github.com:<git account name - containing the repository>/<Specs repository name>.git"
  ]
```
