# Product Analytics Procedure

> “Continuous measurement and monitoring will help you continuously improve your app as it progresses into more mature releases.” - Pierre-Luc Simard (CTO of Mirego)

Consumer products (like the Feed) and customer products (like Starlight) involve user interaction that can be measured to better understand and improve our product offering. In the case of consumer products, this data can also help our customers make better use of our products.

This section outlines the process for ensuring we get to take advantage of the benefits of product analytics. When you kick off the planning of a new product or feature, reach out to me (Yoni O) and we’ll go through this procedure together for as long as you’d like.

Just like our products, our processes at Applicaster should be agile and iterative, so I am happy to receive feedback for how to improve this procedure and associated documentation. Later iterations of this documentation will include more visual elements.

### Steps of Procedure

I recommend going through this process when you are brainstorming and planning your product/feature. Defining your goals, and how to measure them, usually leads a sharper connection between your requirements and your business goals, and often even leads to new requirements. 

As a fail-safe, you should maintain a **Defining Measurement** column in your Kanban Board right before your **Ready for Dev** column. If a ticket enters that column and doesn't have analytics requirements in place, please make sure to follow the first three steps of this procedure. 

I've created a [template product analytics worksheet](https://docs.google.com/a/applicaster.com/document/d/1hrPiwmUYa1DpZdrfSb2zb5H9h2fXOg5O829YXVAsOAs/edit?usp=sharing) for you to work through the steps of the analytics procedure. I hope it proves useful in guiding you through the procedure:

