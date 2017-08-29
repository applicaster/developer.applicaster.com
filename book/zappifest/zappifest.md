[Zappifest Tool](https://github.com/applicaster/zappifest) is a CLI app that will help you to generate and publish Zapp plugin manifest.

#### Installation

Install via Homebrew
```bash
brew tap applicaster/tap
brew install zappifest
```

#### Upgrade
```bash
brew upgrade zappifest
```

## Usage
### Init
Zappifest allows fast configuration for Zapp plugin-manifest.json file.
Just run `zappifest init` and follow the instructions.

### Publish

#### Prerequisites
Reach Applicaster support team to generate User access-token.

The tool allow you to publish the plugin to Zapp.

Run `zappifest publish --manifest <path-to-manifest-json-file> --access-token <zapp-access-token>`

#### Updating existing plugin
Check the plugin id on [Zapp](https://zapp.applicaster.com/admin/plugins) (under the relevant plugin versions).

Run `zappifest publish --plugin-id <plugin-id> --manifest <path-to-manifest-json-file> --access-token <zapp-access-token>`

#### Custom Field Tool Tips

When you are creating a custom field via the 'zappifest init' instructions, you will be required to create a tool tip describing the custom field so that Zapp users can understand the purpose of the field and how they should handle it.

There are three types of tool tips.

1. Plain Text
    * This will appear like the example below:
        * ![plain_text_example](./plain_text.png)  
2. Link to an external resource
    * This will appear like the example below:
        * ![link_example](./link.png)  
3. Text with link to an external resource
    * This will appear like the example below:
        * ![text_with_link_example](./text_with_link.png)  
