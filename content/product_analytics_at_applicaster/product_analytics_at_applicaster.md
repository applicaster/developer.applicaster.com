# Product Analytics at Applicaster

> “Continuous measurement and monitoring will help you continuously improve your app as it progresses into more mature releases.” - Pierre-Luc Simard (CTO of Mirego)

Consumer products (like the Feed) and customer products (like Starlight) involve user interaction that can be measured to better understand and improve our product offering. In the case of consumer products, this data can also help our customers make better use of our products.

This section outlines the process for ensuring we get to take advantage of the benefits of product analytics. When you kick off the planning of a new product or feature, reach out to me (Yoni O) and we’ll go through this procedure together for as long as you’d like.

Just like our products, our processes at Applicaster should be agile and iterative, so I am happy to receive feedback for how to improve this procedure and associated documentation.

### Steps of Procedure

There should be a column in your Kanban Board for *Defining Measurement* right before your *Ready for Dev* column. When the first ticket for your new product or feature goes into that column, please make sure to follow the first three steps of this procedure. I've created a [template product analytics worksheet](https://docs.google.com/a/applicaster.com/document/d/1hrPiwmUYa1DpZdrfSb2zb5H9h2fXOg5O829YXVAsOAs/edit?usp=sharing) for you to work through the steps of the analytics procedure. I hope it proves useful in guiding you through the procedure:

1. Identify your goals
    * Defining measurement should always be goal-oriented. Before starting development, you need to ask yourself critical questions that not only will help you identify what to measure, but also will help you to develop a sharper focus on the business aims of your initiative.
    * Fill out [the worksheet](https://docs.google.com/a/applicaster.com/document/d/1hrPiwmUYa1DpZdrfSb2zb5H9h2fXOg5O829YXVAsOAs/edit?usp=sharing) by outlining your goals in response to the following questions:
        * How can I tell that this product/feature is succeeding?
        * What questions will I want to be able to answer about how the product is being used so that I can continue to iterate more effectively on it?
            * Identify what you’d want to understand before building your next iteration of this product.
        * If you’re building a consumer product, identify what questions your customers would want to ask about how the product is being used in order to:
            * Measure their success
            * Improve upon this success
            * Adjust their own strategy in using the product
            * Adjust content or promotion strategy
            * Understand their end users betters
            * Understand the product itself better
    * In many cases, it is better not to assume. You may want to actually ask the customers themselves.
    * If you have any goals that do not arise in response to these questions, make sure to include them in the worksheet
    * We can always work through this together. You can see an example of this process in the first section of the example file [here](https://docs.google.com/a/applicaster.com/document/d/1fCqyPwQ0iWl6LvkN-026ZxqKundf4oP4A4pPxWTm2Rk/edit?usp=sharing)

2. Map Goals to Solutions
    * Go through your list of goals, mapping each to a solution for how to address each goal. 
    * Often, the solution will require that you have events and event properties in place to track related behavior
    * You can use [this template](https://docs.google.com/a/applicaster.com/spreadsheets/d/1lFJC3-LLSrdQTW1rv0uN6C0KzdiAMy5mOr2jirNQPQg/edit?usp=sharing) to document the events.
        *  Please make a duplicate and work in that, rather than in the template directly
        *  We can go through this process together and you can see an example how the file can be filled out [here](https://docs.google.com/a/applicaster.com/spreadsheets/d/1qD-jAR6FmUxyCuF8TP1eInoZGz69VRv95RXj4fGhiBA/edit?usp=sharing)
    *  Other goals might need solutions which are not standard events and event properties. For example, if you want to examine behavior of subscribed users vs trial users, you will need to make sure there is user level property describing the type of user. 
    *  You can find an example of how goals are mapped to solutions within the worksheet in the second section of the example file [here](https://docs.google.com/a/applicaster.com/document/d/1fCqyPwQ0iWl6LvkN-026ZxqKundf4oP4A4pPxWTm2Rk/edit?usp=sharing)
3. Summarize Your Solutions
    * At the end of the Product Analytics Worksheet, list the solutions you came up with.
    * Make sure that you copy and paste those solutions into the relevant tickets associated with your product as part of the requirements for each ticket
4. Integrate into development
    * By putting the requirements directly into the ticket, you will be able to help ensure that the developers are tracking everything you need, and your QA processes consider the necessary measurement.
    * Whether you test via unit-testing, QA, or some other model, make sure your testing process takes these requirements into consideration. If you have questions on how to do so, Assaf Sagee and myself are available to provide guidance.
4.  Document upon release for stakeholders
    * Include any new events and properties in your release notes
    * Notify me that the events have passed testing and provide me with the file you made in step 2
        * I will merge that file with the master where all other events and properties are held
    *  Update the documentation center where you maintain your events and properties
     * If you don't already have an existing product analytics document, create one.
        * You can find a template [here](https://drive.google.com/a/applicaster.com/file/d/0By6c4nYJWWA0TXpTVnNYeGtnSnM/view?usp=sharing)
        * For an example of an existing one for the Feed, [click here](http://developer.applicaster.com/docs/public/feed-analytics)
        * This documentation differs from the master file I will merge your events into in that it is self-contained to your product or feature, and is for a more public audience. As such, it is more descriptive than technical in nature.
5. Analyze and Iterate
    * Make sure that you set aside time before the planning of the next iteration to do look at the results of the data you've been collecting. Once you have information on how the product has been used in production, integrate the results into your strategy/plan for the next iteration. 
        * Of course, it is possible that the data and broader circumstances will lead you to believe that the product should be deprecated or not undergo another iteration

Measurement is critical for our customers to get the most out of our products, and for us to make responsible, informed decisions about how to continuously improve upon our products and features. I'm always happy to provide guidance on how to get the most out of your data.

#### Start collecting and enjoy!