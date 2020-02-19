# Plugin accounts

This article will cover the changes we made to the access for plugin developers

## Main Changes

Each plugin has an owning account.
When submitting a new plugin using zappifest, use the --account with a valid account id:

zappifest publish --manifest <path-to-manifest-json-file> --access-token <zapp-access-token> --account <account-id> --new

What is a valid account id?

An account id must comply with the following terms:
It should be a real account id.
The zapp user using zappifest must have a plugin_developer for this account.

Exceptions and how to handle them:

You are not permitted to publish, update or delete plugins to this account, please contact support.
This exception means the user does not have permission to submit, modify or delete plugins to this account.

Contact customer support in order to grant plugin_developer for the account; make sure that the account id is supplied along with the response.

This plugin is associated with another account, please contact support
This exception means that the plugin is not associated with the account supplied in the --account argument.

Contact a marketplace owner in order to understand which account this plugin is associated with.
The supporting peer should decide whether to grant permission to the correct account, switch the plugin’s account or reject the request.


