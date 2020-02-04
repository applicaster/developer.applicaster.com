# Font selectors

| type                      | sections                             | value type | screenshot                                                  |
| ------------------------- | ------------------------------------ | ---------- | ----------------------------------------------------------- |
| **ios_font_selector**     | assets, data, general, styles, rules | `string`   | <img src="../assets/ios_font_selector.png" width=220 />     |
| **android_font_selector** | assets, data, general, styles, rules | `string`   | <img src="../assets/android_font_selector.png" width=220 /> |

### Description

Both field types create a `select` dropdown automatically populated with:

- System fonts (iOS or Android, accordingly)
- Custom fonts uploaded via the `Edit App > Upload fonts` section

### Example

```
"assets|data|general|styles|rules|": {
  "fields: [
    {
      "key": "my_field_key",                              // Required
      "type": "ios_font_selector|android_font_selector",  // Required
      "label": "My Field",                                // Recommended
      "placeholder": "select font"                        // Recommended
      "label_tooltip": "...",                             // Recommended
      ...

```

### Notes

- It is possible to provide an initial value (String)
- Do not provide any `"options"` object in the field's configuration
