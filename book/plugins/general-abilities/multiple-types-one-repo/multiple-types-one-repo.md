# Using One Code Base for Multiple Plugins

A developer can use one codebase for handling different plugin types.

The main difference between [plugin types](/getting-started/plugin-types.md) and [plugin abilities](/getting-started/plugin-abilities.md) is the fact a single plugin can implement multiple abilities but can be of one type.

The key idea for managing such a scenario is "separation of concerns". Each plugin type should be implemented on a different class.

To achieve this please follow these steps:

1. Create a separate manifest for each plugin type.
2. publish the manifests to Zapp while making sure the dependency versions match between the manifests.

The differences between these manifests would be:

* Plugin type.
* Plugin ID.
* Name and description.
* Class name used as an entry point.
* Custom parameters.

*__Note:__*

* There might be more differences, but these represent the minimal differences that would exist to offer this functionality.
* It would be beneficial to use a similar / identical versioning scheme between the plugins and mention the relationship in the plugins description.

## Useful related documentation

* [Plugin Types](/getting-started/plugin-types.md)
* [Plugin Abilities](/getting-started/plugin-abilities.md)
* [Get ready to work](/dev-env/intro.html)
* [Deploy and submit and plugin](/getting-started/deploy-and-submit.html)
* [Download a development project](/getting-started/download-development-project.html)