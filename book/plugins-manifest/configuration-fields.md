# Configuration Fields

### Table of contents

- [Supported Field Types](#supported-field-types)
- [Special Field Types](#special-field-types)
- [Available Sections](#available-sections)
- [Structure](#structure)

## Supported field types

- [Text Input](/plugins-manifest/fields/text-input.md)
- [Number Input](/plugins-manifest/fields/number-input.md)
- [Inline Input](/plugins-manifest/fields/inline-input.md)
- [Multi Select](/plugins-manifest/fields/multi-select.md)
- [Tag Select](/plugins-manifest/fields/tag-select.md)
- ...

## Special field types

- [Font Selectors](/plugins-manifest/fields/font-selectors.md)
- ...

## Available sections

Each Plugin can have fields inside any of the following sections:

- assets
- data
- general
- styles
- rules

## Structure

All fields inside the [sections](#available-sections) adhere to the same structure:

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
