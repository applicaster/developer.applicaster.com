# Login and Payment Protocol

This document outlines the requirements for mapping the data to determine whether login and/or payment are required to gain access to a video item.

## The "Free" flag
Previously, the flag that was used to achieve this was the "free" flag in the extensions section of the item. However, there are a few drawbacks for using the "free" flag:
1. The flag doesn't distinguish between whether an item requires login or payment to get access to, and might create some confusion. 
2. If the item requires purchase, the "free" flag doesn't specify what entitlements are needed in order to unlock the item.

The suggested protocol is meant to be used by DSPs, who want to provide this information to the app, and can be used by Login / Payment plugins to interpret the action that is needed for the item to be unlocked. 

**Important Note**: if you are using Applicaster2 as your datasource provider, there is no way to add the new extensions to an item, and therefore the "free" flag is the only way to configure an item as "locked".


## "requires_authentication" and "ds_product_ids"

The protocol is based on two fields that are added to the "extensions" section of the item:

* **requires_authentication**: a boolean flag to determine whether login is required to unlock the item. 
This field should be of type "boolean" (true/false) and *not* a "string".
If the flag is not specified, the default value is `false`, which means the item does not require authentication.

* **ds_product_ids**: a list of entitlements needed to unlock the item. 
It is up to the Login / Payment provider to decide if *all* entitlements are required, or a single entitlement is sufficient. 
If the field is not specified, this means that the item does not require purchase.


### Example:
Here is an example of how the field will be configured on a video item:

```
{
  "type": {
    "value": "video"
  },
  "id": "5718802496001",
  "title": "Video that requires login and purchase",
  "published": "2018-01-24T20:48:01+00:00",
  "extensions": {
		“requires_authentication”: true,
		“ds_product_ids”: [“entitlement1”,“entitlement2”,"entitlement3”]
    }
}
```
In the example above, the video item requires both login and payment. 
The list of entitlements that are attached to the item, are listed as "entitlement1",  "entitlement2" and "entitlement3".