# Getting Started with Building a Public Plugin
### Partner Documentation

### Purpose
Public plugins are presented to all customers in the marketplace and are openly available for use. This document outlines the initial steps of preparing for developing a public plugin and preparing for the development kickoff call with marketplace that will help get things started.

### Checklist

- If you haven’t established a relationship with our Business Development team yet, reach out to Erik Koland (e.kolad@applicaster.com) in order to do so. This can help establish a mutually beneficial relationship so you can best capitalize on the opportunities our marketplace enables.

- Prep for your plugin kickoff call with the Marketplace Team. This will be a good time to raise any open questions or request feedback. You should check off the following items prior to the call:
	- Identify your full product scope for your plugin so we can guide you on choices for which Zapp APIs are best suited to your needs
	- Create a request for starting [the onboarding process for your developers](https://applicaster.atlassian.net/servicedesk/customer/portal/2/group/3/create/18) (if it is the first time, click the “signup” button) 
	- Identify who will fill the roles of Product Manager and Project Manager for your plugin development. 
	- Reach out to Yoni Osteen from the marketplace team (y.osteen@applicaster.com) to get a development kickoff call set up
	- Get started at looking through our [developer documentation](https://developer.applicaster.com/). If you have any technical questions or a request for specific documentation that you do not see available, you can submit a ticket via [the service desk](https://applicaster.atlassian.net/servicedesk/customer/portal/2).
	- We’d recommend having your developers look at [the getting started guide](https://developer.applicaster.com/getting-started/zapp-plugins.html)
	- After reviewing and understanding the big picture, they should work on [setting their local environment](https://developer.applicaster.com/dev-env/intro.html) for the relevant platforms.
	- The most popular and highly recommended plugins in our marketplace follow our recommended best practices. The following items are not required to publish a plugin, but it will make your plugin higher quality, more robust, and more broadly promoted, and it is helpful to consider these things prior to the development kickoff.
		- Analytics coverage
			- Utilize [our analytics APIs](https://developer.applicaster.com/analytics/client_side_api/client_side_api.html) to send analytic events, screen views, and user data through our pipeline. Any analytics providers the customer receives will automatically receive your analytic data, in context with the rest of analytics data.
			- This is better than isolated analytics in a separate system as it enables analyses like funnel analysis, user path analysis, and segmenting behavior and events across different domains of the app. Make sure to document your analytics offering and reference them in your About page.
		- Include automated testing
			- We’ve found historically that this saves development effort down the road. At a minimum, we recommend providing automated testing for any bug fixes to prevent regressions.
		- Tooltips on all configurable fields
			- To optimize user experience and minimize operational support burden, we recommend adding tooltips to all relevant fields, which can be read about in [the manifest documentation here](https://developer.applicaster.com/zappifest/plugins-manifest-format.html).
		- Keep configuration fields clean with conditional fields and grouping
			- Some plugins require several configuration fields. If you provide more than a handful, conditional fields (only showing a given field when a particular configuration requirement of another field is met) and grouping are effective ways of keeping things clean and usable. You can read more about this in [the manifest documentation here](https://developer.applicaster.com/zappifest/plugins-manifest-format.html).
		- Developer Docs
			- Including developer docs in your project helps with maintenance. If you also choose to make your plugin open source, this enables others to more effectively submit enhancements and fixes.
			- If provided, we recommend referencing within your About markdown, described in more detail in the [Plugin Rollout Document](/partner-resources/partner-plugin-rollout.md).
			
- As you’re making a Public Plugin for general Marketplace use, please direct whomever handles your product marketing to our [Plugin Rollout Document document](/partner-resources/partner-plugin-rollout.md) so they can get started in preparing the materials needed to make you shine in our Marketplace. 

- If you've been in touch with Erik Roland from our Biz Dev team (first bullet above), he will send your team the Plugin Owners Terms of Use document. Make sure this is signed and submitted before submitting your plugin for review.
