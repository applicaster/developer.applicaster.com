# Morpheus

### Overview

Other developer documentation refers to an Applicaster product called "Morpheus". This document outlines what Morpheus is.

### Product Description
 
Morpheus enables Applicaster to remotely configure which analytics providers to send data to. Users can configure the analytics providers in Zapp. 

The aim of Morpheus is to provide greater flexibility and scalability around analytics as opposed to a traditional approach of hardcoded direct integrations.

The infrastructure works as illustrated in the diagram below:

![morpheus_diagram](./morpheus_diagram.png)

Morpheus supports a "Plugin" system, where third party analytics providers can be "plugged in" to the system and automatically start receiving all of the events referenced above. Every analytics provider has their own set of "out-of-the-box" functionality and events (i.e. retention reporting, session tracking) as part of their SDK, which Applicaster also supports. 

Applicaster currently supports the following behavioral analytics providers by default:

* Google Analytics
* Mixpanel
* comScore DAX
* Flurry

Applicaster also supports the following video analytics providers:

* comScore Stream Sense
* Akamai Media Analytics

For default analytics providers (those automatically included) and plugins included prior to compiling the version build, the configuration fields can be changed remotely in production without requiring a new release on iOS. On Android, this can only be done for Google Analytics and Mixpanel, though we aim to change the general plugin architecture to recognize post-build changes to configuration settings.

The ability to build an analytics plugin is complete, but the transition of providers to plugins is still under development. This means that while all of these providers can be supported currently, whether or not they are configured via the analytics screen in Zapp as outlined [here](https://applicaster.zendesk.com/hc/en-us/articles/206419186-Configuring-Analytics-at-Applicaster) or as a plugin as outlined [here](https://docs.google.com/a/applicaster.com/document/d/1md3Hmc-gg9NuEyIpQ43iDky_THc_5upcRMq8-QvkXHY/edit?usp=sharing) is subject to change. 

As providers are transitioned to plugins, the status will be updated here:

* Flurry
	* Moved to a Plugin on Android for version 2.7.10 and up