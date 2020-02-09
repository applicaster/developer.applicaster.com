# Tag Select

| type             | sections                                                          | value type | screenshot                                       |
| ---------------- | ----------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| **multi_select** | assets, data, general, styles, rules, custom_configuration_fields | `string`   | <img src="../assets/tag_select.png" width=220 /> |

### Description

Creates an input that allows selection of a single values from given tags. Selected value is shown as a green box. Initial value is an empty string: `""`

Basically identical to [Tag Select](/plugins-manifest/fields/tag-select.md), the only difference is that only a single value can be selected.

### Example

```
"assets|data|general|styles|rules|": {
  "fields: [
    {
      "key": "my_field_key",        // Required
      "type": "tag_select"          // Required
      "options": [                  // Required
        { "text": "Option One", "value": "option_1" },
        { "text": "Option Two", "value": "option_2" }
        ...
      ]
      "initial_value": "option_1",  // Optional
      "label": "My Field",          // Recommended
      "label_tooltip": "...",       // Recommended
      ...

```

### Notes

- `options` object is mandatory.
- `options` _must_ have at least one value.
- The options inside `options` _must_ have two properties, `text` and `value`, of type `string`.
- When using `initial_value`, it has to match one of the values presented in the `options` object.

#### User stories

> Given the field configuration of the example above

- When no value is selected

  - Input appears with two boxes
  - All boxes are black
  - Plugin configuration value is an empty string: `""`

- When the second option is selected

  - Input appears with two boxes
  - Box labeled "Option Two" has a green color
  - Plugin configuration value is: `"option_2"`

- When the second option selected and the user removes it
  - Input appears with two boxes
  - All boxes are black
  - ⚠️ Plugin configuration value is: `null` ⚠️
