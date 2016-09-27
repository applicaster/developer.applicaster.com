

| Version | Description |
| - | - |
| 1.0.0 | First Release. |
| 1.1.0 | Support for image galleries. |
| 1.2.0 | Notations about "updated", "summery", "author name" and "alternate link" elements. |
| 1.2.1 | Support of inline images in article. |
| 1.3.0 | Support of video resource type. |
| 1.4.0 | Articles support audio mediaGroup. |
| 1.5.0 | ATOM with advertisement tags. |
| 1.6.0 | Support of YouTube video resource type. |



# Overview
Applicaster *Media Atom Feed* is a feature that
allows the broadcaster to integrate list

| Version | Description |
| - | - |
| 1.0.0 | First Release. |
| 1.1.0 | Support for image galleries. |
| 1.2.0 | Notations about "updated", "summery", "author name" and "alternate link" elements. |
| 1.2.1 | Support of inline images in article. |
| 1.3.0 | Support of video resource type. |
| 1.4.0 | Articles support audio mediaGroup. |
| 1.5.0 | ATOM with advertisement tags. |
| 1.6.0 | Support of YouTube video resource type. |


# Overview
Applicaster *Media Atom Feed* is a feature that
allows the broadcaster to integrate list of
External resources and present them in the app.
Currently Applicaster supports the following
resource types: **Article**, **Gallery**, **Video**
and **YouTube Video**. The broadcaster should host the
resources in its own servers and provide
Applicaster with the links to the Atom feeds
according to the specifications
below.

* Article - Upon tapping, the article will be presented in the following layout:
![image](./images/article_inline_images2.png)
* Gallery - Upon tapping, the gallery will be presented in the following layout:
![image](./images/photoGallery4.png)
* Video - HLS video content, upon tapping the content will be presented on a video player.
* YouTube Video - YouTube video content, upon tapping the content will be presented using a YouTube player.

### Setup

Each Atom Feed link will need to be added to
Applicater CMS into the appropriate Applicaster
Category link and declared as an "Applicaster Media Atom" link type.

>The app will maintain the same order and structure
as those in the provided Atom Feed.

![image](./images/atom-link-type.png)

