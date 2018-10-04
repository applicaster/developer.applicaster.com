# @applicaster/zapplicaster-cli

![npm version](https://badge.fury.io/js/%40applicaster%2Fzapplicaster-cli.svg)

Command line tool to manage the development flow of QuickBrick.
When using this tool inside the Zapp-React-Native repo, run `yarn zapplicaster <command> [...options]`
When using this tool in another location, you can invoke it with npx `npx @applicaster/zapplicaster-cli <command> [...options]`

## Commands

### prepare

Prepares a QuickBrick workspace to work with a specific zapp app version's configuration

Available options:

- `-a | -app-version-id`: Zapp app version id to use to set up your workspace
- `-d | --destination-path`: (optional) path to output the generated project. If ommited, will create the workspace inside a `quick_brick` folder
- `-y | --yarn`: (optional) will use yarn instead of npm to install dependencies

Example:

`$ npx @applicaster/zapplicaster-cli prepare -a adf4b648-b55f-4464-8b26-dfcd04a40927 -d . --yarn`

will create a project in the current folder for app version `adf4b648-b55f-4464-8b26-dfcd04a40927`, and using yarn to install dependencies
