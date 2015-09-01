## Group Chat Setup

### Overview

This internal document is intended for Applicaster employees to understand what is the Web Group Chat product, how to configure the link for it per customer, and how to customize it.

### Product Description

The product enables end users to become viewers of personal chats between stars of the show, hosts, or any other relevant VIP’s. 

This product keeps users up to date and involved in the show off broadcast time, in a fun and engaging way. 
The broadcaster can easily define the characters, write the chat content and customize the look & feel of the group chat front-end within the starlight CMS. 
The end users get to follow the conversation, like and share bits of the talk. 

![image](assets/group_chat_example.jpg =320x568)


### Link Configuration

The link to Group Chat will always **start** like this: 

    http://assets-production.applicaster.com/static/groupchat/1.1/index.html

This link has several parameters that need to be added:

**Account** - The account ID.  
**Timeline** - The Stars timeline ID.  
**Name** - Title of the groupchat which will appear at the top of the page.  
**Image** - Image of the groupchat which will appear in the right top corner of the page.  
**Environment** - If the account is not in production, an environment must be specified (qa / demo / server). 

Here’s an example of what the link may look like once the parameters are configured:

    http://assets-production.applicaster.com/static/groupchat/1.1/index.html?account=54aa34dfa4f7c396da00001e&timeline=55a3b344c51403f147000014&environment=server&name=Sheldon%27s%20Friends&image=http://www.slash.co.il/projects/applicaster/assets/sheldon.png

### Customization
Group Chat customization can be controlled using the [Starlight CMS](http://cms.applicaster.com) customization section which can be found on the main feed page:


![image](assets/main_page.png =700x400)


#### Color Customizations
When going into the customization section, step 2 is the one that is relevant for Group Chat, and it allows the color customizations at first:

![image](assets/customizations.png =700x400)

Below is a description of each color type and what it affects:

**Main color** - The title bar background color.   
**Text color** - Fonts color.   
**Secondary color** - Bubbles color.  
**Background color** - The page's background color.


#### Icon Customizations
Secondly, the section below allows icon customization.
For this product, only the Liked and Like icons are relevant, and these are the buttons that will be displayed next each message.

![image](assets/icons.png =700x400)

### Enabling Group Chat In The App

In order for the customer to have group chat available in the app, they will need to create a link category/banner that links to the link configured by us (explained above). 

Now what is left for the customer is to start shooting events from the relevant event sources (the members of the group chat). 

Please note that the group chat will be live as long as there is a live episode in the feed the group chat is attached to.