# Configuration Fields

## Available sections

Each Plugin can have fields inside any of the following sections

- assets
- data
- general
- styles
- rules

## Structure: fields inside a section

```json
{
  ...
  general: {
    fields: [
      {
        "key": "my_field_key",      // REQUIRED: unique identifier
        "label": "My Field",        // REQUIRED user-facing label
        "type": "select",           // REQUIRED: any of the available field types
        "initial_value": "foobar",  // RECOMMENDED: Initial value
        "placeholder": "Enter URL", // RECOMMENDED: placeholder
        "label_tooltip": "..."      // RECOMMENDED: tooltip text
        ...                         // additional objects, REQUIRED or OPTIONAL, depending on field type
      },
      {
        "key": "my_other_field_key"
        ...                         // etc. see above ^
      }
    ]
  }
```

## Available field types

- TBD

## Reserved field types

- TBD
