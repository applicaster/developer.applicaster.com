# Login Release Notes

#### Product Description

Login is an Applicaster service which enables our customers to collect user data from their end-users by asking them to log in.

#### Release Notes
#### Version 1.0

Version 1.0 collects user data for users who log in anywhere in the app via Facebook or via Applicaster's Stitcher Product. To ensure the data is delivered properly, make sure when Mixpanel People is configured in Zapp. [Click here] to learn how to configure analytics in Zapp.

Version 1.0 sends user profile data to [Mixpanel People](https://mixpanel.com/people/). Most analytics providers (Flurry, Google Analytics, Facebook Analytics, etc.) do not enable you to send PII (Personally Identifiable Information) or profile-level user data. Therefore, Applicaster delivers this user data to Mixpanel, which does support the storage of PII data. Mixpanel can also serve as an analytics tool and provides engagement and remarketing tools based on this data.

Additionally, developers can use Login 1.0 as a service to deliver user data for any web-based product that can be delivered in-app by use the [JS-2-Morpheus](http://developer.applicaster.com/docs/public/JS-2-Morpheus), an API that can receive analytics data and operates as a component of Applicaster's [JS-2-Native API](http://developer.applicaster.com/docs/public/js2native).

Lastly, developers can combine this offering with Applicaster's [Authentication Service](http://developer.applicaster.com/docs/public/authorization-provider) if they want the login to serve as a gateway to accessing content, hence incentivizing the act of logging in.