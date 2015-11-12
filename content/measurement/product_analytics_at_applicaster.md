# Product Analytics at Applicaster

##### “Continuous measurement and monitoring will help you continuously improve your app as it progresses into more mature releases.” - Pierre-Luc Simard (CTO of Mirego)

Consumer products (like the Feed) and customer products (like Starlight) involve user interaction that can be measured to better understand and improve our product offering. In the case of consumer products, this data can also help our customers make better use of our products.

This section outlines the process for ensuring we get to take advantage of the benefits of product analytics. When you kick off the planning of a new product or feature, reach out to me (Yoni O) and we’ll go through this procedure together for as long as you’d like.

### Steps of Procedure

1. When developing a new product or feature, ask yourself the following questions: 
    * How can I tell that this product/feature is succeeding?
    * What questions will I want to be able to answer about how the product is being used so that I can continue to iterate more effectively on it?
        * Identify what you’d want to understand before building your next iteration of this product.
    * If you’re building a consumer product, identify what questions your customers would want to ask about how the product is being used in order to:
        * Measure success
        * Improve upon this success
        * Adjust content or promotion strategy
        * Understand their end users betters
        * Understand the product itself better
    * In many cases, it is better not to assume. You may want to actually ask the customers themselves.
2. Document necessary events and properties for development
    *  Make sure that you have identified whatever events and properties are necessary to address these questions.
    *  Use [this template](https://docs.google.com/a/applicaster.com/spreadsheets/d/1lFJC3-LLSrdQTW1rv0uN6C0KzdiAMy5mOr2jirNQPQg/edit?usp=sharing) to document the metrics.
        *  Please make a duplicate and work in that, rather than in the template directly
        *  We can go through this process together and you can see an example of this filled out [here](https://docs.google.com/a/applicaster.com/spreadsheets/d/1qD-jAR6FmUxyCuF8TP1eInoZGz69VRv95RXj4fGhiBA/edit?usp=sharing)
3. Integrate into development
    * As developers work on building the features for which each event corresponds, make sure they also build the tracking as outlined in your document.
    * Whether you test via unit-testing, QA, or some other model, make sure to include measurement in your testing process. If you have questions on how to do so, Assaf Sagee and myself are available to provide guidance.
4.  Document upon release for stakeholders
    * Include any new events and properties in your release notes
    * Notify me that the events have passed testing and provide me with the file you made in step 2
        * I will merge that file with the master where all other events and properties are held
    *  Update the documentation center where you maintain your events and properties
     * If you don't already have an existing product analytics where this document exists, create one.
        * You can find a template [here](https://drive.google.com/a/applicaster.com/file/d/0By6c4nYJWWA0TXpTVnNYeGtnSnM/view?usp=sharing)
        * For an example of an existing one for the Feed, [click here](http://developer.applicaster.com/docs/public/feed-analytics)
        * This documentation differs from the file created in step 2 in that it is self-contained to your product or feature, and is for a more public audience. As such, it is more descriptive than technical in nature.
5. Analyze and Iterate
    * Look at the data of the product once it has been used, and integrate the results into your strategy/plan for the next iteration
        * Unless the data and broader circumstances lead you to believe the product should be deprecated or not undergo another iteration

Measurement is critical for our customers to get the most out of our products, and for us to make responsible, informed decisions about how to continuously improve upon our products and features. I'm always happy to provide guidance on how to get the most out of your data.

#### Start collecting and enjoy!