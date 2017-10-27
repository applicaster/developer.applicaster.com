# Tutorial: Creating a Wordpress Data-Source Provider For Zapp

We are going to create a Wordpress data source plugin that will enable our Zapp app to show the content of a Wordpress website.

In this tutorial, we will create a data-source provider that uses the Wordpress API demo website at https://demo.wp-api.org. We would like to have the data presented in a simple app, it will show all the website's categories, once the user taps on a category he will get a list of all its related posts. Tapping on a post will open it.

Our data-source will use the following Wordpress APIs:

* Get categories:
http://demo.wp-api.org/wp-json/wp/v2/categories returns a JSON with an array of categories and their metadata.

* Get category:
http://demo.wp-api.org/wp-json/wp/v2/categories?slug=[category_slug] returns a JSON with a category that matches the input slug. We need this endpoint to retreieve a category id from a category slug (which is how a category is represented in a wordpress website url)

* Get posts:
http://demo.wp-api.org/wp-json/wp/v2/posts?categories=[categoriesIds]
returns a JSON with an array of all posts that are linked to the categoriesIds parameter, and their metadata.

* Get media:
https://demo.wp-api.org/wp-json/wp/v2/media/[mediaId]
returns a JSON with the metadata of the media item with a specified mediaId parameter.

Our data source provider will expose two types that the Zapp app will be able to use:

1. `categories` - will get a wordpress website URL (e.g. `https://demo.wp-api.org`) and return a feed item that contains an array of categories.
2. `posts` - will get a category page URL (e.g. `https://demo.wp-api.org/category/facilis-dignissimos/`) and return a feed that contains an array of posts.

