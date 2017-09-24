# VOD Ingestion Via XML

| Version | Description               |
|---------|---------------------------|
| 1.0.0   | First Release.            |
| 1.1.0   | Add "genre" resource type |
| 1.2.0   | Add "link" resource type  |

# Overview

The VOD XML ingestion process loads assets to Applicaster’s CMS.
This works by configuring an HTTP(s) URL in the CMS that will be queried regularly.

This URL should respond with an XML document formatted according to the
specifications in this document.

If your systems require IP access control please ask Applicaster’s representative
for the IP of the ingesting servers.

If using Applicaster’s video encoding and delivery services you will need a
**video file** (mp4, wmv, avi...) accessible by HTTP(S) to be ingested to
Applicaster’s system. This file **should** be of the highest quality possible,
the system will transcode this file to multiple bitrates and make sure it’s
compatible to all devices required.

# XML structure

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


## The `<resource>` tag

The resource element defines a single resource.

| Tag          | Description                                                                     | Required |
|--------------|---------------------------------------------------------------------------------|----------|
| `type`       | Resource type. one of `genre`, `show`, `season`, `category`, `link` or `video`. | Yes      |
| `attributes` | Resource attributes (see `<attributes>` below).                                 | Yes      |

> Note: resource of type `video` can never be in the same XML as other
resource types. Currently there is no way to place videos in the same list as
other types.

## The `<attributes>` tag

The attributes tag holds the attributes of a specific resource.

Different resource types have some variance in the tags that their
`<attributes>` tag can contain. the "Types" column below shows which types
each tag is relevant for.

### Common tags

These are the same for all resource types:

| Tag                   | Description                                                                                                                                                                                                                                                                      | Required                                 | Types                  |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|------------------------|
| `title`               | The item’s title                                                                                                                                                                                                                                                                 | Yes                                      | All                    |
| `description`         | The item’s description                                                                                                                                                                                                                                                           | No                                       | All                    |
| `external_id`         | The resource's id in your system. NOTE: this must be unique across all resources. The value can be any string with length up to 80 characters                                                                                                                                    | Yes                                      | All                    |
| `enabled`             | Should the item be enabled for viewing. this should be either the string `true` or `false`                                                                                                                                                                                       | Yes                                      | All                    |
| `image_assets`        | Images used for this resource. (see `<image_assets>` below)                                                                                                                                                                                                                      | Yes                                      | All                    |
|`date_published` | The date the item was published in [ISO8601 combined date and time format](http://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) | No| All

### Type specific tags

| Tag                   | Description                                                                                                                                                                                                                                                                      | Required                                 | Types                  |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|------------------------|
|`duration`| video duration in seconds (at most 9999 seconds ~ 2.8 hours)|No|video
|`external_link`| URL to a related web resource (e.g. IMDB)   |No|video
|`video_360`| Boolean describing whether the video is 360&deg; enabled |No|video
| `source`              | URL for the source video file                                                                                                                                                                                                                                                   | Yes (unless using `alternative_streams`) |  video         |
| `alternative_streams` | Streaming URLs for this item **&#8224;**. See below for further explanation   | Yes (unless using `source`)                                       | video         |
| `external_sync_url`   | a URL to an XML built according to this document describing the content of this collection                                                                                                                                                                                       | No                                       | category, show, season |
| `link_url`            | an HTTP(S) URL that hosts the web content that will be displayed in the webview                                                                                                                                                                                                  | Yes (for the `link` type)                |  link          |
| `orientation`         | Supported device orientation. One of `portrait`, `landscape`, or `both`. default: `both`                                                                                                                                                                                         | No                                       |  link          |
| `show_navigation`     | Should the application show back/forward buttons. Either `true` or `false`. default: `true`                                                                                                                                                                                      | No                                       |  link          |
| `show_close_button`   | Should the application show a close button. Either `true` or `false`. default: `true`                                                                                                                                                                                            | No                                       |  link          |
| `enable_zoom`         | Can the user change scale of the webview. Either `true` or `false`. default: `false`                                                                                                                                                                                             | No                                       | link          |
| `external_policy`     | Includes a nested XML that contains values that are relevant for any client that needs to process this attribute                                                                                                                      | No                                         | video      |
| `free`     | Indicates whether the video is free for viewing  | No | video  |
&#8224; *Only use this tag if you are sure the provided URLs are HLS streams that comply to Apple’s AppStore submission guidelines. using non compliant streams can result in the app being rejected by Apple.*
## The `<alternative_streams>` tag

This tag defines streaming URLs for the video resource.

They can only be placed in an `<attributes>` tag of a `<resource>` with type `video`.

The `<alternative_streams>` tag can contain the following tags:

| Tag       | Description                                                                         | Required |
|-----------|-------------------------------------------------------------------------------------|----------|
| `default` | An HLS stream URL. This must be compliant to Apple’s AppStore guidelines           | Yes      |
| `rtsp`    | An RTSP stream URL &#8225;  | No       |
| `mp4`     | An mp4 stream URL &#8225;  | No       |
&#8225; This will be used only for old devices that have no HLS support

## The `<image_assets>` tag

This tag lists images that the app can use for the application’s UI.

It contains a list of `<image_asset>` tags, one for each available images.

Every application needs a different set of images, please ask applicaster’s representative for the correct image names and sizes of the specific application.

## The `<image_asset>` tag

The  `<image_asset>` tag contains the following tags:

| Tag   | Description                                                                                                                                                           | Required |
|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `key` | The image asset name (ex. `icon`, `thumbnail`, ...)                                                                                                                   | Yes      |
| `url` | A unique URL to fetch the image from. Different images should use different URLs (e.g. a change in an icon will only be picked up if accompanied by a change in the URL). Notice that this URL is cached and served to apps by Applicaster’s system and not directly acccessed by devices. | Yes      |

# Examples

## Genre feed

This XML contains a list of genres, each genre's content will be ingested from
the URL supplied in `<external_sync_url>`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
  <resource>
    <type>genre</type>
    <attributes>
      <title>Genre 1 title</title>
      <description>Description for this genre</description>
      <external_id>genre1</external_id>
      <enabled>true</enabled>
      <external_sync_url>http://example.com/genre1.xml</external_sync_url>
      <image_assets>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/genre1/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/genre1/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
  <resource>
    <type>genre</type>
    <attributes>
      <title>Genre 2 title</title>
      <description>Description for this genre</description>
      <external_id>genre2</external_id>
      <enabled>true</enabled>
      <external_sync_url>http://example.com/genre2.xml</external_sync_url>
      <image_assets>
        <image_asset>
          <key>icon</key>
          <url>http://example.com/path/to/genre2/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/genre2/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
</resources>
```

## Main TV shows feed
This XML contains a list of shows, each show's content will be ingested from
the URL supplied in `<external_sync_url>`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
  <resource>
    <type>show</type>
    <attributes>
      <title>Show 1 title</title>
      <description>Description for this show</description>
      <external_id>show1</external_id>
      <enabled>true</enabled>
      <external_sync_url>http://example.com/show1.xml</external_sync_url>
      <image_assets>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/show1/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/show1/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
  <resource>
    <type>show</type>
    <attributes>
      <title>Show 2 title</title>
      <description>Description for this item</description>
      <external_id>show2</external_id>
      <enabled>true</enabled>
      <external_sync_url>http://example.com/show2.xml</external_sync_url>
      <image_assets>
        <image_asset>
          <key>icon</key>
          <url>http://example.com/path/to/show2/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/show2/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
</resources>
```

## Seasons feed
This XML lists all the seasons under some show

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
  <resource>
    <type>season</type>
    <attributes>
      <title>Season 1 title</title>
      <description>Description for this season</description>
      <external_id>season1</external_id>
      <enabled>true</enabled>
      <external_sync_url>http://exmaple.com/season1.xml</external_sync_url>
      <image_assets>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/season1/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/season1/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
  <resource>
    <type>season</type>
    <attributes>
      <title>Season 2 title</title>
      <description>Description for this season</description>
      <external_id>season2</external_id>
      <enabled>true</enabled>
      <external_sync_url>http://example.com/season2.xml</external_sync_url>
      <image_assets>
        <image_asset>
          <key>icon</key>
          <url>http://example.com/path/to/season2/icon.jpg</url>
        </image_asset>
        <image_asset>
          <key>large_thumbnail</key>
          <url>http://example.com/path/to/season2/large_thumbnail.jpg</url>
        </image_asset>
      </image_assets>
    </attributes>
  </resource>
</resources>
```


## Episodes feed
This XML contains 2 videos that will be encoded and served by Applicaster.

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
      <external_policy>
        <free>true</free>
        <product_identifiers></product_identifiers>
      </external_policy>
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
      <external_policy>
        <free>true</free>
        <product_identifiers>
          <id>1</id>
          <id>34</id>
        </product_identifiers>
      </external_policy>
    </attributes>
  </resource>
</resources>
```


## Without encoding
This XML contains 2 videos that will be delivered via the HLS link supplied in
`<alternative_streams>`

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
      <alternative_streams>
        <default>http://example.com/path/to/episode1.m3u8</default>
      </alternative_streams>
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
      <alternative_streams>
        <default>http://example.com/path/to/episode2.m3u8</default>
      </alternative_streams>
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
</resources>
```
