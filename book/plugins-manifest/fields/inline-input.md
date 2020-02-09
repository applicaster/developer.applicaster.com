# Inline Input

| type             | sections                                                          | value type | screenshot                         |
| ---------------- | ----------------------------------------------------------------- | ---------- | ---------------------------------- |
| **inline_input** | assets, data, general, styles, rules, custom_configuration_fields | `string`   | ![img](../assets/inline_input.png) |

### Description

Identical to [Text Input](/plugins-manifest/fields/text-input.md). The only difference is in the looks - the value appears without a surrounding box.

### Example

```
"assets|data|general|styles|rules|": {
  "fields: [
    {
      "key": "my_field_key",               // Required
      "type": "inline_input",              // Required
      "initial_value": "Inline text!",     // Optional
      "disabled": true|false               // Optional
      "label": "My Field",                 // Recommended
      "placeholder": "enter some string",  // Recommended
      "label_tooltip": "...",              // Recommended
      ...

```

### Notes

- Just an aesthetic variant of the text input.
- Usually coupled with the `"disabled": true` attribute to show some value that cannot be edited,
- It is generally recommened to use [Text Input](/plugins-manifest/fields/text-input.md) instead, especially if the value is meant to be edited.