> The full source code of this tutorial can be found [here at GitHub](https://github.com/applicaster/zapp-pipes-provider-wordpress/).

## Step 1 - Preparing the project

The easiest way to start a data-source provider project is to clone the zapp-pipes-provider-starter-kit, so let's do that:
```
git clone https://github.com/applicaster/zapp-pipes-provider-starter-kit.git zapp-pipes-provider-wordpress
```
Don't forget to replace the git repository to your own one:
```
git remote set-url origin [YOUR-GIT-REPOSITORY]

```

The starter-kit is written in modern JavaScript (ES6) but the final data-source plugin should be coded in old plain ES5. To mitigate that, we are using [Babel](https://babeljs.io/) to transpile our ES6 code to ES5.
We will write our code under the `src` folder and Babel will output the ES5 code into the `lib` folder.

Now let's run `npm install` to install all our project's required packages.

Make sure that your npm token (provided by your Applicaster PM) is set up in the NPM_TOKEN environment variable.

`export NPM_TOKEN="YOUR_NPM_TOKEN"`

or, if you would like the `NPM_TOKEN` to be saved in your `bash` configuration execute the following commands:
```
echo 'export NPM_TOKEN="YOUR_NPM_TOKEN"' >> ~/.bash_profile
source ~/.bash_profile
```

The last thing we need to do in order to have our project ready is to change some values in the `package.js` file.

When creating a project from scratch you can use `npm init` to set up its attributes, but since we are using an existing project let's just open the `package.js` file and change the following values:

* `name` - this will be the name of your data source provider. If you want your package to be private make sure to start it with `@applicaster/` so it will be under the applicaster namespace. Otherwise, your package will need to be public to work in the Zapp platform.
* `description` - a short description of your data source provider.
* `repository` - a link to your data source provider's git repository.
* `author` - your name.
* `license` - license type.
* `bugs` - a link to your bug tracking system.
* `homepage` - a link to your project's homepage.

Now you can run `npm start` to see that the project is running without any errors.

## Step 2 - Configuration

A data source provider communicates its public interface using the `manifest.js` file.

Let's change the handlers array to represent our two commands: `categories` and `posts`, so it will look like that:
```javascript
handlers: ['categories', 'posts']
```

In addition, we should change the help object to describe our two commands:

```javascript
  help: {
    categories: {
      description: 'retrieves a list of available categories',
      params: {
        url: 'url of the wordpress website you would like to use'
      }
    },
    posts: {
      description: 'retrieves a list of posts related to a specific category',
      params: {
        url: 'url of the wordpress website category page you would like to use',
      },
    },
  }
```

Now you can open the provider's entrance point which is `index.js` under the `src/provider` folder.
The only thing you need to change here is the provider's name property. The name is how the Zapp app calls our provider.

In our case let's call it `wordpress`:
```javascript
const provider = {
  name: 'wordpress',
  manifest,
  handler,
  test,
};
```

The Zapp app will call our data source provider in the following format:

`wordpress://fetchData?type=dataType&url=urlValue`

1. `scheme` - `wordpress` in our case, we will define it in the plugin manifest (down in the deploy section).
2. `type` - the data type the user chooses in Zapp according to what we defined in the plugin manifest (down in the deploy section).
3. `url` - the value that the user puts in Zapp in the feed manager, can be ID or a full URL, according to the provider's needs.

One more thing before we continue - the starter-kit includes an example code that you should remove since our provider will already throw an error once it gets an undefined type.
Open `index.js` under the `src/provider/handler` folder and remove the following code:
```javascript
if (!type || ['collection', 'item'].indexOf(type) == -1) {
   return providerInterface.throwError('unknown request');
}
```

To end this step let's edit the `commands.js` file under the `src/provider/handler` folder.

We are going to implement our two commands: `categories` and `posts` in two separate files - `getCategories.js` and `getPosts.js`.

So we should change the `commands.js` file to:
```javascript
import { getCategories } from './getCategories';
import { getPosts } from './getPosts';

export const commands = {
  categories: getCategories,
  posts: getPosts,
};

```

Now create the `getCategories.js` and `getPosts.js` under the `src/provider/handler` folder.

## Step 3 - getCategories.js

This file is where we will execute the `categories` endpoint of the Wordpress API to retrieve a list of categories.

First, we need to add the [axios](https://github.com/axios/axios) HTTP client.
Do that by installing the axios npm package:
`npm install axios --save`
and then import it to the `getCategories.js` file:
`import axios from 'axios';`

> Remember that we are developing our data source provider in ES6 but at the end, it will be transpired to ES5 before being deployed.

Our file will export one function, also called `getCategories`, this function returns a Promise that contains the categories data in the format that the Zapp app requires.

It will look like that:

```javascript
import axios from 'axios';
import { mapCategory } from './mappers/categoryMapper';

export function getCategories(params) {
  const { url } = params;
  //call the wp-api categories endpoint
  return axios.get(`${url}/wp-json/wp/v2/categories`).then(response => {
    //throw error if returned data is not good
    if (!response.data || response.data.length === 0) {
      throw { message: 'no data', statusCode: 500 };
    }

    //map the returned data to match Zapp app requirements
    return { type: { value: 'feed' }, entry: response.data.map(mapCategory) };
  });
}
```
Pay attention that we imported a `mapCategory` function, this function will help us transform the returned categories data to the atom feed format that the Zapp app requires.

## Step 4 - categoryMapper.js

Let's create a new `mappers` folder under `src/provider/handler`. Here we will add the two mapping functions that we will use in this project - a `category` mapper and a `post` mapper.

Our categoryMapper is very simple, it gets the category id and name and returns them inside the atom feed model. The feed model is used when the Zapp app wants to show a list of items.

It also adds a formatted URL for getting the categories posts. This URL will be used by the Zapp app to either automatically load all posts of a category or load them after the user taps on the category.

```javascript
export function mapCategory(category) {
  const { id, name: title } = category;
  return {
    type: {
      value: 'feed'
    },
    id,
    title,
    media_group: [],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: `wordpress://fetchData?type=posts&categories=${id}` //formatted url to retrieve this category's posts inside the Zapp app
    }
  };
}
```

## Step 5 - getPosts.js

The `getPosts.js` file starts very much like the `getCategories.js` one, using `axios` to retrieve data from the Wordpress API, but the post data that we receive from the `posts` end point is missing the URL of the posts media items and that's why we need to execute another call to the Wordpress API for each post to retrieve its media item. 
We are doing that with the `mapPostMediaRequest` which creates the proper media request for each post and then passes the result `mediaItems` list to the `postMapper`


```javascript
import axios from 'axios';
import { mapPost } from './mappers/postMapper';
import { mapPostMediaRequest } from './mappers/mapPostMediaRequest';
import _url from 'url';

