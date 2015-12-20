## Applicaster Admin settings for Apple TV

Applicaster AppleTV gives you the chance to provide your users with the perfect TV viewing experience.

This product consists of few elements, such as various screens and a menu, that structure that app clearly for you as a broadcaster and your users.

From a content point of view, you can set the Type and Order across the app. From a design pont of view, you can set the text color, background color or add a background asset.

Please follow the below guidelines in order to complete the app configuration:


### Define the app data
**TV Menu Collection** - UI tag: `tv_menu_collection`.
This collection should include the TV Home Collection and all the relevant Top Level / Generic categories we want to show  in the app top menu (The TV Home Collection is mandatory, the others TLCs are optional).
Every category should have this hierarchy: TLC/Generic — Show — Season — VOD.

**Home collection** - UI tag is: `tv_home_collection`.
Defines the content of the home screen, the title will shown in the app. The home collection should include 2 child collections:

1. **Promoted collection** - UI tag is: `tv_promoted_collection`. This collection includes the promoted VODs that will shown in the home screen top carousel.
2. **List collection** - UI tag is: `tv_list_collection`. This collection should include all the categories we want to show in the home screen below the carousel. Every category should have VODs as its children.

### Define the app style
In the Apple TV VOD app you can define the app style by changing the app text color, background color or main background asset.
At the moment, those three parameters are set by "admin extentions". In the future it will move to ZAPP style settings.

The json extentions should be:
```
[
{"section":"advertising","entities":["app"],"type":"text","key":"apple_tv_text_color"},
{"section":"advertising","entities":["app"],"type":"text","key":"apple_tv_background_color"},
{"section":"advertising","entities":["app"],"type":"image","key":"apple_tv_background_image"}
]
```
