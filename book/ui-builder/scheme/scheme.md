# Url Scheme - Ui Builder
---
* Open a specific `UI Builder` screen
    * ```<scheme-prefix>://present?screen_id=<screen_id>```
* open a specific `UI Builder` screen given a set of screens (the first valid one will be opened)
    * ```<scheme-prefix>://present?screen_id[0]=<screen_id_0>&screen_id[1]=<screen_id_1>&...&screen_id[n]=<screen_id_n>```
* Open a specific `UI Builder` screen, with an `Atom Feed` data source
    * ```<scheme-prefix>://present?screen_id=<screen_id>&data_source=<data_source>```
* Open a specific `UI Builder` screen, with an `Atom Entry` data source
    * ```<scheme-prefix>://present?screen_id=<screen_id>&data_source=<data_source>&entry_id=<entry_id>```
* Open a specific `UI Builder` screen, with other data source type
    * ```<scheme-prefix>://present?screen_id=<screen_id>&data_source=<data_source>&source_type=<source_type>```
* Open a `white label` screen, with `Atom Entry` data source:
    * ```<scheme-prefix>://present?&data_source=<data_source>&entry_id=<entry_id>```
        * The relevant screen will be opened, according to the `atom entry` type:
          * `article` will open the article screen
          * `imageGallery` will open the image gallery screen
          * `video` will open the player
          * `link` will open a web view
          * `audio` will open the audio player
---
## Place holders explanations:
- `<scheme-prefix>` - The scheme prefix as defined in Zapp
- `<screen_id>` - A Screen ID as defined in Zapp
- `<data_source>` - A base 64 encoded data source URL/ID
- `<source_type>` - A data source type - one of the following: `APPLICASTER_CATEGORY`, `APPLICASTER_COLLECTION`, `APPLICASTER_ATOM_FEED`
- `<entry_id>` - A base 64 encoded atom entry id