export function getPosts(params) {
  const { url } = params;

  const aUrl = _url.parse(url);

  //make sure this is a valid wordpress category url
  if (
    !aUrl ||
    aUrl.path.indexOf('/category/') == -1 ||
    aUrl.path.split('/').length < 3
  ) {
    throw {
      message: 'malformed wordpress category page url',
      statusCode: 500
    };
  }

  //get the category slug from the url
  const categorySlug = aUrl.path.split('/').pop();

  //save the baseUrl for the api calls
  const baseUrl = `${aUrl.protocol}//${aUrl.host}`;

  //call the wp-api categories endpoint to get the category id from our input slug
  return axios
    .get(`${baseUrl}/wp-json/wp/v2/categories?slug=${categorySlug}`)
    .then(response => {
      //throw an error if category doesn't exist
      if (!response.data || response.data.length == 0 || !response.data[0].id) {
        throw {
          message: `can't find category:${categorySlug}`,
          statusCode: 500
        };
      }

      const categoryId = response.data[0].id;

      //call the wp-api posts endpoint
      return axios.get(
        `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}`
      );
    })
    .then(response => {
      if (!response.data) {
        throw {
          message: `can't find posts for category:${categorySlug}`
        };
      }

      //fetch all posts media items - since we need a separate call to get the full media item url
      return Promise.all(
        response.data.map(mapPostMediaRequest(baseUrl))
      ).then(mediaItems => {
        //finally map the posts, attach their respective media items and return a feed item
        return {
          type: {
            value: 'feed'
          },
          entry: response.data.map(mapPost(mediaItems))
        };
      });
    });
}
```

## Step 6 - postMapper.js

In this file, we will get the post's `id`, `title` and `published` properties and put them in their respective atom article model structure.
We are using a [curried function](https://www.sitepoint.com/currying-in-functional-javascript/) to be able to pass both the mediaItems and the post data (that is coming from the `Array.map` method).

The result will be a model of the `article` type. This means that we will return the actual post's HTML in the `content.html` property (remember that it needs to be encoded).
We are also returning the post's link in the `link` property so the Zapp app's user will be able to share the original link of the post.

>In this example we are using the `article` model, if we wanted the original post link to open in a webview we could use the `link` type. You can learn more about the different supported models [here](http://zapp-tech-book.herokuapp.com/Zapp-Pipes/5.-Feed-API.html).

```javascript
export function mapPost(mediaItems) {
  return function(post) {
    const {
      id,
      date: publish,
      link,
      title: { rendered: title },
      content: { rendered: html }
    } = post;

    //if we can find the post's media id then let's add its url to our media_group
    const mediaItem = mediaItems.find(mediaItem => {
      return mediaItem && mediaItem.id === post.featured_media;
    });

    const { image: src } = mediaItem || {};
    const media_group = src
      ? [
          {
            type: 'image',
            media_item: [
              {
                src,
                key: 'image_base'
              }
            ]
          }
        ]
      : [];

    return {
      type: {
        value: 'article'
      },
      id,
      title,
      publish,
      media_group,
      content: { html },
      link: {
        type: 'text/html',
        rel: 'alternate',
        href: link //the post's link that will be used when a user shares the post
      }
    };
  };
}
```

## Step 7 - Tests

When our data source plugin is being added to the Zapp platform it goes through an integration test.

The test will execute our `testCommand` which will call one of our provider's commands.
To make sure that our test will pass even if there is no connection to the external API that we are using, we setup the `requestMocks` with all the external requests that our `testCommand` will execute.
In the case of our `categories` command, the only request we need to mock is the Wordpress API `get categories` endpoint.

```javascript
export const test = {
  testCommand: 'wordpress://fetchData?type=categories&url=http://demo.wp-api.org',
  requestMocks: [{
          host: 'http://demo.wp-api.org',
          method: 'get',
          path: '/wp-json/wp/v2/categories',
          expectedResponse: [{id:1, name:'test category'}]
        }]
};
```

It is always recommended to add unit testing. In our start-kit project, we are using [ava](https://github.com/avajs/ava) but you can change it to your preferred testing framework.

## Step 8 - Test locally

The `starter-kit` project comes with some goodies that will make your life easier testing your package locally.
It has the `server.js` file that implements a `zappPipesServer` that can be called from your local browser. It also uses the `nodemon` package that automatically watches your source files and restarts the server when you change them.

to run your datasource commands, open your browser and go to `http://localhost:8080/[providerName]/fetchData?type=[commandType]&[additionalParameters]`

