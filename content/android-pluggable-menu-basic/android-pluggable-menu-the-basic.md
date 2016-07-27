**RootActivityManager Interface**

This class should be stored as a single instance for the application and be accessible by any required `Activity`

* _abstract public void setConfiguration(Map<String, Object> configuration)_

  In this method the class should parse the external configuration which related to the new manager. For example `"side-menu-type" = "drag-and-drop"`. Since navigation providers like the top bar have a Configuration class, it's best to create a new inner class inside the manager and store the parsed values as typed members, while also initialising the navigation providers configurations.

* _abstract public void preloadContent(RootActivityManager.PreloadListener preloadListener)_

  In this method the manager needs to load all the required collections. A helper class named `CollectionLoadingSynchronizer` can be used to easily notify the `preloadListener` once all the collections retrieved. The collections then need to be parsed by using the `Parser` helper class into NavigationMenuItems and stored as a member for later usage.

**NavigationProvider**

There are a few default navigation providers already in the project. Like a `SideMenu`, or a `TopBar`. In case the new `RootActivityManager` requires a different provider, it is possible to create the new class while implementing the `NavigationProvider` interface. The creator should implement the `NavigationProviderListener`.

This class should also define an inner static configuration class to be filled by the creator, then the constructor of the provider needs to get the configuration as an argument.

* _public abstract View configureContent(ViewStub viewStub)_

  The provider should inflate the `ViewStub` according to the specified configuration, then return the new `View`. Inside this method the provider should also call the `listener` to get a list of `NavigationMenuViewHolders` and prepare them for presentation.

* _public abstract void selectNavigationMenuItem(NavigationMenuItem navigationMenuItem)_

  The provider should handle a manual, not user initiated, item selection. During the process the listener should be called once the selection actually performed (as in the user initiated flow).

* _public abstract void onNavigationMenuChildrenLoaded(NavigationMenuItem parentNavigationMenuItem, List<NavigationMenuItem> children)_

  Called as a result of asking the listener to `loadChildNavigationMenuItems`, once the listener finished loading additional on-the-fly data related to the requested navigation item. The provider should convert them to a list of `NavigationMenuItemViewHolders` and present it.

**ContentConfigurator**

This is an inner interface of the new `RootActivityManager`. Each manager has a unique implementation.

* _abstract public int getContentViewResourceId()_

  Return the base layout id the manager uses. It is then accessed by the parent activity to be configured.

* _abstract public void setTitle(String title)_

  Each implementation should be able to set the title according to its internal layout structure and displayed navigation providers (like a top bar)

* _abstract public void configureContent(Activity activity, FragmentManager fragmentManager, LayoutInflater layoutInflater, View contentView)_

  The manager needs to use the previously stored `NavigationMenuItems` and create the required `NavigationProviders` (for example the side menu, a top bar, or maybe a tab bar).

  Note that although this class is named RootActivityManager, it should be capable to configure any `Activity`, with partial child view ids. For example the main activity will want to display both a side menu and a top bar, while inner spawned activities want to display only the top bar. So before creating a navigation provider, it should be validate that the relevant `ViewStub` exists.

* _abstract public void addBackButton()_

  Allows the manager to add a back button according to current layout and displayed navigation providers (like a top bar). Can be requested either by the parent activity, or when presenting an inner fragment. 

* _abstract public void handleBackPress()_

 The manager should either decide to finish the parent activity by calling `dataSource.finishActivity()`, or to pop the last inner fragment from the back stack.

* _abstract public void addFragment(Fragment fragment, boolean isInner, NavigationMenuItem.Type type)_

  The parent activity calls this method on the `ContentConfigurator` when a navigation change occurred (it will probably happen after the configurator itself will notify the `DataSource` that the user clicked on `NavigationMenuItem`. It's up to the configurator to use the `FragmentManager` (sent as an argument during `configureContent`) to add the fragment to the layout. It is probably best to use the `isInner` argument and in case it is `true` add a back button, and in case it is `false` clear the back stack.

**NavigationProviderListener**

  Every `ContentConfigurator` should also implement the `NavigationProviderListener`. It mostly allows to handle events from the user by passing them to the `DataSource`.

* _NavigationMenuViewHolder getNavigationMenuViewHolder(NavigationMenuItem navigationMenuItem)_

  The provider gets the `Views` to be presented, each navigation item is checked by the listener and according to its type either a custom `View` is returned in the holder, or an ImageHolder (internal data type which allows to present Applicaster data types like a `Collection`, `Category`, `Vod`, etc). It is possible that `null` will be returned, in that case it is up to the `ContentConfigurator` to create the `View`.

* _void loadChildNavigationMenuItems(NavigationMenuItem navigationMenuItem)_

  There are specific provider implementations where not all the navigation data fetched during the preload phase. Allows the navigation provider to load additional menu items on-the-fly, for example the expandable side menu. Once the listener finishes, the `onNavigationMenuChildrenLoaded` method is called on the provider.

* _void onNavigationMenuItemSelected(NavigationMenuItem navigationMenuItem)_

  The listener is notified that the user selected a navigation item and a new fragment (or Activity) should be presented. This method is also called when an item is selected programmatically using the `selectNavigationMenuItem` method.