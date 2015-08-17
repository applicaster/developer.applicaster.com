# On-Screen Graphics Reports Export

## Overview

The Applicaster Widgets provide end-users with interaction and engagement based around
the broadcaster's content. The reports of these interactions can be easily exported to
on-screen graphics providers. This document gives background to our widgets product
and explanation as to how to use and export the reports. 

##### Questionnaires 

Questionnaires can either be of type Quiz or Poll.

Once a Questionnaire is defined 'Questions' can be added to it.

Question answer can be of either type string or numeric.     
 

![image](/assets/questionnaires-cms-ui.png) 

Once the reports are calculated and stored in Applicaster CMS ,they are sent to an external XML.

Please contact one of Applicaster representative to get your widgets XML reports feed.

## Questionnaires XML feed reports Structure: 

```
<root xmlns:media="http://search.yahoo.com/mrss/" 
	  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<item>
    <guid>question_example_1_unique_id</guid>
    <title>
        question_example_1 Title
    </title>
    <description>
            | Answer   | Count     |Percentage | 
            | answer_1 | 7178      | 83.14%    | 
            | answer_2 | 344       | 3.98%     | 
            | answer_3 | 1112      | 12.88%    | 
    </description>
    <pubDate>2015-03-28 17:07:17 UTC</pubDate>
    <media:thumbnail width="66" height="49" 
                  url="http://assets-production.applicaster.com/applicaster-logo-66x49.png"/>
    <results>
        <result answer="answer_1" count="7178" percentage="83.14%"/>
        <result answer="answer_2" count="344" percentage="3.98%"/>
        <result answer="answer_3" count="1112" percentage="12.88%"/>
    </results>
</item>

<item>
    <guid>question_example_2_unique_id</guid>
    <title>
        question_example_2 Title
    </title>
    <description>
        | Answer | Count | Percentage |
        | 0      | 0     | 8.83%      |
        | 25,000 | 0     | 10.79%     |
        | 50,000 | 1     | 12.11%     |
        | 75,000 | 0     | 14.45%     |
        | 100,000| 0     | 53.83%     |
    </description>
    <pubDate>2014-10-22 07:10:55 UTC</pubDate>
    <media:thumbnail width="66" height="49" 
                  url="http://assets-production.applicaster.com/applicaster-logo-66x49.png"/>
    <results average="73416">
        <result answer="0" count="234" percentage="8.83%" 
                numeric_value="0.0"/>
        <result answer="25,000" count="286" percentage="10.79%"
                numeric_value="25000.0"/>
        <result answer="50,000" count="321" percentage="12.11%" 
                numeric_value="50000.0"/>
        <result answer="75,000" count="383" percentage="14.45%" 
                numeric_value="75000.0"/>
        <result answer="100,000" count="1427" percentage="53.83%" 
                numeric_value="100000.0"/>
</results>
</item>
....
</root>


```


**`<item>` definition :**


* `<guid>` - unique ID for each question
* `<title>` - The question title.
* `<description>` - The question itself, shown on the UI view.
* `<pubDate>` - The last updated date of the question
* `<results>` - The question possible `<result>` options 
* `<result>` - Contains the following attributes :
	* percentage - 	The accumulated percentage for the specific answer
	* answer - The result title answer in string format 
	* count - total voting count number for this answer
	* numeric_value - (optional) When an average result is needed to be calculated, a numeric value can be applied for each answer (as the example above)


## Supported OSG platforms 


This XML feed reports can later be fed into an on screen graphics software, where broadcasters can monitor and moderate what goes on air.

The Polls & Quiz reports XML has been successfully integrated with the VizRT, Orad, Vertigo  , RossVideo (Xpression) and Miranda systems.