1. Identify your goals
    * Defining measurement should always be goal-oriented. Before starting development, you need to ask yourself critical questions that not only will help you identify what to measure, but also will help you to develop a sharper focus of the business aims of your initiative.
    * Fill out [the worksheet](https://docs.google.com/a/applicaster.com/spreadsheets/d/117p3q_W3yzZrTfeHViEYGhx_FUkeidoHUNJRN5MILpM/edit?usp=sharing) by listing your goals in response to the following questions:
        * ***Product Success Goals***
        * "How can I tell that this product/feature is succeeding?"
            *   I recommend putting these goals in question form 
                *   i.e. Do users of this feature launch the app more frequently? Do people watch video after using this feature? 
            *   Google's HEART categories can be a useful guideline for identifying goals.
            *   HEART stands for:
                * Happiness
                * Engagement
                * Adoption
                * Retention
                * Task Completion
            * You can learn more about HEART [here](https://library.gv.com/how-to-choose-the-right-ux-metrics-for-your-product-5f46359ab5be#.lwpjv7nbl) and [here](http://www.dtelepathy.com/ux-metrics/#intro)
                * Please note that while HEART is a great method for stimulating ideas about what goals you have, I don't recommend the Goals-->Signal-->Metric approach. 
                * Rather, I recommed using the framework to identify goals with the end-users in mind, placing those goals in the worksheet, and moving on to the next questions to identify further goals:
        * ***Iterative Planning Goals***
        * What questions will I want to be able to answer about how the product is being used so that I can continue to iterate more effectively on it?
            * Identify what you’d want to understand before building your next iteration of this product.
            * For example, if you are thinking about deprecating a feature, you will of course want to check how many users interact with that feature, and if those users move on to be more engaged. 
            * Or if you think that a certain area may come off as clickable even though it is not, you may want to track if users try to tap on it.
        * ***Client Goals***
        * If you’re building a consumer product, it is important that you identify what questions our clients would want to ask about how the product is being used in order to:
            * Measure their success
            * Improve upon this success
            * Adjust their own strategy in using the product
            * Adjust content or promotion strategy
            * Understand their end users betters
            * Understand the product itself better
        * In many cases, it is better not to assume. You may want to actually ask the customers themselves.
    * If you have any goals that do not arise in response to these questions, make sure to include them in the worksheet.
    * We will work through together the first few times you do this, and afterwards as often as you'd like. For reference, you can see an example of this first step in the example file for Segmented Push found [here](https://docs.google.com/a/applicaster.com/spreadsheets/d/1uco0_oEBIU2SklnjtibaD--yTt2fjF10XpYbzM9hXI8/edit?usp=sharing)

2. Map Goals to Solutions
    * Go through your list of goals, mapping each to a solution for how to address each goal. 
    * Often, the solution will require that you have events and event properties in place to track related behavior
    * You can use [this template](https://docs.google.com/a/applicaster.com/spreadsheets/d/1lFJC3-LLSrdQTW1rv0uN6C0KzdiAMy5mOr2jirNQPQg/edit?usp=sharing) to document the events.
        *  We will go through this process together and you can see an example how the file can be filled out [here](https://docs.google.com/a/applicaster.com/spreadsheets/d/18spieHHZYJDEN9LCxXlBiHCmd4SzpqhQ3ZIJNvwzJAA/edit?usp=sharing)
    *  Other goals might need solutions which are not standard events and event properties. 
        *  For example, if you want to examine behavior of subscribed users vs trial users, you will need to make sure there is a user level property describing the type of user.
    *  Like all skills, mapping goals to measurement solutions will get easier with practice, and you may have to rely on me when you're not sure how to measure your goal, but with time you will find that identifying goals, and making sure there are solutions in place to measure those goals, will help you to build better products and our clients to use them more effectively. 
    *  For reference, you can find an example of how goals are mapped to solutions within the worksheet in the second section of the example file [here](https://docs.google.com/a/applicaster.com/spreadsheets/d/1btYTCuFJz-X9uj4Gsqbk4f0hu4l4SUVGL2_1S8gg10I/edit?usp=sharing)
3. Map Solutions to User Stories
    * In order to ensure your solutions are put into place, you will need to incorporate them into your development requirements.
    * As such, once you've fully identified your solutions, make a list of them. You will find in practice that there are overlaps in your solution column, so it isn't a matter of copying the solutions column from your worksheet.
    * To illustrate, in the Segmented Push example, the list of solutions was:
        * [Segmented Push Events and Event Properties](https://docs.google.com/a/applicaster.com/spreadsheets/d/18spieHHZYJDEN9LCxXlBiHCmd4SzpqhQ3ZIJNvwzJAA/edit?usp=sharing)
        * Once JS-2-Morpheus API is built, send events and properties through Morpheus
        * Once User Properties are supported, send user property of "Segmented Push User" with possible values of "Yes" or "No"
    * Many events will be associated with relevant user stories for your product. Make sure to go through all of your events and include them in your relevant user stories, linking to the file you created.
    * For the remaining solutions, either copy and paste those into relevant tickets, or when more appropriate, create a separate ticket just for them.
4. Integrate into development
    * By putting the requirements directly into your tickets, you will be able to help ensure that the developers are tracking everything you need, and that your QA processes consider the necessary measurement.
    * Whether you test via unit-testing, QA, or some other model, make sure your testing process takes these requirements into consideration. If you have questions on how to do so, Assaf Sagee and myself are available to provide guidance.
4.  Document upon release for stakeholders
    * Include any new analytics in your release notes
    * Notify me that the events have passed testing and provide me with the file you made in step 2
        * I will merge that file with the master where all other events and properties are held
    *  Update the documentation center where you maintain your events and properties
     * If you don't already have an existing product analytics document, create one.
        * You can find a template [here](https://drive.google.com/a/applicaster.com/file/d/0By6c4nYJWWA0TXpTVnNYeGtnSnM/view?usp=sharing)
        * For an example of an existing one for the Feed, [click here](http://developer.applicaster.com/docs/public/feed-analytics)
        * This documentation differs from the master file I will merge your events into in that it is self-contained to your product or feature, and is for a more public audience. As such, it is more descriptive than technical in nature.
5. Analyze and Iterate
    * Make sure that you set aside time before the planning of the next iteration to look at the results of the data you've been collecting. Once you have information on how the product has been used in production, integrate the results into your strategy/plan for the next iteration. 
        * Of course, it is possible that the data and broader circumstances will lead you to believe that the product should be deprecated or not undergo another iteration

Measurement is critical for our customers to get the most out of our products, and for us to make responsible, informed decisions about how to continuously improve upon our products and features. I'm always happy to provide guidance on how to get the most out of your data.

#### Start collecting and enjoy!