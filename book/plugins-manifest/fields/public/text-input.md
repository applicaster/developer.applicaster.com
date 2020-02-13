# Text Input

| type           | sections                                                          | value type | screenshot                          |
| -------------- | ----------------------------------------------------------------- | ---------- | ----------------------------------- |
| **text_input** | assets, data, general, styles, rules, custom_configuration_fields | `string`   | ![img](../../assets/text_input.png) |

### Description

Creates a text `input`. Initial value is an empty string: `""`

### Example

```
"assets|data|general|styles|rules|": {
  "fields: [
    {
      "key": "my_field_key",               // Required
      "type": "text_input",                // Required
      "initial_value": "foo bar baz",      // Optional
      "label": "My Field",                 // Recommended
      "placeholder": "enter some string",  // Recommended
      "label_tooltip": "...",              // Recommended
      "multiline": false,                  // Optional
      ...

```

### Notes

- It is possible to set `null` as an initial value
- When setting the `"multiline": true"` attribute, we get an input identical to [Text Area](/plugins-manifest/fields/public/text-area.md)
  . Value type remains the same - `string`.
