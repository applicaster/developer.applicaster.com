# Success Measurement and Agile Development

Each PSP and user story in the Applicaster development process must have a business value and meaningful ROI. As such, there should be some measure for success. It is incorrect to view something as "Done" simply because it is released. You must be able to determine if the product or feature, in production, has succeeded.

In an effort to keep our focus on success and to integrate measurement more fully into the Applicaster culture, this document outlines how to incorporate success measurement into our agile development processes.

### Success Measurement on the PSP or Epic level

1. Identify a *Standard for Success*, or "*SFS*", in the feature description of the Product Roadmap Tool

    * Every team has a backlog of ideas, features, and products that they'd like to develop. When a team determines that they plan to do one of the ideas in their backlog, the PM or PO is supposed to enter an item in the Product Roadmap Tool documenting the PSP (or Epic)
    * When adding an item to the Product Roadmap, make sure to include an *Standard for Success*
        * The *SFS* should aim to serve as a method of determining whether or not the business value was fulfilled and the PSP was a success.
        * It must be something where the answer to whether or not it succeeded is not up to your subjective judgement, but a clear definition. Clear does not necessarily mean tightly defined. It can still be as broad as something such as "internal customers sign-off on the delivery", or "support confirms it decreases the support load." 
        * However, when possible, be more specific and quantifiable (i.e. "Average Feed Session Duration increases by at least 25%"). Try to determine what threshold is required for you to reach in order to feel like your user story was a success.
        * You can check out the features in the Advertising & Analytics section of the Product Roadmap for examples.
        * If you cannot determine a clear way of measuring whether the business value was delivered, you should consider using a survey or feedback mechanism asking the stakeholders to identify if the business values you were aiming for were reached. This is also a great way to get ideas on how to improve the product/feature.
            * If you are interested in using this approach, reach out to Yael Oron and myself (Yoni O) for help.
            
2. Identify a trigger for when to measure your *SFS*
    * Will it be based on a certain time frame after release?
        * If so, will it be once? At regular intervals?
    * Will it be upon first use during a show? After being used across a full season?
    * The trigger will likely depend on the business value and *SFS* itself, but identifying a concrete trigger is critical to ensuring you don't continue to put off measurement until it is no longer relevant.
    * If you plan on iterating, you should aim for shorter measurement intervals in order to get quicker feedback.
    * Set a recurring time in your calender to check if any of your triggers have been met.
        * I recommend setting this time to be a day or two before your retrospective.
