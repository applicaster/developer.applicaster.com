# Plugin abilities

All plugins can implement multiple protocols that will give them different entry points to be called by the Zapp SDK.

Here are a couple of the abilities that can be added to each plugin:

## Screen

Screen protocols enable plugins to provide screens to be integrated in the UI builder and create custom flows.
For more info about screens -------


## Hooks
There are 2 type of hooks capabilities:
* App loading hooks.
* Screen hook plugins.
Both can be used for any plugin

### App loading hooks

Using app loading hooks a plugin can request to be executed on:
* On application launch - before networking starts
* Failed application loading
* When application finished initial loading and is ready to start
* After home screen is displayed

### Screen hook plugins
Hooks enable plugins to add steps before or after certain screens in the flow.
These hooks can contain both synchronous and asynchronous steps (like either analytics events that don't require waiting for or login between screens, geoblock and other steps that might affect presenting the next screen)

## URL scheme handling
Allow plugins to handle certain URL schemes.
While a generic launch URL scheme exists for all plugins for presentation - sometimes a custom URL scheme is needed or desired - Each plugin can implement handling URL schemes of a certain type.

[Get ready to work](/dev-env/intro.md)