# One Code Base for Multiple Plugins

A developer can open one repository for handling different plugin types.

For example, you can build a push plugin and later add support for an analytic plugin in the same repository.

The key idea for managing such a scenario is "separation of concerns", each plugin type should be implemented on a different class.

Then, you will need to create a different manifest file per plugin type implementation and publish it on Zapp.

## Useful related documentation

* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)