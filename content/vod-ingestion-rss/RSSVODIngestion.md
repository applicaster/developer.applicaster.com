# VOD Ingestion via RSS

###Overview


The VOD RSS ingestion process is meant to load video assets to Applicaster’s systems.  
This works by configuring a URL in Applicaster’s CMS that will be queried regularly.  
Each Category built on Applicaster's CMS (Show or Season nature), can be configured with   
it's own URL, defining her belonging VOD's.

You will need a place to host the RSS file, it needs to be available through HTTP(S).  
If your systems require IP access control please ask Applicaster’s representative for the   
IP of the ingesting servers.

If using Applicaster’s CDN and delivery services you will also need a video file   
(mp4, wmv, avi...) file accessible by HTTP(S) to be ingested to Applicaster’s system.  
This file should be of the highest quality possible, the system will transcode this file  
 to multiple bitrates and make sure it’s compatible to all devices required. 

##Example

#### Create the show category on Applicaster CMS
We'll present a scenario for a show name "Best Show" with 2 seasons.  

After creating the show's heirarchy on Applicaster CMS. It should look like this:
 


![Universal Feed](http://test3.applicaster.com.s3.amazonaws.com/rss_spec/VOD_show_season.png
)  
 
    
  

#### Configuring the show's External_sync_url in Applicaster’s CMS

Update season 1 External_sunc_url of 'Best Show' : 

![Universal Feed](http://test3.applicaster.com.s3.amazonaws.com/rss_spec/Show_external_sync_url.png
)  

 
#### "Best Show" - Sesaon-1  VODs rss feed example 
~~~~
<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
<channel>
	<title>Best Show - Season 1</title>
	<link>http://www.example.com/bestShow/Season1</link>
	<description>First season of Best Show</description>
	<item>
		<title>Best Show - Season 1 ,ep1</title>
		<link>http://www.example.com/bestShow/Season1/</link>
		<description>First Episode for BEST Show</description>
		<pubDate>Sat, 14 Feb 2015 20:31:30 CDT</pubDate>
		<media:content   
				url="http://www.example.com/bestShow/Season1/videos/ep1.m3u8" 
 				medium="video" 
 				duration="00:24:08"/>
		<media:group>
			<media:content   
				url="http://www.example.com/bestShow/Season1/images/ep1a.jpg"  
				medium="image"   
				height="360"  
				width="640"/>
			<media:content   
				url="http://www.example.com/bestShow/Season1/images/ep1b.jpg"  
				medium="image"   
				height="1280"   
				width="1280"/>
		</media:group>
	</item>
	<item>
		<title>Best Show - Season 1 ,ep2</title>
		<link>http://www.example.com/bestShow/Season2/</link>
		<description>Second Episode for BEST Show</description>
		<pubDate>Sun, 15 Feb 2015 20:31:30 CDT</pubDate>
		<media:content   
				url="http://www.example.com/bestShow/Season1/videos/ep2.m3u8"
		 		medium="video"   
				duration="00:24:08"/>
		<media:group>
			<media:content   
				url="http://www.example.com/bestShow/Season1/images/ep2a.jpg"  
				medium="image"   
				height="360"   
				width="640"/>
			<media:content   
				url="http://www.example.com/bestShow/Season1/images/ep2b.jpg"  
				medium="image"   
				height="1280"   
				width="1280"/>
		</media:group>
	</item>
	<item>
	....
	....
	.....
	</item>
</channel>
	
~~~~

Wait for the Ingestion process to finish... 


#### "Best Show" - Sesaon-1  VODs on Applicaster's CMS 


![Universal Feed](http://test3.applicaster.com.s3.amazonaws.com/rss_spec/season_with_vod.png
) 





### Elements and Attributes Description

#### Identifying the RSS document

The namespace for Media RSS is defined to be http://search.yahoo.com/mrss/


~~~~
<rss xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
~~~~

RSS is a dialect of XML. All RSS files must conform to the XML 1.0 [specification]  
(http://www.w3.org/TR/REC-xml/), as published on the World Wide Web Consortium (W3C)  
 website.

At the top level, a RSS document is a <rss> element, with a mandatory attribute called  
 version, that specifies the version of RSS that the document conforms to.  
The version attribute must be 2.0.

Media RSS is a new RSS module that supplements the `<enclosure>` capabilities of RSS 2.0.  
 RSS enclosures are already being used to syndicate audio files and images.   
Media RSS extends enclosures to handle other media types, such as short films or TV,   
as well as provide additional metadata with the media.   
Media RSS enables content publishers and bloggers to syndicate multimedia content   
such as TV and video clips, movies, images and audio.


### The `<channel>` element

This element is used to describe the RSS feed.

The `<channel>` element required child elements are:

* `<title>` - Defines the title of the channel 
* `<link>` - Defines the hyperlink to the channel 
* `<description>` - Describes the channel

 
 
Each `<channel>` element can have one or more `<item>` elements.

Each `<item>` element defines a VIDEO type feed in the RSS.

The `<item>` element required child elements are:

* `<title>` - Defines the title of the item (e.g title of the show episode)
* `<link>` - The Item's id in your system. **NOTE**: this must be unique across all items.  
The value can be any string with length up to 80 characters.
* `<description>` - Describes the item 
* `<pubDate>` - Defines the last-publication date for the item. 
* * Format: Day, DD MM YYYY HH:MM:SS ZZZ. See [RFC 822](http://www.faqs.org/rfcs/rfc822.html) for more information.   
VODs will be ordered accroding to this element on the CMS.
* `<media:group>` - The image asset definition
* `<media:content>` - is a sub-element of either `<media:group>` or `<item>`   
and is used to specify the enclosed media content.
 


###The `<media:content>` As `<item>`'s Sub-element 
Defines the item video attributes. The required attributes are:

* **medium** - The type of the media file is: image, audio, video, document.  
 This helps the reader application know exactly what to expect when used   
with the type attribute – For VOD purpose use : medium="video"
* **duration** - The number of seconds the media object plays.
* **url** - The location of the media itself ,streaming URLs for this item.  
 **Note:** make sure the provided URLs are HLS streams that comply to Apple’s AppStore  
 submission guidelines. using non compliant streams can result in the app being rejected  
 by Apple.


###The `<media:content>` As `<media:group>`'s Sub-element 

The `<media:content>` is a sub-element of `<item>` that lists images that the app can use  
 for the application’s UI.  

It contains a list of `<media:content>` elements, one for each available images. 

Every application needs a different set of images, please ask applicaster’s   
representative for the correct image names and sizes of the specific application.

The `<media:content>` as `<media:group>`'s sub-element,   
requires the following attributes:

* **medium** - medium="image"
* **width** & **height**
* **url** - A URL to fetch the image from.   
notice that this URL will not be accessed by devices,  
 it will be cached by assplicaster’s system and served through there to the apps.

The size of the image is ingested as follows:  

If we get “width="48" height="48" - we ingest an image tilted 48x48, only if the image  
 placement was created under broadcaster (so for example - if you are sending an image  
 size 140x100 and it’s in the image placements under broadcaster with this name then we  
 will ingest, otherwise it won’t upload images and an empty placeholder will appear).

`<media:group>` tag example for image sizes:  

319 x 319,  
140x100,  
48x48,  
1280x1280

~~~~
<media:group>
<media:content width="319" height="319" medium="image" url="____________________________________________________________"/>
<media:content width="140" height="100" medium="image" url="____________________________________________________________"/>
<media:content width="48" height="48" medium="image" url="____________________________________________________________"/>
<media:content width="1280" height="1280" medium="image" url="____________________________________________________________"/>

~~~~







