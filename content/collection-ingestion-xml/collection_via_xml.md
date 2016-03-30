# Collection ingestion

## Overview
Collections are a way of group different type of items such as category, VOD item, channel, program.
In order to make the collection creation process much faster applicaster allows for this process to
happen in an automatic way from a remote URL. This URL must be inserted within the collection creation
form and should point to an XML document with the correct structure.

## XML structure

## Identifying the XML document

This is the first line in the XML response.

```xml
<?xml version="1.0" encoding="utf-8"?>
```

## The `<resources>` element

The resources XML should always start with a `<resources`> node

```xml
<resources>
  <!-- rest of XML comes here -->
</resources>
```
## The `<resource>` element

The resource element defines a single resource.

| Element    | Description                                    | Required |
|------------|------------------------------------------------|----------|
| type       | Resource type. One of `category` or `video`    | Yes      |
| attributes | Resource attributes (see `<attributes>` below) | Yes      |

## The `<attributes>` element

The attributes element holds the attributes that are necessary for the item to be added to a specific
collection as a collection item.

These are the same for all resource types:

| Element     | Description                                                          | Required | Types |
|-------------|----------------------------------------------------------------------|----------|-------|
| external_id | The item’s external ID that was sent in the content ingestion process| Yes      | all   |
| position    | The item’s desired position in the collection                        | Yes      | all   |

# Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
  <resource>
    <type>video</type>
    <attributes>
      <external_id>video_1_id</external_id>
      <position>2</position>
    </attributes>
  </resource>
  <resource>
    <type>category</type>
    <attributes>
      <external_id>category_1_id</external_id>
      <position>1</position>
    </attributes>
  </resource>
</resources>
```

When the collection ingestion doesn't find a resource with the requested external ID it will simply
be ignored i.e not added to the collection


© 2016 Applicaster LTD. All rights reserved.