# Media Atom Feed Specifications
The key words "MUST", "MUST NOT", "REQUIRED",
"SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT",
"RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in
[RFC 2119](http://tools.ietf.org/html/rfc2119).

The *Applicaster Media Atom Feed* format conforms with the Atom 1.0 Standard as described at [RFC 4287](http://tools.ietf.org/html/rfc4287) and MUST pass the [W3C Atom Validator](http://validator.w3.org/feed/).

Each Atom feed SHOULD hold multiple “atom:entry” nodes.
Any change done in an existing Atom Feed will be
available immediately on the client after app start up and without the need to change anything on the Applicaster CMS.


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

##### Feed Examples

* Feed that holds mix of video, audio and article entries.
[Link](https://github.com/applicaster/developer.applicaster.com/blob/developer2/content/media-atom/examples/article%2Bvideo%2Baudio.xml)
* Feed that holds image gallery entries.
[Link](https://github.com/applicaster/developer.applicaster.com/blob/developer2/content/media-atom/examples/galleries.xml)
* Feed that holds a YouTube video.
[Link](https://github.com/applicaster/developer.applicaster.com/blob/developer2/content/media-atom/examples/youtube.xml)

## Elements and Attributes Description
Described below are all the custom extensions
added to the Atom 1.0 Standard.

### feed
`<feed>` <span class="badge">XPath: /feed</span>

The `<feed>` element MUST contain the
`xmlns:applicaster="http://schemas.applicaster.com
/atom/1"` namespace.

***

### entry
`<entry>` <span class="badge">XPath:
/feed/entry</span>

The `<entry>` element block represents a single
item in the Feed list. There SHOULD NOT be more
than 30 entries on a single feed.


### applicaster type
`<applicaster:type>` <span
class="badge">XPath:
/feed/entry/applicaster:type</span>

The **entry** <applicaster:type> element
MUST be added and its `value` attribute MUST be set
to one of the following:
* For Article use: `<applicaster:type
value="article"/>`

* For Video (HLS or YouTube) use: `<applicaster:type
value="video"/>`

* For Image-Gallery: `<applicaster:type
value="imageGallery"/>`

* For Image use: `<applicaster:type
value="image"/>`

### updated
`<updated>` <span class="badge">XPath:
/feed/entry/updated</span>

If added the field will be visible for the end user.

### title
`<title>` <span class="badge">XPath:
/feed/entry/title</span>

The `<title>` element represents the
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


### link [rel="alternate", type="text/html"]
`<link>` <span class="badge">XPath:
/feed/entry/link</span>

If `<link>` element exists and its set rel attribute is "alternate"
and its set type attribute is "text/html". The
href value of the link will be used as the shared link URL of the entry.

### advertisement
`<advertisement>` <span class=“badge”> XPath:/feed/entry/advertisement</span>  
This tag may include two tags:  

* ### interstitial
`<interstitial ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where interstitial content comes from.  
When this tag is added it MUST includes properties any device types.
* ### banner
`<banner ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where banner content comes from.  
When this tag is added it MUST includes properties any device types.

All options are described here:  
`ios_iphone_adUnit`  - adUnit for iphones.  
`ios_ipad_adUnit`  - adUnit for ipads.  
`android_smartPhone_adUnit`  - adUnit for smartphones.  
`android_tablet_adUnit`  - adUnit for tablets.  

### content
`<content>` <span class="badge">XPath:
/feed/entry/content</span>

The `<content>` element `type` attribute
depends on the Entry type:
* For Article use <kbd>html</kbd>
* For Image use one of the following types:  
<kbd>image/png</kbd>, <kbd>image/gif</kbd>,
<kbd>image/jpg</kbd>, <kbd>image/jpeg</kbd>
* For Video use <kbd>video/hls</kbd>
* for YouTube Video use <kbd>youtube-id</kbd>
* For Image-gallery use
<kbd>application/atom+xml</kbd>

Article type MUST contain the escaped embedded HTML markup
within.
Any HTML tags that are not of the following `<p>`,
`<a>`, `<strong>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<img>`
Aren't recommended and can cause bad article formatting.

* Image type MUST have a `src` attribute with the
link to the full sized image. The maximum image
size SHOULD NOT be bigger than 1200x1200px.
The image is responsive to the device screen on Android only.
One Image is allowed per row.
Multiple inline images are possible per article.

* Image-gallery type MUST have a `src` attribute
with the link to an *Applicaster Atom Feed* that
holds image entries with an element set to
`<applicaster:type
value="image"/>`. Entries without
the `<applicaster:type
value="image"/>` element will be discarded.

* YouTube Video type MUST have a `src` attribute
with the YouTube video ID.

### applicaster media group
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
articles - holds the article's item image in full
view mode.
* <kbd>video</kbd>: Relevant only for
articles - holds the article's item video.
* <kbd>audio</kbd>: Relevant only for
articles - holds the article's item audio.  
>Please note:
* The play button image will present from the app and should not be include in the video image.
* In case the entry include "detailed-view" and "audio" types the app will ignore the "detailed-view" and will show only the "audio".
* In case the entry include "audio" and "video" types the app will ignore the "audio" and will show only the "video".


### applicaster media item
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


>  **Note:** In the case that the large
image isn't provided all devices will use the
provided small image. Only devices that
have a large screen will show large
images.

### advertisement
`<advertisement>` <span class=“badge”> XPath:/feed/entry/advertisement</span>  
This tag may include two tags:  

* ### interstitial
`<interstitial ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where interstitial content comes from.  
When this tag is added it MUST includes properties any device types.
* ### banner 
`<banner ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where banner content comes from.  
When this tag is added it MUST includes properties any device types.

All options are described here:  
`ios_iphone_adUnit`  - adUnit for iphones.  
`ios_ipad_adUnit`  - adUnit for ipads.  
`android_smartPhone_adUnit`  - adUnit for smartphones.  
`android_tablet_adUnit`  - adUnit for tablets.  

External resources and present them in the app.
Currently Applicaster supports the following
resource types: **Article**, **Gallery**, **Video**
and **YouTube Video**. The broadcaster should host the
resources in its own servers and provide
Applicaster with the links to the Atom feeds
according to the specifications
below.

* Article - Upon tapping, the article will be presented in the following layout:
![image](./images/article_inline_images2.png)
* Gallery - Upon tapping, the gallery will be presented in the following layout:
![image](./images/photoGallery4.png)
* Video - HLS video content, upon tapping the content will be presented on a video player.
* YouTube Video - YouTube video content, upon tapping the content will be presented using a YouTube player.

### Setup

Each Atom Feed link will need to be added to
Applicater CMS into the appropriate Applicaster
Category link and declared as an "Applicaster Media Atom" link type.

>The app will maintain the same order and structure
as those in the provided Atom Feed.

![image](./images/atom-link-type.png)

# Media Atom Feed Specifications
The key words "MUST", "MUST NOT", "REQUIRED",
"SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT",
"RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in
[RFC 2119](http://tools.ietf.org/html/rfc2119).

The *Applicaster Media Atom Feed* format conforms with the Atom 1.0 Standard as described at [RFC 4287](http://tools.ietf.org/html/rfc4287) and MUST pass the [W3C Atom Validator](http://validator.w3.org/feed/).

Each Atom feed SHOULD hold multiple “atom:entry” nodes.
Any change done in an existing Atom Feed will be
available immediately on the client after app start up and without the need to change anything on the Applicaster CMS.


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

##### Feed Examples

* Feed that holds mix of video, audio and article entries.
[Link](https://github.com/applicaster/developer.applicaster.com/blob/developer2/content/media-atom/examples/article%2Bvideo%2Baudio.xml)
* Feed that holds image gallery entries.
[Link](https://github.com/applicaster/developer.applicaster.com/blob/developer2/content/media-atom/examples/galleries.xml)
* Feed that holds a YouTube video.
[Link](https://github.com/applicaster/developer.applicaster.com/blob/developer2/content/media-atom/examples/youtube.xml)


## Elements and Attributes Description
Described below are all the custom extensions
added to the Atom 1.0 Standard.

### feed
`<feed>` <span class="badge">XPath: /feed</span>

The `<feed>` element MUST contain the
`xmlns:applicaster="http://schemas.applicaster.com
/atom/1"` namespace.

***

### entry
`<entry>` <span class="badge">XPath:
/feed/entry</span>

The `<entry>` element block represents a single
item in the Feed list. There SHOULD NOT be more
than 30 entries on a single feed.


### applicaster type
`<applicaster:type>` <span
class="badge">XPath:
/feed/entry/applicaster:type</span>

The **entry** <applicaster:type> element
MUST be added and its `value` attribute MUST be set
to one of the following:
* For Article use: `<applicaster:type
value="article"/>`

* For Video (HLS or YouTube) use: `<applicaster:type
value="video"/>`

* For Image-Gallery: `<applicaster:type
value="imageGallery"/>`

* For Image use: `<applicaster:type
value="image"/>`

### updated
`<updated>` <span class="badge">XPath:
/feed/entry/updated</span>

If added the field will be visible for the end user.

### title
`<title>` <span class="badge">XPath:
/feed/entry/title</span>

The `<title>` element represents the
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


### link [rel="alternate", type="text/html"]
`<link>` <span class="badge">XPath:
/feed/entry/link</span>

If `<link>` element exists and its set rel attribute is "alternate"
and its set type attribute is "text/html". The
href value of the link will be used as the shared link URL of the entry.

### advertisement
`<advertisement>` <span class=“badge”> XPath:/feed/entry/advertisement</span>  
This tag may include two tags:  

* ### interstitial
`<interstitial ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where interstitial content comes from.  
When this tag is added it MUST includes properties any device types.
* ### banner
`<banner ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where banner content comes from.  
When this tag is added it MUST includes properties any device types.

All options are described here:  
`ios_iphone_adUnit`  - adUnit for iphones.  
`ios_ipad_adUnit`  - adUnit for ipads.  
`android_smartPhone_adUnit`  - adUnit for smartphones.  
`android_tablet_adUnit`  - adUnit for tablets.  

### content
`<content>` <span class="badge">XPath:
/feed/entry/content</span>

The `<content>` element `type` attribute
depends on the Entry type:
* For Article use <kbd>html</kbd>
* For Image use one of the following types:  
<kbd>image/png</kbd>, <kbd>image/gif</kbd>,
<kbd>image/jpg</kbd>, <kbd>image/jpeg</kbd>
* For Video use <kbd>video/hls</kbd>
* for YouTube Video use <kbd>youtube-id</kbd>
* For Image-gallery use
<kbd>application/atom+xml</kbd>

Article type MUST contain the escaped embedded HTML markup
within.
Any HTML tags that are not of the following `<p>`,
`<a>`, `<strong>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<img>`
Aren't recommended and can cause bad article formatting.

* Image type MUST have a `src` attribute with the
link to the full sized image. The maximum image
size SHOULD NOT be bigger than 1200x1200px.
The image is responsive to the device screen on Android only.
One Image is allowed per row.
Multiple inline images are possible per article.

* Image-gallery type MUST have a `src` attribute
with the link to an *Applicaster Atom Feed* that
holds image entries with an element set to
`<applicaster:type
value="image"/>`. Entries without
the `<applicaster:type
value="image"/>` element will be discarded.

* YouTube Video type MUST have a `src` attribute
with the YouTube video ID.

### applicaster media group
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
articles - holds the article's item image in full
view mode.
* <kbd>video</kbd>: Relevant only for
articles - holds the article's item video.
* <kbd>audio</kbd>: Relevant only for
articles - holds the article's item audio.  
>Please note:
* The play button image will present from the app and should not be include in the video image.
* In case the entry include "detailed-view" and "audio" types the app will ignore the "detailed-view" and will show only the "audio".
* In case the entry include "audio" and "video" types the app will ignore the "audio" and will show only the "video".


### applicaster media item
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


>  **Note:** In the case that the large
image isn't provided all devices will use the
provided small image. Only devices that
have a large screen will show large
images.

### advertisement
`<advertisement>` <span class=“badge”> XPath:/feed/entry/advertisement</span>  
This tag may include two tags:  

* ### interstitial
`<interstitial ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where interstitial content comes from.  
When this tag is added it MUST includes properties any device types.
* ### banner
`<banner ios_iphone_adUnit = "" ios_ipad_adUnit = "" android_smartPhone_adUnit = "" android_tablet_adUnit = ""/>`  
This tag should represent where banner content comes from.  
When this tag is added it MUST includes properties any device types.

All options are described here:  
`ios_iphone_adUnit`  - adUnit for iphones.  
`ios_ipad_adUnit`  - adUnit for ipads.  
`android_smartPhone_adUnit`  - adUnit for smartphones.  
`android_tablet_adUnit`  - adUnit for tablets.  
