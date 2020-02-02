## Text Tracks from a DSP

This document outlines the requirements for mapping Text Tracks (captions/subtitles) on a DSP, that can later be used by a Player Plugin. The purpose is to create a standard for sending Text Tracks information from any DSP,  and for Player Plugins to adopt this protocol and use it to display Text Tracks.
 

### DSP Mapping

Text Tracks should be mapped to the extensions section of a Video Item as an object labeled “text_tracks”, like the following example:
```json
{
  "extensions": {
    "text_tracks": {
      "version": "1.0",
      "tracks": [
        {
          "label": <Label Text>,
          "kind": <captions / subtitles>,
          "type": <mime-type, e.g: ‘text/vtt’>,
          "language": <language code, e.g: 'en'>,
          "source": <text track url>
        }
      ]
    }
  }
}
```

**Version**: the API version that is being used in the DSP. This will be used for future updates of the API, to maintain backwards compatibility.

**Tracks**: An array of objects. Each object is a single Text Track with the following fields:

- *Label*: the text that is displayed to the user to choose what text track they want to use. For example: the label "English" can be used for English captions.

- *Kind*: the kind of text track - can be either Captions or Subtitles.

- *Type*: The mime-type of the text track. For example, for WebVTT the mime-type would typically be ‘text/vtt’

- *Language*: the language code of the text track. This should be a ISO 639-1 standard language code (for reference - see here: [https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes))

- *Source*: web url for the file of the Text Track. This will typically be a webvtt file. More about the webvtt type can be found here: [https://www.w3.org/TR/webvtt1](https://www.w3.org/TR/webvtt1)