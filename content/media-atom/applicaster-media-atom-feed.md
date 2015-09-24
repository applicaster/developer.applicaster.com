

| Version | Description |
| - | - |
| 1.0.0 | First Release. |
| 1.1.0 | Support for image galleries. |
| 1.2.0 | Notations about "updated", "summery", "author name" and "alternate link" elements. |
| 1.2.1 | Support of inline images in article. |


# Overview
Applicaster *Media Atom Feed* is a feature that
allows the broadcaster to integrate list of
External resources and present them in the app.
Currently Applicaster supports three kinds of
resource types: **article**, **image** and
**imageGallery**. The broadcaster should host the
resources in its own servers and provide
Applicaster with the links to the Atom feeds
according to the specifications
below.

Each Atom Feed link will need to be added to
Applicater CMS into the appropriate Applicaster
Category link and declared as an "Applicaster Media Atom" link type.

The app will maintain the same order and structure
as those in the provided Atom Feed.

![image](./images/atom-link-type.png)

# Media Atom Feed Specifications
The key words "MUST", "MUST NOT", "REQUIRED",
"SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT",
"RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in
[RFC 2119](http://tools.ietf.org/html/rfc2119).

The *Applicaster Media Atom Feed* format conforms
with the Atom 1.0 Standard as described at [RFC
4287](http://tools.ietf.org/html/rfc4287) and MUST
pass the [W3C Atom
Validator](http://validator.w3.org/feed/).

Each Atom feed SHOULD hold multiple “atom:entry”
nodes.
Any change done in an existing Atom Feed will be
available immediately on the client after app
start up and without the need to change anything
on the Applicaster CMS.


> **Note:** Make sure your servers can hold the
amount of expected concurrent users. As a rule of
thumb the Atom Feed should be cached and served
from a CDN.


>  **Note:** Any caching mechanism set on the
broadcaster's servers will be reflected on the
client. HTTP\`s `Cache-Control` header with a
`max-age` directive. [Section 14.9 of RFC
2616](http://www.w3.org/Protocols/rfc2616/rfc2616-
  sec14.html#sec14.9)
  Conditional GET using `If-Modified-Since`,
  `If-None-Match` (sections 14.25 & 14.26)

  <div class="page-break"></div>

  ### Examples

  Example 1: Feed that holds mixed media entries
  (article, image, image-gallery).


  ```markup
  <?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom"
  xmlns:applicaster="http://schemas.applicaster.com/atom/1"
  xml:lang="en-us">
  <title>News Feed Title</title>
  <subtitle>News Feed Subtitle</subtitle>
  <link rel="self" type="application/atom+xml"
  href="http://www.example.com/news_feed.atom"/>
  <updated>2006-04-06T13:00:00-08:00</updated>
  <id>http://www.example.com/article_feed.atom</id>
  <author><name>Some Name</name></author>
  // An article with video example
  <entry>
  <applicaster:type value="article"/>
  <title>News Article title 1</title>
  <summary>Some Summery</summary>
  <id>http://www.example.com/article1</id>
  <published>2006-04-06T13:00:00-08:00</published>
  <updated>2006-04-06T20:25:05-08:00</updated>
  <author><name>Some Name</name></author>
  <link rel="alternate"
  type="text/html"
  href="http://www.example.com/article1.html">
  </link>
  <content type="html">
  Content in HTML , including images and everything
  </content>
  <applicaster:mediaGroup type="thumbnail">
  <applicaster:mediaItem src="http://example.org/thumbnail-image-large.png" scale="large"/>
  <applicaster:mediaItem src="http://example.org/thumbnail-image-small.png" scale="small"/>
  </applicaster:mediaGroup>
  <applicaster:mediaGroup type="video">
  <applicaster:mediaItem src="http://techslides.com/demos/sample-videos/video.mp4" type="video"/>
	<applicaster:mediaItem src="http://i.imgur.com/large.png" scale="large" type="image"/>
  <applicaster:mediaItem src="http://i.imgur.com/small.png" scale="small" type="image"/>      
  </applicaster:mediaGroup>
  </entry>
  // An article with image example
  <entry>
  <applicaster:type value="article"/>
  <title>News Article title 2</title>
  <summary>Some Summery</summary>
  <id>http://www.example.com/article1</id>
  <published>2006-04-06T13:00:00-08:00</published>
  <updated>2006-04-06T20:25:05-08:00</updated>
  <author><name>Some Name</name></author>
  <link rel="alternate"
  type="text/html"
  href="http://www.example.com/article1.html">
  </link>
  <content type="html">
  Content in HTML , including images and everything
  </content>
  <applicaster:mediaGroup type="thumbnail">
  <applicaster:mediaItem src="http://example.org/thumbnail-image-large.png" scale="large"/>
  <applicaster:mediaItem src="http://example.org/thumbnail-image-small.png" scale="small"/>
  </applicaster:mediaGroup>
  <applicaster:mediaGroup type="detailed-view">
  <applicaster:mediaItem src="http://example.org/image-large.png" scale="large"/>
  <applicaster:mediaItem src="http://example.org/image-small.png" scale="small"/>
  </applicaster:mediaGroup>
  </entry>
  // An Image example
  <entry>
  <applicaster:type value="image"/>
  <title>Example Image Title #1</title>
  <summary>Example Summery</summary>
  <id>http://media.example.org/example-image.png</id>
  <published>2005-04-06T13:00:00-08:00</published>
  <updated>2005-04-06T20:25:05-08:00</updated>
  <content type="image/png"
  src="http://media.example.org/example-image.png"/>
  <applicaster:mediaGroup type="thumbnail">
  <applicaster:mediaItem src="http://example.org/image-large.png" scale="large"/>
  <applicaster:mediaItem src="http://example.org/image-small.png" scale="small"/>
  </applicaster:mediaGroup>
  </entry>
  // An image gallery example
  <entry>
  <applicaster:type value="imageGallery"/>
  <title>Example Image Gallery Title #1</title>
  <summary>Example Summery</summary>
  <id>http://media.example.org/example-image-gallery.xml</id>
  <published>2005-04-06T13:00:00-08:00</published>
  <updated>2005-04-06T20:25:05-08:00</updated>
  <content type="application/atom+xml"
  src="http://media.example.org/example-image-gallery.xml"/>
  <applicaster:mediaGroup type="thumbnail">
  <applicaster:mediaItem src="http://example.org/image-large.png" scale="large"/>
  <applicaster:mediaItem src="http://example.org/image-small.png" scale="small"/>
  </applicaster:mediaGroup>
  </entry>
  </feed>
  ```

## Elements and Attributes Description
Described below are all the custom extensions
added to the Atom 1.0 Standard.

### Feed
`<feed>` <span class="badge">XPath: /feed</span>

The `<feed>` element MUST contain the
`xmlns:applicaster="http://schemas.applicaster.com
/atom/1"` namespace.

***

### Entry
`<entry>` <span class="badge">XPath:
/feed/entry</span>

The `<entry>` element block represents a single
item in the Feed list. There SHOULD NOT be more
than 30 entries on a single feed.




### Applicaster Type
`<applicaster:type>` <span
class="badge">XPath:
/feed/entry/applicaster:type</span>

The **Entry** <applicaster:type> element
MUST be added and its `value` attribute MUST be set
to one of the following:
* For Article use: `<applicaster:type
value="article"/>`
* For Image use: `<applicaster:type
value="image"/>`
* For Image-gallery: `<applicaster:type
value="imageGallery"/>`

### Updated
`<updated>` <span class="badge">XPath:
/feed/entry/updated</span>

If added the field will be visible for the end user.

### Title
`<title>` <span class="badge">XPath:
/feed/entry/title</span>

The **Enrty** `<title>` element represents the
title of the entry. The title element SHOULD NOT
exceed the total of 33 characters. Titles that
have more than 33 characters will get truncated on
the item teaser.

### summary
`<summary>` <span class="badge">XPath:
/feed/entry/summary</span>

If added the field will be visible for the end user.

### name
`<name>` <span class="badge">XPath:
/feed/entry/author/name</span>

If added the field will be visible for the end user.


### link[rel="alternate", type="text/html"]
`<link>` <span class="badge">XPath:
/feed/entry/link</span>

If an **Entry** `<link>` element exists and its set rel attribute is "alternate"
and its set type attribute is "text/html". The
href value of the link will be used as the shared link URL of the article.

### Content
`<content>` <span class="badge">XPath:
/feed/entry/content</span>

The **Entry** `<content>` element `type` attribute
depends on the Entry type:
* For Article use <kbd>html</kbd>
* For Image use one of the following types:  
<kbd>image/png</kbd>, <kbd>image/gif</kbd>,
<kbd>image/jpg</kbd>, <kbd>image/jpeg</kbd>
* For Image-gallery use
<kbd>application/atom+xml</kbd>

Article type MUST contain the escaped embedded HTML markup
within.
Any HTML tags that are not of the following `<p>`,
`<a>`, `<strong>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<img>`
Aren't recommended and can cause bad article formatting.

Image type MUST have a `src` attribute with the
link to the full sized image. The maximum image
size SHOULD NOT be bigger than 1200x1200px.
The image is responsive to the device screen on Android only.
One Image is allowed per row.
Multiple inline images are possible per article.

Image-gallery type MUST have a `src` attribute
with the link to an *Applicaster Atom Feed* that
holds image entries with an element set to
`<applicaster:type
value="image"/>`. Entries without
the `<applicaster:type
value="image"/>` element will be discarded.


### Applicaster Media Group
`<applicaster:mediaGroup>` <span
class="badge">XPath:
/feed/entry/applicaster:mediaGroup</span>

The `<applicaster:mediaGroup>` element groups
media assets from the same type. Following are the
supported group types:
* <kbd>thumbnail</kbd>: Is an image that will be
used to show the item in a collection view. It
will normally be relatively small in size. It
SHOULD have 16:9 aspect ratio.
* <kbd>detailed-view</kbd>: Relevant only for
articles - hold the articles item image in full
view mode.
* <kbd>video</kbd>: Relevant only for
articles - hold the articles item video. Please note: 
	* The play button will present from the app and should not be include in the video image. 
	* In case the entry include "detailed-view" and "video" types the app will ignore the "detailed-view" and will show only the "video". 


### Applicaster Media Item
`<applicaster:mediaItem>` <span
class="badge">XPath:
/feed/entry/applicaster:mediaItem</span>

The `<applicaster:mediaItem>` element MUST be
contained inside a `<applicaster:mediaGroup>`
element.

The `scale` attribute MUST be set to
<kbd>small</kbd> or <kbd>large</kbd>. Large device
screens will use the image with the
<kbd>large</kbd> attribute, while devices with
small screens will use the image with the
<kbd>small</kbd> attribute.
* When set to <kbd>large</kbd> scale - maximum
image size SHOULD NOT be bigger than 800x800px.
* When set to <kbd>small</kbd> scale - maximum
image size SHOULD NOT be bigger than 400x400px.


>  **Note:** In the case that the <kbd>large</kbd>
image isn't provided all devices will use the
provided <kbd>small</kbd> image. Only devices that
have a large screen will show <kbd>large</kbd>
images.
