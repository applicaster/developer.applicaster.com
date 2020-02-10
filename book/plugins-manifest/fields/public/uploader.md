# File Uploader

| type         | sections                                                          | value type | screenshot                        |
| ------------ | ----------------------------------------------------------------- | ---------- | --------------------------------- |
| **uploader** | assets, data, general, styles, rules, custom_configuration_fields | `file`     | ![img](../../assets/uploader.png) |

### Description

Creates an `input` of type `file` which allows uploading file(s) to Applicaster's CDN, under the matching app family. Initial value is `undefined`.

### Example

```
"assets|data|general|styles|rules|": {
  "fields: [
    {
      "key": "my_field_key",                                      // Required
      "type": "uploader",                                         // Required
      "initial_value": "https://example.com/asset/my_asset.png",  // Optional
      "label": "My Field",                                        // Recommended
      "placeholder": "upload a file",                             // Recommended
      "label_tooltip": "...",                                     // Recommended
      ...

```

### Notes

- Clicking on the uploaded file name will open the file in another browser tab.
- When clicking on the remove (&times;) button, the value of the field will be an empty string `""`.
- When providing an initial value, it has to be a valid, full web URL.
- This input has only limited checks and validations, please take care to upload the correct files / file formats.
- Care should be taken in the client side to provide protection / fallback for:
  - A missing value - `undefined`.
  - An empty string (uploaded file that was removed).
  - Malformed initial URL.
