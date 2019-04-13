# Ads in datasources
Some of the Applicaster datasources provide some info about video ads display.
Optionally those can be handled at the video player level.
This document describes the structure expected for those video ads.

Currently the following types of ads can be provided and displayed from datasources:
* VAST
* VMAP

## VAST
In the case of VAST - multiple ads can be added in an array form in the datasource playable object.
The array will be returned on the `extensions` - `video_ads` properties of the datasource item.

The returned object would be an array containing Dictionary object with the following fields:
* `offset`
* `ad_url`

### offset
`offset` is returned in the form of string with one of the following values:
* `preroll`
* `postroll`
* Number representing the offset in seconds from the video start time

### ad_url
`ad_url` represents a string of the VAST configuration URL

## VMAP
In the case of VMAP - one VMAP configuration URL will be provided as a string under `extensions` - `video_ads`

Note: This means the player should verify the type of object (String or array) in order to set up either one or many VAST tags for single ads or a single VMAP configuration.