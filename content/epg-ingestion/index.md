# EPG Ingestion

| Version | Description |
| -- | -- |
| 1.0.0   | First Release. |
| 1.0.1   | Add specific examples for Modular apps and legacy apps. |

# Overview

Applicaster provides an ingestion mechanism for importing a channel's EPG.
You can set for each channel in the app its own ingestion URL. This URL should
hold a JSON file that contains a list of programs to add/update to the EPG.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in RFC 2119.

# Terminology

## EPG (Electronic Program Guide)

A list of set scheduled programs that describe the upcoming programs on a
channel. Using the EPG the end end user can get a metadata on the program he is
currently watching and has the option to see what programs are scheduled next.

## Program

A program is a single item on the EPG. Each program should have at least the
following fields: `name`, `start_time` and `end_time` and can have a list of added
 attributes as described below (see Ingestion JSON structure).

## Programs ingestion URL

A publicly accessible URL hosted on the web that holds the channel's ingestion
JSON. The URL will be queried every 5 minutes. On each ingestion cycle the JSON
file will be parsed and update the app EPG if it finds new or changed items.

You will need a place to host this JSON on your servers.
It needs to be available through HTTP(S). If your systems require IP access
control please ask Applicaster’s representative for the IP of the ingesting
servers. If the mobile application has more than one channel, each supported
channel should have it’s own separate JSON file.

## Overlapping program
An overlapping program is a program that its `stat_time` to `end_time` range
overlaps an already existing program on the same EPG. Any found overlapping
programs will be overriden on the ingestion cycle.

# General notes

# Ingestion JSON structure

## Examples

### Example 1 - EPG ingestion for Modular App (v2.1 and up)

```javascript
{
	programs: [
		{
			"name": "Example program name",
			"description": "Example program description",
			"start_time": "1419976800000",
			"end_time": "1419987600000",
			"is_live": true,
			"image_assets": {
				"image_base": "http://example.com/program-example-image.jpg"
			},
			"show_category_external_id" : "showExampleUniqueID"
		},
		{...},
		{...},
		...
	]
}
```
### Example 2 - EPG ingestion for legacy apps
Depending on the specific app, some of the fields are in use and some not.
If you have a legacy app, please consult your Applicatser representative for the
specific implementation.


```javascript
{
  programs: [
{
  "name": "Example program name",
  "description": "Example program description",
  "start_time": "1419976800000",
  "end_time": "1419987600000",
  "is_live": true,
  "tag": "example-tag",
  "show_category_external_id" : "showExampleUniqueID",
  "thumbnail": "http://example.com/program-example-image.jpg",
  "vod_item_external_id" : "vodwUniqueID",
},
{...},
{...},
...
]
}
```

# Field descriptions

The JSON body contains only one field - “programs”. "programs" is an array of
all the EPG programs in the time span represented by this JSON.
Notice that this can changed on every request to the JSON, so for example you
can decide to only expose the EPG from a day before the request was made to a
week after the request was made, this allows to limit the size of this JSON.

Every program SHOULD have the following fields:

## name
The name of the show.

## description (optional)

A short description of the show. Text length depends on the specific app layout
implementation.

## start_time

The start time of the program in timestamp format.
**NOTE: this is in milliseconds.**

## end_time

The end time of the program in timestamp format.
**NOTE: this is in milliseconds.**

## is_live (optional)

Boolean that represents if the program is live for viewing on the app.
defaults to false.

## image_assets (optional)

Currently only implemented on the modular app (v2.1).
A JSON object that represents the image thumbnails of the show. The keys of the
JSON depends on the specific app implementation. for modular apps there should
be a single key called `image_base` with a value of an absolute URL
referencing to a `jpg` or `png` image (540px width 312px height).

> Note: if your app has a custom EPG implementation, please consult your
Applicaster representative.  

## tag (not in use)

not in use.

## show_category_external_id (optional)

Used to connect a program to a VOD ingested show.
To connect a program to a show use the same external_id you put in the show VOD
ingestion process. If a program is connected to a show and it doesn't have an
image of its own, the image thumbnail of the show will be used as the default
image of the program.


## thumbnail (deprecated)

Deprecated from version 2.1 of the modular app.

## vod_item_external_id (not in use)

Not in use

# Implementation Notes

> Note: Currently there isn't any available way to delete an already existing
items in the EPG. If an already ingested program needs to be deleted there are
two options: by deleting the program manually on the CMS or by overlapping it
in the JSON with a new program.
