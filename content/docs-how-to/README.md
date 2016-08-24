# How To Write And Publish Docs

## Overview

Applicaster Developer Documentation is a tool that holds all the relevant
technical and development documentation in a single place.

## Accessing the documentation
Because Applicaster documentation holds propriety & technical information, Only
logged in users with a valid Applicaster single sign on
[account](https://accounts.applicaster.com) can access the documentation.
Each doc can be set as an Internal doc. Internal documents are documents that we
want to restrict from a general Applicaster Accounts user.
This is good for draft documents, internal APIs and documents that our customers
don't have value in accessing them.


## Setting up your local environment

### Clone developer.applicaster.com github

In case you don't have the developer.applicaster.com on your local computer
Clone [developer.applicaster.com](https://github.com/applicaster/developer.applicaster.com)

### Checkout the `developer2` branch

Run `git checkout developer2` from your terminal.
Because the project also serves the current documentation project, currently all
development is done from the `developer2` branch.
Make sure your code is up to date by - run `git pull`

### Create a new branch form `developer2`

Run `git checkout -b YOUR_BRANCH_NAME`

### Run the developer's documentation app locally
Once the repo is cloned and your branch is created, run the following to install dependencies, and run the app locally. Node.js v4+ is required
```bash
$ npm install && PORT=4001 npm start
```
You can then access the developer's documentation by opening http://localhost:4001 in a browser.

## How to create a new document

For creating/editing a document you should open the `content` folder located in
the root of the project. All other folders and files in the project shouldn't
be changed when editing a document.

### Adding a document to `content/toc.yml`

For a document to show on the developer site you need to explicitly declare it in
the `toc.yml` file. all documents in the file are located under a specific
product label. Make sure you add the document to the right product. If no
product label fits your document content create a new label.

following is an example of a documentation declaration on the `toc.yml`

```yml
"Developer Documentation":
  - folder: docs-how-to
    internal: true
    title: How To Write and publish Docs
    description: >
      This doc describes how to write and publish new and existing documents.
  type: Technical
  owner: gavri
```

"Developer Documentation" is the label of the product. **You shouldn't add the
product label if it is already existing in the yml file**. All other keys should
be indented to the right (just stay consistent with the structure of the other
documents)

#### Document properties

| Name | Description | Default Value | Mandatory
| -- |-- | -- | -- |
| `folder` | The name of the folder your document is located at | - | Yes
| `internal` | Set to true if you want the document to be available for users with the `internal` permission (as set on accounts)| - | Yes
| `title` | The title of the document | - | Yes
| `description` | The description of the document - use the `>` character to create a multiline text. | - | Yes
| `type` | The type of the document. can be "Technical" or "Release Notes" for now | - | Yes
| `owner` | The owner of the document - the goto person when someone have questions or comments about the code | - | Yes


For verfiy your changes on **toc.yml** [please visit yamllint](http://www.yamllint.com).

### Adding the documentation Markdown file

Create a folder inside the `content` folder named with the same name that was
given in the `toc.yml` file. The file should be written in Markdown. The file
name can be anything you need but its file extension should be `.md`.

You can add assets like images inside the folder you created and link to them
relatively form your Markdown File.

### preview the documentation locally
To preview the documentation page you created, you need to run the following command in the terminal :
```bash
$ gulp
```
Then refresh the page at http://localhost:4001 and you will see the content you created.

### submit your content
Before doing this, make sure you are on the git branch you created earlier and not on the developer2 branch.
Once you're satisfied with the documentation you've created, run the following command :

```bash
$ git add --all
$ git commit -m 'my awesome documentation' // type any commit message you want here
$ git push origin YOUR_BRANCH_NAME
```

Then [go to the github page here](https://github.com/applicaster/developer.applicaster.com), and submit a new pull request with YOUR_BRANCH_NAME.
