# Text Input

| type           | sections                             | value type | screenshot                                       |
| -------------- | ------------------------------------ | ---------- | ------------------------------------------------ |
| **text_input** | assets, data, general, styles, rules | `string`   | <img src="../assets/text_input.png" width=220 /> |

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
      "placeholder": "enter some string",  // Recommended
      "label_tooltip": "...",              // Recommended
      ...

```

### Notes

- It is possible to set `null` as an initial value
