# Hidden Input

| type       | sections                                                          | value type | screenshot |
| ---------- | ----------------------------------------------------------------- | ---------- | ---------- |
| **hidden** | assets, data, general, styles, rules, custom_configuration_fields | `string`   | -          |

### Description

Hidden [Text Input](/plugins-manifest/fields/public/text-input.md). Value can never be changed by user. Initial value is an empty string: `""`

### Example

```
"assets|data|general|styles|rules|": {
  "fields: [
    {
      "key": "my_field_key",            // Required
      "type": "hidden",                 // Required
      "initial_value": "hidden value",  // Required
      ...

```

### Notes

- Used mostly for interal purposes.
- If one wishes to show a field that cannot be modified, it is recommended to add the `"disabled": true` property to any of the other field types.
