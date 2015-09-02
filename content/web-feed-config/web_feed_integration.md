# Web Feed Configuration
## Overview
This internal document explains what is the web feed and how to configure a link for it per customer.

## Description
Our FEED product is now also available on the web. Using our public API enables producing front-end development for any platform.  


The broadcaster is able to create text, image, video, link, trivia, poll, and prediction events in the CMS, and publish them either manually or automatically to the live web feed.  


It is possible to embed this feed to the broadcaster’s website on a specific show page, home page, or wherever is necessary.

## Link Configuration
The web feed URL will always **start** like this: 

	http://assets-production.applicaster.com/static/feed/1.2/index.html?  

This link has several parameters that need to be added:


**Account** – The specific Stars account. For example:  
	
	http://assets-production.applicaster.com/static/feed/1.2/index.html?account=54aa34dfa4f7c396da00001e
	
	
**Timeline** – Optional parameter, to select a specific account's timeline to display in the feed. The timeline must be an existing timeline of the account. If the timeline doesn't exist, or no value is passed to this parameter, the chosen timeline will be the first one of the account.


**Environment** – If the feed is on a test environment, the URL should have a parameter with the correct environment name – qa / server / test.


The final link may look like this:

	http://assets-production.applicaster.com/static/feed/1.2/index.html?account=54aa34dfa4f7c396da00001e&timeline=54b8297d121ce08974000002&environment=qa