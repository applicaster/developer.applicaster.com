**Motivation**

Allow different set of activity navigation configurations, for example using a side menu, or using a tab bar.

**Project structure**

This module exposes an interface named `RootActivityManager` to be used by the application as a singleton.

The app selects the required implementation (from external configuration), then creates the related concrete RootActivityManager. For example if the app wants to use a side menu for navigation, it should choose `SideMenuRootActivityManager`.

**Usage**

Once a `RootActivityManager` is created, first of all the `preloadContent` method should be called. It takes a listener as an argument which is notified upon completion. During the preload, all the navigation collections which the selected manager requires are fetched. The collections are parsed into the `NavigationMenuItem` data type.

After the loading done, the app creates a main activity. The activity needs to access the `RootActivityManager` instance and call the method `getContentConfigurator`. The `ContentConfigurator` allows the activity to build the actual layout which includes the navigation components, like a top bar and/or the side menu.

The content configurator expects a `DataSource` as one of the arguments during configuration. The data source receives the `NavigationMenuItems` created earlier and needs to return a `NavigationMenuItemViewHolder` for each item. This navigation view holder can either contain an `ImageHolder` object (usually displayed in a list like for the side menu), or a custom `View` (for example the Feed and CrossMates top bar items).

The data source also needs to handle navigation clicks and create the relevant fragments. Once a fragment created, the content configurator exposes a method named `addFragment` which actually adds it to the layout. When adding the fragment it can be decided to add it as an internal fragment, which means a back button is shown. Back button presses are handled internally by the `RootActivityManager`, the data source will notified to finish the activity in case the back stack becomes empty.

**Other activities**

Although it's named a RootActivityManager, this class is capable to configure any activity. The content configurator receives the parent view as an argument, so as long as the child views ids remain consistent according to the root activity base layout, the navigation components will be created. This allows flexible and non-redundant design. In case it is required that only the root activity shows a side menu and a top bar, and all other activities show just the top bar, it is possible to add only the top bar ViewStub to the layout.