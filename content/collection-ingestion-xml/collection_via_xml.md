# Collection ingestion

## Overview
Collections are a way of group different VOD items.
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

# Example

The expected XML file could be defined in the same way the episode feed is defined today[^1]. The main
difference is that the collection ingestion process ignores all attributes but the `type` &
`external_id`. (in case you have this API implemented)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
  <resource>
    <type>video</type>
    <attributes>
      <title>Some episode 1</title>
      <description>Description for this item</description>
      <external_id>episode1</external_id>
      <enabled>true</enabled>
      <source>http://example.com/path/to/episode1.mp4</source>
      <image_assets>
        <image_asset>
          <key>icon</key>
          <url>http://example.com/path/to/episode1/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/episode1/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
  <resource>
    <type>video</type>
    <attributes>
      <title>Some episode 2</title>
      <description>Description for this item</description>
      <external_id>episode2</external_id>
      <enabled>true</enabled>
      <source>http://example.com/path/to/episode2.mp4</source>
      <image_assets>
        <image_asset>
          <key>icon</key>
          <url>http://example.com/path/to/episode2/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/episode2/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
</resources>```

When the collection ingestion doesn't find a resource with the requested `external_id` it will simply
be ignored i.e not added to the collection.


[^1]: In case you have already implemented the episode feed XML then the it can be used for the collection
ingestion without any changes needed to be done.
