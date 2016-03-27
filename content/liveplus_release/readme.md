# Live+ Release Notes

## Product Description

The product enables client to overlay social media content on top of a live stream, in any video player, should it be in websites, iOS or android mobile / tablet apps.

![Live+](https://files.slack.com/files-pri/T03GFQLL8-F0MVCHGPL/pasted_image_at_2016_02_18_03_33_pm.png?pub_secret=b60a2f10b9)

The client can create configurations for different shows, with message interval, welcome message, whitelisted accounts and hashtags to filter tweets from. When a show is enabled in the admin page, it starts a background job to build a queue of tweets. This queue can be monitored and managed from the admin interface. At the interval defined by the client, the queue is shifted, and the latest item is sent to all users connected to the video stream integrated with a properly set Live+ widget.

## alpha 0.1 - "Lives comes alive" (march 2016)
* clients can create and save multiple configurations for multiple shows
* clients can define their own welcome message (displayed when user first arrive on the stream)
* clients can set message interval (time between two tweets) in admin
* clients can set whitelisted accounts and hashtags
* easy integration on web (npm package) and ios (cocoa pod)
