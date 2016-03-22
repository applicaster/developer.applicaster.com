# Live+ - integration in a zapp app

This document describes how to integrate Live+ in a zapp app

## how to integrate Live+ in a zapp app

1. make sure you have a dock enabled for overlays. If not, [click here to see how to create one](https://applicaster.zendesk.com/hc/en-us/articles/202074808-The-Dock)

2. create a link category with the live+ widget url from the show admin page [(click here to see how)](https://applicaster.zendesk.com/hc/en-us/articles/202074628-Creating-a-link-URL-category)
It is advised that you create the link category without showing navigation and close buttons, as Live+ will display a toggle button for you.

3. create a web event pointing to the following url (using your app's url scheme) : appscheme://present?categoryids=XXXX
where xxx is the category id. [Click here for more info on creating an event](https://applicaster.zendesk.com/hc/en-us/articles/202075198-Link-Event) [and here to see how to retrieve the category id](https://applicaster.zendesk.com/hc/en-us/articles/202074708-Finding-the-ID-of-a-category-item)
