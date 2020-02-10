# Configuration Fields

### Table of contents

- [General (Public) Field Types](#general-public-field-types)
- [Special Field Types](#special-field-types)
- [Available Sections](#available-sections)
- [Structure](#structure)

## General (Public) field types

- [Text Input](/plugins-manifest/fields/public/text-input.md)
- [Number Input](/plugins-manifest/fields/public/number-input.md)
- [Inline Input](/plugins-manifest/fields/public/inline-input.md)
- [Select](/plugins-manifest/fields/public/select.md)
- [Multi Select](/plugins-manifest/fields/public/multi-select.md)
- [Tag Select](/plugins-manifest/fields/public/tag-select.md)
- [Color Picker](/plugins-manifest/fields/public/color-picker.md)
- [Color Picker RGBA](/plugins-manifest/fields/public/color-picker-rgba.md)
- [Switch](/plugins-manifest/fields/public/switch.md)
- [Hidden](/plugins-manifest/fields/public/hidden.md)
- [File Uploader](/plugins-manifest/fields/public/uploader.md)

## Special field types

- [Font Selectors](/plugins-manifest/fields/special/font-selectors.md)
- [Nav Bar Selector](/plugins-manifest/fields/special/nav-bar-selector.md)
- [Preload Plugins Selector](/plugins-manifest/fields/special/preload-plugins-selector.md)
- [Fields for Internal User Only](/plugins-manifest/fields/special/fields-for-internal-use.md)
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
