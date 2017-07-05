
## iOS UI Builder

The purpose of this document is to explain how to work with ZappLayoutComponentsSDK-iOS

#### ZappLayoutComponentsSDK

The [ZappLayoutComponentsSDK](https://github.com/applicaster/ZappLayoutComponentsSDK-iOS) is a wrapper on `ComponentsSDK` that allows to use Zapp-UIBuilder API with existing ComponentsSDK structure.

The creation of a screen with components is very fast, and allows a wide range of flexibilities to each type of component.

The main idea was to simplify the complicated structure of the Components SDK and give the ability to easily create apps from prepared templates that are integrated with the ZappUI Builder, known as Layouts.

The ZappLayout is a submodule of the `Zapp-iOS SDK` that was integrated as a new layer between Zapp-iOS and ComponentsSDK to allow the use of the new API and ignore the old style components SDK screen jsons.

***
##### High level logic

1. Create components and layouts for the `Families`
2. Layouts should be uploaded to the Zapp-builder manifest to be developed soon by Zapp server developers. Once the manifest is done, you will publish each layout / component manifest to the Zapp builder. Currently the Zapp server developers will define new layouts / components.
3. In the Layout field of the app settings in Zapp, use `ui_builder` to enable UIBuilder.
4. Zapp users can create screens and select from available components, cell style and layouts defined in `Families`
5. Components should be filled with DS in case the screen is Root. In case they are Connected screens, they must be skipped.
6. After screens will be created. ZappBuilder will generate a URL with a JSON API for ZappLayoutComponentsSDK client side.
7. During the loading of the app, Zapp-iOS will check if `ui_builder` is enabled. If Yes, ZappLayoutComponentsSDK will download the API JSON and parse it in ZLModels.
8. Once the app will finish loading, during the screen creation process, ZLGenericViewController will try to find in ZLScreen models the relevant screen with the its ID. If the ID is defined (either by ‘screen_type’ or ‘ui_tag'), the screen will be created, otherwise the app will use the old components sdk logic to create the screen from AppDefine.json.

***
##### Understanding Families
A Family defines the rules of component based screens, per screen: How a component should fill the screen, interitems spacing, line spacing, insets. The easiest way to explain its necessity is by looking at the behavior of UICollectionViewFlowLayout. FlowLayout defines  the cells inside a collection. A Family defines the rules that will be sent to FlowLayout of main UICollection. It means that Family is defined per screen.
Example:
iPhone non retina width 320px.
One Family is used per screen.
inset left = 10
inset right = 10
interitem spacing = 10
line spacing = 10
When you will create a style for existing or new component, you should create a style following the Family it is related to.
Two simple Cell styles.
One should be full screen width. Second should have width of 2 cells in a row.
The parameters of the family cell style should be written next to the width
1. 300 X SomeHeight (320 - leftInset - rightInset)
2. 145 X SomeHeight ((320 - leftInset - rightInset - interitemSpacing) / 2)

##### Non-Connected screens VS Conected screens
UIBuilder uses 2 types of screens: Non-Conneccted screens and Connected.

`Non-Connected` screens - first level screens represent root screens. In this type of screen the data source should be defined per components that is added in the UIBuilder.

`Connected` screens - screens that open from non connected screens or other connected screens. The difference is that the DS should not be added to the components. The Connected screen will load sender DS and populate children components one by one by the parent component.
Example: senderModel as APCollection DS
senderModel has 2 child items: APCategory and APCollection.
Screen is using two components: Carousel and Grid
In this example, the first child of the sender model will go to carousel, and the second grid to APCollection

##### Screen Types
A new key is added to APCategory and APCollection, called `screen_type`. It is the analogue function of the `ui_tag` which was used for ComponentsSDK to open generic screens. We're not using 'ui_tag' since `ui_tag` is unique and was created for other purposes.
`screen_type` is used to create ui_builder screens. `sreen_type` is not unique and the same value can be added to the different Models.
For UIBuilder screens `ui_tag` should no be used, other than for old ComponentsSDK needs, such as defining White Label Screens, like EPG or Settings.

Connections: Each screen of the UIBuilder has the `screen_type` param. When a user creates a new screen in the UIBuilder, this param will be generated. This parameter is unique per app.
Screen Type should be used to map screens with DS.
Param from UIBuilder should be copied and pasted to the relevant models in Applicaster2 to the `screen_type` field, which will open this screen.

##### SectionCompositeViewController
The Main component that is used for all ZappLayoutComponentsSDK as the top component is `CASectionCompositeViewController`.
The Section composite is working in a similar way to the old `composite` component.
The main difference of this component is that for each DS, it is using a separate section.
The rest of the logic remains the same: It has a two level loading and it is mapping children to components.
