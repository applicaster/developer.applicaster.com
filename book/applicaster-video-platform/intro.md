# Applicaster Video Platform

The following documents contain information about integrating with the Applicaster Video Content Platform.

The [Applicaster Video Content Platform](https://admin.applicaster.com) is used to serve content in apps which use it as a content management system, and to enforce enforce Authorization providers.
Please note that the recommended way to deliver content in the app is currently using [Datasource providers](/Zapp-Pipes/Home.md) and content enforcement should use Login Plugins.

## Applicaster Content Ingestion
* [VOD Ingestion VIA XML](/applicaster-video-platform/content-ingestion/vod-ingestion-xml/vod_via_xml.md)
* [VOD Ingestion VIA RSS](/applicaster-video-platform/content-ingestion/vod-ingestion-rss/RSSVODIngestion.md)
* [Media Atom](/applicaster-video-platform/content-ingestion/media-atom/applicaster-media-atom-feed.md)
* [EPG Ingestion](/applicaster-video-platform/content-ingestion/epg-ingestion/index.md)
* [Collection Ingestion](/applicaster-video-platform/content-ingestion/collection-ingestion-xml/collection_via_xml.md)

## Authorization providers
Authorization providers can be configured in the Applicaster Video Platform CMS in order to enforce video playback through JWT tokens granting by a third party service.

For more info about Authorization providers, [Click Here](/applicaster-video-platform/authorization-provider/authorization_provider.md).

## JS2Native

JS2Native is a basic layer of communication all Applicaster Webviews and RN instances implement in order to bridge some basic functionality between web / RN and native.

For more info about JS2Native, [Click Here](/plugins/general-abilities/js2native/readme.md).