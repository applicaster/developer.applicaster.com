# Stitcher Analytics 

A description of the Stitcher product, often referred to as the Questionnaire product, can be found [here](http://developer.applicaster.com/docs/public/questionnaire-release-notes). The analytics description of this produt Stitcher is separated into two sections:

1. **Feature Analytics** - these are analytics that are set to examine the feature's performance, how it is contributing to end user satisfaction, and other questions that should lead us to releasing better and more beneficial future iterations of this product. We integrated these analytics to empower our customers to conduct their own product and content analysis.

2. **User Profile Analytics** - these are analytics that are the core of the value this product brings. In the case of a logged in user, this product provides user profiles within MixPanel, which allows the customer to determine the winner/s of a specific Stitcher activity.

## Feature Analytics

For detailed documentation on the events tracked for Stitcher, including which properties they contain and examples, click the link [here](https://docs.google.com/spreadsheets/d/1jwh62T1tcokJwPMHEW9-gLMYr73EitCf0BwRU4XiF4I/edit?usp=sharing)


## User Profile Analytics

If received upon login (or from the Facebook Public Profile when using FB Login), the following user properties are tracked:

* First Name
* Last Name
* FB Link
* FB Gender
* FB Locale
* FB Timezone
* FB Photo URL
* FB ID
* Email
* Phone

If the user answers Stitchers in which the questions have correct and incorrect answers (as opposed to polls), the following user properties are tracked:

* X - Answers Correct *(incremental value)*
* X - Time Taken *(incremental value)*
* Y - Answers Correct *(incremental value)*
* Y - Time Taken *(incremental value)*

Where X = Name of Stitcher/Questionnaire, and Y = The Date 

