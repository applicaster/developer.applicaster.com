# Zapp Tech Book

## About
The Zapp Tech Book goal is to be the home for all the Zapp Plugins technical documentation and guides.
The main sections in the book are Zapp-pipes, Zapp React Native Plugins, Zapp-iOS & Zapp-Android.

Any change or adding new doc is done by creating a [Pull Request](https://help.github.com/articles/about-pull-requests/) and having it [reviewed by GitHub "review" process](https://help.github.com/articles/about-pull-request-reviews/). 

## The book structure 
The book content is located at the `book` folder. The main file that defines the book structure is `/book/SUMMARY.md`.
To find out more on how to arrange the content read the following:

* [Directory Structure](https://toolchain.gitbook.com/structure.html)
* [Pages and Summary](https://toolchain.gitbook.com/pages.html) 

## How to update existing document 
Updating existing document is a very easy task, just clone the repo, create a new branch, change the doc, push it and create a new Pull Request (don't forget to assign it to review).

## How to add a new document
Adding a new document can be easily done by the following steps:

1. Clone the repo.
2. Run `$ npm install`.
3. Create a new branch.
4. Add the new `.md` file under the relevant folder.
5. Add the file to the right place in the `/book/SUMMARY.md` according to the [Pages and Summary](https://toolchain.gitbook.com/pages.html) guide.
6. Test your code locally by running the gitbook with `$ npm start` and checking the result in `http://localhost:4000/`.
7. Push the code.
8. Create the pull request.
