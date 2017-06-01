# App Analytics
### Video Events (iOS v2.7 and above, Android v2.6 and above)

Event  | Insight
--------------- | ---------------
**Play VOD Item** | Measures that a video item is played, and for how long. The item played holds the following parameter: The video type (Applicaster model, or ATOM type), Item Name and the parameters that are related to each type, i.e.: Season Name, Show Name, Show ID, Free/Paid, Item ID for Applicaster video model, and ATOM feed name for ATOM video type. Note that if a user leaves during the pre-roll, this event will not be counted. 
**VOD Item: Play Was Triggered** | Measures that a video cell was tapped, triggering play. The event is measured whether not the user stays through a pre-roll and the actual video loads.
**Play Channel** | Measures when the a live stream plays on the video player.
**Program: Play Live Was Triggered from Cell** | Measures when tapping on a 'Live Program' item in order to play it. This Live Program event refers to promotion from componentized cells and not from the EPG and Live Drawer). 
**Program: Play Icon Clicked on Generic Screen** | Measures when tapping on the 'Play' Icon from EPG or Live Drawer, in order to play the program. Note that combined with “Program: Play Live Was Triggered from Cell”, both address all possibilities of playing live programs. 
**VOD Item: Intermediate Button Clicked** | Measures when tapping on the 'Info' button on a VOD Item. All parameters of the Play VOD event are included, except the length. On Android. 
**VOD Item: Info Button Clicked** | Measures when tapping on the 'Info' button on a VOD Item. All parameters of the Play VOD event are included, except the length. On iOS. 
**Intermediate: Share Button Clicked** | Measures when tapping on one of the 'Share' buttons within the intermediate screen of a VOD Item. 
**VOD Item: Marked/Unmarked As Favorite** | Measures when tapping on Mark/Unmark-as-Favorite button on a VOD Item. All parameters of the Play VOD event are included, except the length. 




### Player Events (iOS v2.7 and above, Android v2.6 and above)

Event  | Insight
--------------- | ---------------
**Capture a moment played** | Measures User playing a video moment that was received from the shared 'Capture a moment' feature. All parameters of the Play VOD event are included, except the length. 
**VOD Moment Share: Record Button Clicks** | Measures when a user taps on the 'Record' button of Capture a Moment feature. 
**Facebook Dialog Opened** | Measures when the 'Facebook' button was tapped in the dock of the video player. All parameters of the Play VOD event are included, except the length. 
**Facebook Share Posted** | Measures when the 'share' button was tapped within the facebook dialogue box and the user has successfully posts to Facebook from the dock of the video player. All parameters of the Play VOD event are included, except the length. 
**Overlay Email Opened** | Measures when the 'Email' icon is tapped from the video player overlay, in order to share the video via email. iOS only. 
**Overlay Email Sent** | Measures when the Email was sent from the video player overlay. 
**Overlay Twitter Opened** | Measures when the 'Twitter' icon tapped from video player overlay. 
**Overlay Twitter Sent** | Measures when a Tweet was sent from the video player overlay. 



### Navigation Events (iOS v3.1 and above, Android v3.2.24 and above)

