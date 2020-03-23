# UI Component Characteristics

### Description

A property in the manifest that controls the _behavior_ of the ui component in the UI Builder. Goal: set which components can act as a group, and which components can be added to groups or screens.

### Manifest

```
...
"characteristics: {
  "group": true|false,
  "appearance": ["group", "screen"]
  ...
}
```

### Notes

- Optional propery.
- This property is affecting only plugins of category `ui_component`
- If property does not exist, the UI Component's default settings are:
  - `"group": false` - does not behave like a group
  - `"appearance": ["group", "screen"]` - can be added anywhere, to both screens and groups

### Examples

#### Group component

```
  "name": "My Group",
  "type": "ui_component",
  "characteristics: {
    "group": true,
    "appearance": ["screen"]
  }
  ...
}
```

- This component will behave exactly like a group
- It can be added to a screen only
- Other UI Components can be added inside the group

#### General UI Component

```
  "name": "My UI Component",
  "type": "ui_component",
  "characteristics: {
    "group": false,
    "appearance": ["group", "screen"]
  }
  ...
}
```

- This UI Component can be added anywhere - both inside a screen and inside a group

#### UI Component inside group only

```
  "name": "Group Separator",
  "type": "ui_component",
  "characteristics: {
    "group": false,
    "appearance": ["group"]
  }
  ...
}
```

- This UI Component can be put only inside a group

#### UI Component for screens only

```
  "name": "My UI Component",
  "type": "ui_component",
  "characteristics: {
    "group": false,
    "appearance": ["screen"]
  }
  ...
}
```

- This UI Component can be added only to a screen
- It cannot be put inside a group
