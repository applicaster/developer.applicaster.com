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

The following plugins must be added prior to compilation to be included in a version:

* Flurry
* comScore DAX
* Net Metrix
* CoolaData
* Liftoff
* AGOF
* OWA

Most plugins require configuration fields (i.e. API Key) to be populated in order to send data. However, as long as the plugin is created prior to compilation, the configuration fields can still be set up after build and even after store submission. They can also be changed dynamically if you need to change project IDs or any other configuration settings.

Lastly, Applicaster also supports the following video analytics providers:

* comScore Stream Sense
* Akamai Media Analytics

All analytic providers can be set up as plugins on versions 4.5.4 (Android) and 4.2.7 (iOS) and up. In order to set up a plugin, reference the documentation [here](https://docs.google.com/a/applicaster.com/document/d/1md3Hmc-gg9NuEyIpQ43iDky_THc_5upcRMq8-QvkXHY/edit?usp=sharing).

For older versions of your app, please follow the directions outlined [here](https://applicaster.zendesk.com/hc/en-us/articles/206419186-Configuring-Analytics-at-Applicaster).