Event  | Insight
--------------- | ---------------
**Launch App** | Measures when a user launches the app, referring to initial launches, not back-from-background re-launches.
**Home Screen: Viewed** | Measures when a user views the home screen. 
**Toolbar: Side Menu Button Clicked** | Measures tapping on the Hamburger button, which opens the side menu. 
**Toolbar: Live Icon Clicked** | Measures tapping on the Live button on the navbar / titlebar.
**Toolbar: Feed Icon Clicked** | Measures tapping on the Feed button on the navbar / titlebar, in its active state (= when there's a live episode). iOS only. 
**Side Menu: Area Switched** | Measures tapping on non-selected menu item in the side menu.
**Side Menu: Search Field Clicked** | Measures tapping on the Search text field in the Side Menu. 
**Side Menu: Search Results Clicked** | Measures tapping on a search result. 
**Show Was Clicked** | Measures tapping on an item from type Show, which opens the Show screen. 
**Link Category Was Clicked** | Measures tapping on an item of type Link Category, in order to open the Link Category. 
**Category Was Clicked** | Measures tapping on an item of type Category which is not a Show, in order to open the category. This event excludes tapping on categories from the side menu).
**Podcast Category Session** | Measures the duration of time spent in the audio category.
**Play Audio Episode** | Measures plays of the Podcast/audio category.
**Channel Schedule: Program Clicked** | Measures tapping on a Program in the Full EPG screen. 
**EPG: Now Button Clicked** | Measures tapping on the ‘Now’ button in EPG screens, which locates the list on the present program.
**Program: Personal Reminder Turned On/Off** | Measures tapping on an 'on/off Reminder' button, to turn on/off a personal reminder notification when a program is live from within the 'live program' componentized cells. 
**Live Drawer: Show All Channels Clicked** | Measures tapping on the 'live drawer' button, in order to display the channel list. 
**Channel List: Channel Clicked** | Measures tapping on a Channel in the Channel List screen, reached from the 'Live Drawer' screen. 
**Live Drawer: Live Program Clicked** | Measures tapping on a live program from the live drawer.
**Live Drawer: Personal Reminder Turned Off/On** | Measures tapping on an 'on/off Reminder’ button, to turn on/off a personal reminder notification from within the 'live drawer'. 
**Live Drawer: Show All Channels Clicked** | Measures tapping on the 'Show All Channels' link within the live drawer, a link which will display a selection of live channels. *Note: This link only appears in the UI if more than one channel is configured* 
**Settings: Facebook Area Clicked** | Measures tapping on the ‘Facebook’ section in the Settings screen.
**Settings: Facebook Login Button Switched** | Measures toggeling the 'Facebook toggle' in order to log in or out, in the Settings screen. 
**Settings: Twitter Area Clicked** | Measures tapping on the ‘Twitter’ section in the Settings screen. 
**Settings: Connect To Twitter Clicked** | Measures tapping on the 'Connect to Twitter' button in order to connect to the twitter account, in the Settings screen. 
**Settings: Contact Us Area Clicked** | Measures tapping on the ‘Contact Us’ section in the Settings screen.
**Settings: About Area Clicked** | Measures tapping on the ‘About’ section in the Settings screen. 
**Settings: Email Button Clicked** | Measures tapping on the 'Sending feedback/problem' buttons, triggering an email message, from the Settings screen. 
**Open Web Page: View Web Page** | Measures launch of a Web page from within the app. This event is triggered when the HTML is loaded, or upon view, not upon clicking the url that launches the web page. 
**Open Web Page: Tap Close Button** | Measures tapping on the 'close' button on the in-app web view. 
**Sync Button Exposure** | Measures when the the User is exposed to sync button. 
**Sync Button Clicked** | Measures tapping on the sync button. 
**Sync Button Closed** | Measures tapping on the 'close' button of the sync button. iOS only - Android has back functionality instead of close button 
**Tap Notification** | Measures when a user taps on a push notification or reminder notification. Identify which particular push messages bring in the most users and how that fits within the greater flow of user behavior.
**Tap Atom Feed** | Measures when a user taps on an Atom Feed, including Audio type excluding Photo Gallery type. 
**Photo Album Clicked** | Measures user taps on an ATOM Photo Album (also known as a Photo Gallery). 
**Article Clicked** | Measures user taps on an ATOM article. 
**Article Item: Info Button Clicked** | Measures user taps on the 'info' button of an article. 

## More

For detailed documentation on these events, including which properties they contain and examples, click the link [here](https://docs.google.com/spreadsheets/d/1Hlp2sAm9lsKR3x__pk-dD-oCVBO3vJItjnQlrNwB_NM/edit?usp=sharing)
