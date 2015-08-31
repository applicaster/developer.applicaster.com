## Group Chat Setup
### Description

The product enables end users to become viewers of personal chats between stars of the show, hosts, or any other relevant VIP’s. 

This product keeps users up to date and involved in the show off broadcast time, in a fun and engaging way. 
The broadcaster can easily define the characters, write the chat content and customize the look & feel of the group chat front-end within the starlight CMS. 
The end users get to follow the conversation, like and share bits of the talk. 

![image](assets/group_chat_example.jpg =320x568)

### Link Configuration

The link to Group Chat will always **start** like this: 

    http://212.150.87.124/groupchat/1.0/index.html

This link has several parameters that need to be added:

**Account** - The Stars account ID.  
**Timeline** - The Stars timeline ID.  
**Name** - Title of the groupchat which will appear at the top of the page.  
**Image** - Image of the groupchat which will appear in the right top corner of the page.  
**Environment** - If the account is not in production, an environment must be specified (qa / demo / server). 

Here’s an example of what the link may look like once the parameters are configured:

    http://212.150.87.124/groupchat/1.0/index.html?account=54aa34dfa4f7c396da00001e&timeline=55a3b344c51403f147000014&environment=server&name=Sheldon%27s%20Friends&image=http://www.slash.co.il/projects/applicaster/assets/sheldon.png

### Customization
Colors and images can be controlled using the [Stars](http://stars.applicaster.com) timeline customization which can be found here:

![image](assets/customization_group_chat.jpg =170x200)

Field descriptions:  
**Main color** - The title bar background color.   
**Text color** - Fonts color.   
**Secondary color** - Bubbles color.  
**Background color** - The page's background color.


![image](assets/customization_2_group_chat.jpg =600x400)

## Summary
You are now ready to start chatting!  
You have your link and customizations set up, so what you need now is to start shooting your events from the relevant event sources (the members of your group chat). 
