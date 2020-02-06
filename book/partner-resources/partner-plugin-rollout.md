# Stepping into the Marketplace
## Public Plugin Rollout

### Purpose
Public plugins are presented to all clients in the marketplace and are openly available for use. This document outlines a checklist of steps that should be followed in order to make your plugin publically accessible. This document assumes you have already conducted a kickoff with the marketplace team as described in the [Preparing to build a partner plugin](/partner-resources/prep-for-kickoff.md) document, are working on (or have finished) the development of your plugin, and are preparing for your plugin’s rollout.

### Checklist

* Update the metadata of the plugin by updating the relevant fields. Your developers can do this using [the CLI Zappifest tool](https://developer.applicaster.com/zappifest/zappifest.html) if you provide them the following information:
	* Name
		* Please use Proper Case (capitalized words with spaces in between)
		* Please make sure it is consistent across platforms
	* Description
		* A description of the plugin that will appear in the thumbnail view below the plugin name in the marketplace. Should be 90 characters or less.
		* Limit of 90 characters.
	* Both Name and Description are updated when you update the manifest of your plugin for any platform. As such, we recommend including them in a readme in your Monorepo so your devs know what values to use everytime they update their plugin.
	ou use more than 90 characters, check the console that the description is not cut off. 
	* Cover Image
		* The image shown in the cell both when clicking on a plugin and in the plugin gallery thumbnail view.
		* Images are recommended to be in png format, size of 1000 x 525 px, with a transparent background.
	* Update the About text
		* The about section is best provided (and uploaded via the previously mentioned [Zappifest tool](https://developer.applicaster.com/zappifest/zappifest.html)) as a markdown file. 
		* You can find a template for this [here](https://drive.google.com/open?id=1o9kHv-nPc_FbO-JteWj3L7DwQ9CAWWHN).
		* We recommend including the following sections:
			* High-level description
				* Depending on the context, 2-5 sentences explaining what this plugin is, how it can be used, and what value it can generate. If relevant, include an image and a link to a website, configuration guides, or other resources
			* Key Features
				* One bullet per feature. If you have two features or less, we recommend skipping this and describing those features in the high-level description
			* Pricing
				* If pricing can be standardized, include it here. Otherwise, provide a sales contact.
			* Support
				* *This is a required field*
				* Include SLA and support contact information
			* Things to keep in mind
				* Use this space to point out anything that would otherwise surprise a user or cause them to unnecessarily reach out to your support. For example, this is a good place to document known issues and limitations, anything that is out of scope, or work currently in development. 
			* Change Log
				* Unless you are populating this after your first release, you likely won’t include this part, but as you make changes, you’ll want to record each version release and what changes they entailed, organized by platform.
	* Marketplace & Support review
		* Meet the support team. Conduct a demo, and receive approval from support, a product representative of the Marketplace, and Dev Relations. To organize this demo and review, contact:
			* y.gol@applicaster.com - Head of Support
			* y.osteen@applicaster.com - Product Lead, Marketplace, Partner Product Success
			* dev-rel@applicaster.com - Dev Relations general contact
		* We will discuss how to improve visibility and marketability of your plugin, leading to the next step:
			* Create a slide that Applicaster Sales and Customer Success can insert into their presentations
				* Applicaster uses Google Slides for presentations, and we’ve made [a template with our styling](https://drive.google.com/open?id=1o9kHv-nPc_FbO-JteWj3L7DwQ9CAWWHN) available so you can create a slide about your plugin that our team can insert into our own presentations for relevant shared customers to help find potential matches and drive business to your company through the plugin.
				* If you create a slide following the template and share it with us, we’ll make sure the right people at Applicaster have it as a resource to represent you.
		* Marketplace Team will mark the plugin as public after the previous call is conducted and approval received
		* Presentation to Applicaster’s Sales and Customer Success Team, which can drive adoption for your plugin. 
		* Shared Public Statement
			* We recommend working with Applicaster’s marketing team to announce the release of your plugin, which can help drive attention from the market and ensure the success of your efforts.
				* Reach out to Alexandra Urrea at a.urrea@applicaster.com to get this orgaanized
