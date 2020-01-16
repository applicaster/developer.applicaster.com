# Configuration Fields

## Table of contents

- [Structure](#structure)
- [Available Sections](#available-sections)
- [Supported Field Types](#supported-field-types)
- [Special Field Types](#special-field-types)

## Structure

> All fields inside the [sections](#available-sections) adhere to the same structure:

```json
{
  ...
  general: {                        // Section key
    fields: [
      {
        "key": "my_field_key",      // Required: unique identifier
        "label": "My Field",        // Required user-facing label
        "type": "select",           // Required: any of the available field types
        "initial_value": "foobar",  // Recommended: Initial value
        "placeholder": "Enter URL", // Recommended: placeholder
        "label_tooltip": "...",     // Recommended: tooltip text
        ...                         // Additional required keys, depending on field type
      },
      {
        "key": "my_other_field_key",
        ...                         // etc. see above ^
      }
    ]
  }
```

## Available sections

> Each Plugin can have fields inside any of the following sections

- assets
- data
- general
- styles
- rules

## Supported field types

- TBD

## Special field types

- [Font Selectors](/plugins-manifest/fields/font-selectors.md)
