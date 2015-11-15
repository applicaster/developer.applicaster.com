## Group Chat Setup

### Overview

This internal document is intended for Applicaster employees to understand what is the Web Group Chat product, how to configure the link for it per customer, and how to customize it.

### Product Description

The product enables end users to become viewers of personal chats between stars of the show, hosts, or any other relevant VIP’s. 

This product keeps users up to date and involved in the show off broadcast time, in a fun and engaging way. 
The broadcaster can easily define the characters, write the chat content and customize the look & feel of the group chat front-end within the starlight CMS. 
The end users get to follow the conversation, like and share bits of the talk. 

![image](./assets/group_chat_example.jpg)


### Link Configuration

It is possible to have more than one group chat in an account, and if so, we can display a selection menu.
In this case please note that the menu will show ALL timelines in the account as though they were group chat, so if you are planning to use this link make sure the **account only has group chat timelines**.

#### Selection Menu Link


The link to selection menu of the group chat will always **start** like this: 

    http://assets-production.applicaster.com/static/groupchat/production/index.html

This link has several parameters that should be added (compulsory parameters are marked with a *)

**account*** - The Starlight account ID. 
This can be obtained from the link in Starlight, as it appears after the 'accounts', see picture below.

![image](./assets/account_id.png)

**active*** - Always add the parameter "active=1" to the inner chat.

**ga_id** - Set this parameter to the value of the Google Analytics account that is set up for this customer. In this way the customer will receive GroupChat analytics about how end users are using this product. This value is not compulsary in order for the product to work, but we **highly recommend** not releasing it without analytics.

**topbar** - If the value is set to 0, no top bar will appear (this is good for when displaying the group chat web inside the Group Chat Messenger app, for example, otherwise this is irrelevant).
	
**environment** - If the account is not in production, an environment must be specified (qa / demo / server).

**show_dates** - If you would like to see dates and times of the groupchat messages in the group chat, please set this paramaeter to the value of 1.

**show_likes** - If you would like to see the Like icon next to the messages in the groupchat, please set this paramaeter to the value of 1.

**show_user_name** - If you would like to see the usernames of the groupchat members on each message in the groupchat, please set this paramaeter to the value of 1.

**rtl** - If you would like the GroupChat messages to be suited for a right-to-left language, set this parameter to the value of 1.

**lang** - If you would like the GroupChat general texts to be in a language other than language, please set it here. Currently we support Spanish (parameter value 'es'), and Hebrew (parameter value 'he').

Here’s an example of what the link may look like once some of the parameters are configured:

	http://assets-production.applicaster.com/static/groupchat/production/index.html?account=54aa34dfa4f7c396da00001e&active=1&ga_id=UA-60163404-3
 

	
#### Single Group Chat Link


The link to a single group chat will always **start** like this: 

    http://assets-production.applicaster.com/static/groupchat/production/chats/index.html

This link has several parameters that need to be added:

**account*** - The Starlight account ID (obtained as explained above).

**timeline*** - The Starlight timeline ID.  
This can be obtained from the link when opening the relevant feed (=timeline) in Starlight, as it appears after the 'feeds', see picture below.

![image](./assets/timeline_id.png)

**active*** - Always add the parameter "active=1" to the inner chat.

**ga_id** - Set this parameter to the value of the Google Analytics account that is set up for this customer. In this way the customer will receive GroupChat analytics about how end users are using this product. This value is not compulsary in order for the product to work, but we **highly recommend** not releasing it without analytics.

**topbar** - If the value is set to 0, no top bar will appear (this is good for when displaying the group chat web inside the Group Chat Messenger app, for example, otherwise this is irrelevant).

**environment** - If the account is not in production, an environment must be specified (qa / demo / server).

**name*** - Title of the groupchat which will appear at the top of the page.
  
**image*** - URL of an image of the groupchat which will appear in the right top corner of the page.  

**show_dates** - If you would like to see dates and times of the groupchat messages in the group chat, please set this paramaeter to the value of 1.

**show_likes** - If you would like to see the Like icon next to the messages in the groupchat, please set this paramaeter to the value of 1.

**show_user_name** - If you would like to see the usernames of the groupchat members on each message in the groupchat, please set this paramaeter to the value of 1.

**rtl** - If you would like the GroupChat messages to be suited for a right-to-left language, set this parameter to the value of 1.

**lang** - If you would like the GroupChat general texts to be in a language other than language, please set it here. Currently we support Spanish (parameter value 'es'), and Hebrew (parameter value 'he').


Here’s an example of what the link may look like once some of the parameters are configured:

	http://assets-production.applicaster.com/static/groupchat/production/chats/index.html?account=54aa34dfa4f7c396da00001e&timeline=55efe65a16fa3a1e08000002&environment=qa&name=groupchat&image=https://lh5.ggpht.com/sQWHRHcRxGCkAoGBflyTupVKc4oB8RIFZBdQFSe3JSCNcBqjqZhZdB2JLLCzVUfCAQ=h900&active=1&ga_id=UA-60163404-3&show_likes=1&lang=es
	
### Customization
Group Chat customization can be controlled using the [Starlight CMS](http://cms.applicaster.com) customization section which can be found on the main feed page:


![image](./assets/main_page.png)


#### Color Customizations
When going into the customization section, step 2 is the one that is relevant for Group Chat, and it allows the color customizations at first:

![image](./assets/customizations.png)

Below is a description of each color type and what it affects:

**Main color** - The title bar background color.   
**Text color** - Fonts color.   
**Secondary color** - Bubbles color.  
**Background color** - The page's background color.


#### Icon Customizations
Secondly, the section below allows icon customization.
For this product, the Liked and Like icons are relevant, and these are the buttons that will be displayed next each message.
The Back button can also be customized and it will be displayed at the top left of the GroupChat webview. 

![image](./assets/icons.png)

### Enabling Group Chat In The App

In order for the customer to have group chat available in the app, they will need to create a link category/banner that links to the link configured by us (explained above). 

Now what is left for the customer is to start shooting events from the relevant event sources (the members of the group chat). 

Please note that the group chat will be live as long as there is a live episode in the feed the group chat is attached to.
