# UI Builder Designer Guide

The Zapp Builder defines the visual language of an app by using Supported Components and a Cell Style Family.

A Cell Style Family includes all the cell styles per component the Builder supports. Each Cell Style can hold different types of data, such as video, article, gallery, web page and others.

The following guideline is an ongoing document that will be updated as we continue to develop the builder apps’ visual language. [**Please refer to the Sketch File**](https://drive.google.com/drive/folders/0Bz0Gkizw3hGxRk5PZ2hHYmVPRGM?usp=sharing) when creating a new Cell Style Family.

### Creating New Family

When you would like to design a new Cell Style Family, please follow the following guidelines:

1. Design should be based on the smallest screen sizes that we support, since developers are basing the size adaptation to bigger scale screens on the basic size:
   1. Iphone: 320 x 568 px
   2. iPad: 1024 x 768 px
   3. Smartphone: 360 x 640 dp \(mdpi\)
   4. Tablet: 1280 x 800 dp
2. Make a huge effort to create the cell style of iPhone and iPad the same in proportions, and use the same assets. The same goes for the Smartphone - Tablet. You would like to manage as minimum of styles and assets.
3. Define which types of data are populating which cell styles. Accordingly design the different parameters per data type. \(Articles have publish date, whereas Category don’t for example\).
   1. List all the functional and informative icons that you’d like to use per data type and per cell style. \(some cell styles are too small to show all the buttons you have available, and you’ll need to choose\)
4. Design Assets with asset bounds that are bigger than the assets, at least 2px from all sides. \(We are well experienced that this way the assets looks better in the app\)
5. If you’ve used gradients on the cell, export it as well as an asset.
6. Assets should be exported in several dimensions:
   1. iOS: 1x, 2x, 3x
   2. Android: 1x, 1.5x, 2x, 3x
7. The developers should know how to create the cell style for different screens, that’s why we should hand them the basic smallest size, and from that one they are scaling it. For this reason, designers should instruct exactly how to arrange the elements in the cell - which element is the anchor, which are dependent on which. What should stay fixed, what should scale proportionally? For example:

![](/assets/cellstyle_new.png)

* When the cell scales - does the ‘play’ icon stay in the same distance from the edge of the image or is it positioned proportionally to the cell’s scaling?
* Same goes to the ‘lock’ icon, the ‘channel’ icon, and the ‘duration’ label.
* Is the distance between the labels and assets in the bottom side fixed while scaling, or is it changing proportionally to the cell’s scaling? Same for the distance from the most top and bottom of the view.

### ![](/assets/bestpractice-icon_35.png) Naming Convention

Keys for assets and styles shouldn’t be specific, but general, so that they can be reused. Follow these guidelines:

1. All in small letters \(no capitals\)
2. Use underscore between words
3. White Label Screens: screen\_function\_\_\_state\_number \(ie.: epg\_backtonow\_pressed\)
4. Component based Screens: function\_state\_number\_ \(i.e.: \_play\_1, favorite\_selected\_2\)