3. Measure and React        
    * When your trigger is reached, measure your *SFS* and analyze the results
        * This is also a good time to review the metrics associated with the goals you identified in the [Product Analytics Procedure](http://developer.applicaster.com/docs/internal/product_analytics_at_applicaster)
        * I am happy to help you through this process
    * In your following retrospective, it can be valuable to raise and discuss why you did or did not meet your own standard and to learn what success you can replicate and what shortcomings you can amend in the development process itself.
    * The results may cause you to iterate on the product, build a complementary feature, deprecate the product, or pivot approach and look for a new solution altogether to deliver on the business value you were aiming for. Consider all of these options when analyzing the results.
    * If you are not iterating, determine if you need to continue measuring this epic or can consider the measurement phase for it closed.

### Success Measurement on the User Story Level

User stories are handled in Kanban Boards at Applicaster. Like PSPs, user stories are also intended to be ROI positive and have their own functional deliverable. This means they too should have a *Standard for Success*. Additionally, during the [Product Analytics Procedure](http://developer.applicaster.com/docs/internal/product_analytics_at_applicaster), you will identify a series of goals you have for your product and you believe your customers will have, and these have implications for how to handle measurement within your Kanban process as well.

1. Putting a ticket in the **Defining Measurement** Column
    * Place a column titled **Defining Measurement** before your **Ready for Dev** column in your Kanban Board. This column reminds you to follow two tasks:
        * First, remember to follow the Product Analytics Procedure
            * When the first ticket related to your PSP or Epic enters this column, make sure to follow the first three steps of the [Product Analytics Procedure](http://developer.applicaster.com/docs/internal/product_analytics_at_applicaster). 
            * This should have the result of your putting product analytics requirements in this ticket as well as any other tickets that have not reached this stage of the Kanban yet.
            * When any new tickets enter the **Defining Measurement** column, make sure they have existing analytics requirements in place. 
                * If not, perhaps this is a tech task where product analytics are not relevant. Otherwise, you should ask yourself if it is the first ticket associated with a product epic or PSP, in which case you should follow the first three steps of the procedure.
        * Second, identify a *Standard for Success* for the user story
            * Just because a user story passes QA doesn't mean the ROI, or the whole point of the user story, will actually be met. Every user story, even technical tasks, can have an *SFS* to help your team stay focused on the ROI. 
            * Whereas the PM and/or PO will set the *SFS* on the PSP/epic level, I recommend having developers maintain accountability for the *SFS* of the user stories, with your guidance. This will help them feel connected to the greater goal, keep a focus on business value and ROI, and make them a part of the measurement culture here at Applicaster.
            * If you find your developers are forgetting about this step, you may consider integrating it into your dailies or grooming processes. 
            * Here are some guidelines for how to define the *SFS* of a user story:
                * When possible, make the *SFS* tied to the delivery of a clear business value in the same way as described in *Success Measurement on the PSP or Epic Level*.
                *  When not possible to tie to business value, make the *SFS* a clear indication that the functional devlierable was effectively achieved for the actual users (i.e. end users, customers, PMs) in a production environment, as opposed to being functional in a development setting and ready for release. 
                * Try to be specific and quantifiable when you can (i.e. "ingestion error decreases by over 50%"). Try to determine what threshold is required for you to reach in order to feel like your user story was a success.
                * Identify a trigger for when you should determine whether or not the user story succeeded and include it in the definition of the *SFS*
                    * In determining a trigger, you can use the same guidelines outlined in the section *Success Measurement on the PSP or Epic Level*    
            * You may need to create new analytics events or requirements in order to ensure the *SFS* can be measured and verified. If so, make sure to update your worksheet, as outlined in the [Product Analytics Procedure](http://developer.applicaster.com/docs/internal/product_analytics_at_applicaster).
2. Moving a ticket to **Ready for Dev**
    * Before moving a ticket to **Ready for Dev**, make sure: 
        * Analytics requirements are in place
        * A clear and verifiable *SFS* is defined
    * Otherwise, clearly you'll need to put these things in the ticket as described above.
3. Moving a ticket out of **Under Review**
    * Typically, when a ticked is moved out of **Under Review**, it goes into the **Done** column. This is a mistake.
    * As described above, this keeps the company focused on releasing new features, rather than providing business value and ROI. 
    * I recommend creating a new column in between **Under Review** and **Done** titled **Out of Dev**
    * This column, can have two lanes:
        * Released - In Measurement
        * Impeded / On Hold
    * Clearly, **Impeded /  On Hold** is not tied to the measurement process, but it is a realistic scenario that I think falls more appropriately under **Out of Dev** than **Done**, considering the auto-archive functionality in the **Done** column actually creates some risk around items you do intend to come back to.
    * When you've released a card, place it at the bottom of the **Released - In Measurement** lane
4. Review in your retrospective
    * I recommend splitting the **Done** column into two lanes:
        * Succeeded
        * Did Not Succeed
    * In preparing for your retrospective, organize the tickets in your **Released - In Measurement** lane chronologically so that the ones with the earliest triggers appear at the top. Identify if there are any tickets whose triggers have been met.
    * For the tickets whose triggers have been met, determine if any require time consuming analysis. If so, conduct this analysis or ask the assigned developer to do so. I'm more than happy to help with this process.
    * During the retrospective, look at each relevant ticket and determine if the ticket meets the *SFS*.
        * If the ticket meets the *SFS*, move the card to the **Succeeded** lane. You can now say it's done :)
        * If the ticket does not meet the *SFS*, determine what to do:
            * You may want to choose to send it back to **Ready for Dev** to be worked on further, or perhaps even further back to planning/grooming if you find the user story was not designed well enough to meet the standard.
            * You may determine that it is not worth the ROI to continue investing work in this user story and choose to accept that it did not meet the *SFS*. If you do so, move the card to the **Did Not Succeed** lane with a note explaining your analysis. For example:
                * You may feel that the card provided value, but the additional work would be too costly/time consuming to justify the incremental value required to reach the standard.
                * You may feel that the development was indeed a failure.
                * It is possible your team misjudged the practical *Standard For Success*, and that the standard needs to be reassessed. It is a good lesson to learn from, but you should not change the standard post-facto. Just document this conclusion in the card and put it in the **Did Not Succeed** lane. 

____________________________________

Feel free to make adaptations to this process that more effectively fit your team. Just as we would with a product, I plan to iterate on this document as we learn from experience, and would welcome any feedback for changes to the process.

I believe that when we're focused on success and tied to business value, we find our work more fulfilling. I hope this document helps you and your team find more fulfilliment at work while driving greater ROI.