In our case, if we would like to test the `categories` command we will enter the following URL: `http://localhost:8080/wordpress/fetchData?type=categories&url=http://demo.wp-api.org`

This should display our JSON response in the browser.

## Step 9 - Deploy

Now that our data source plugin is ready, tested and working perfectly, it's time to deploy it.

First, we need to publish our data source as an npm package to the npm repository.
We do that by running `npm publish` in our terminal.

>Whenever you update your data source plugin, you need to publish it again to the npm repository. Remember to update your package version in the `package.json` file before doing that.

1. create your Zapp Token on your [applicaster account setting](https://accounts.applicaster.com/admin/users) (`Access Tokens` are at the bottom of this page).

2. set your new Zapp Token as a system variable `echo 'export ZAPP_TOKEN=<paste_your_token_here>' >> ~/.bash_profile` and then run `source ~/.bash_profile` to update your bash environment.

3. Add the applicaster tap to brew: `brew tap applicaster/tap` and install zappifest `brew install zappifest`.

4. run `zappifest init` and enter the following parameters:
    * `Author name` - your name
    * `Author email` - your email
    * `Manifest version` - you can leave it at 0.1.0
    * `Plugin name` - a readable name for your data source plugin. e.g. `Wordpress Data Source`
    * `Plugin description` - a short description for your plugin
    * `Plugin type` - you need to select `Data Source Provider`
    * `Plugin identifier` - a unique identifier for your data source plugin. for example: `wordpress-ds`
    * `Repository URLs` - the URL of your code repository
    * `Package name` - the exact package name as you entered in the package.json file. In our example, it is `@applicaster/zapp-pipes-provider-wordpress`
    * `Package version` - the exact package version as you entered in the package.json file. in our example `1.0.0`
    * `Whitelisted account ids` - if your data source should be enabled for specific applicaster accounts then you should write them down separated by commas
    * `Min Zapp SDK` - the minimum Zapp SDK version that your data source provider requires. At the moment leave it at 4.0.0
    * `Deprecated since Zapp SDK version` - you can ignore this parameter at the moment
    * `Unsupported since Zapp SDK` - you can ignore this parameter at the moment
    * `Provider's scheme` - your provider name as you entered in the `src/provider/index.js` file. In our case, it is `wordpress`

 * The following parameters will all determine how the data source provider will appear in the `Zapp UI Builder`, they should be as self-explanatory as possible so a non-technical user will be able to understand what each command (Data Type) does and what values should be set for each parameter:

    * `How many Data types the provider supports?` - the number of types that your data source supports. Our Wordpress data source supports `2` types: `categories` and `posts`
    * `Type label` - a user-friendly name for your data source type. for example: `Categories`
    * `Type value` - the actual string that represents your type. for example: `categories`
    * `Documentation link` - a link to a web page that explains this data type in a way that a non-technical user can set it up
    * `Input description` - A description for the expected provider input type. for example: `full url of the website homepage`
    * `Input text placeholder` - This text will be presented as placeholder text in the input field
    * `Input info screenshot URL` - Optional, Screenshot URL that provides further info for the requested input

5. The `zappifest` tool should, at this point, to create a `plugin-manifest.json` file.
  Now run `zappifest publish --manifest plugin-manifest.json --access-token $ZAPP_TOKEN` and your data source provider is published on the Zapp platform and ready to use in Zapp apps.
  
The full source code of this tutorial can be found [here at GitHub](https://github.com/applicaster/zapp-pipes-provider-wordpress/).