**Welcome**

This tutorial will instruct you how to create new Root Activity Manger implementation.
Make sure you read the other pages that explain the project structure and base classes.

**TabBarRootActivityManager example**

* First of all we create a new class and name it `TabBarRootActivityManager`.

* Make the class extend `RootActivityManager`.

* For this tutorial, implementing the new `RootActivityManager` will be split into a few parts.

* First part is creating a new class called `TabBar` which extends `NavigationProvider`:

  ```java
  public class TabBar extends NavigationProvider implements TabHost.OnTabChangeListener {
    private NavigationProvider.Listener listener;
    private TabBar.Configuration configuration;

    private TabHost tabHost;

    public TabBar(TabBar.Configuration configuration, List<NavigationMenuItem> navigationMenuItems, NavigationProvider.Listener listener) {
      this.listener = listener;
      this.configuration = configuration;
      this.navigationMenuItems = navigationMenuItems;
    }

    @Override
    public View configureContent(ViewStub viewStub) {
      // Inflate the relevant layout, which includes a `TabHost`
      viewStub.setLayoutResource(R.layout.tab_bar);
      View tabBarLayout = viewStub.inflate();

      this.tabHost = (TabHost) tabBarLayout.findViewById(android.R.id.tabhost);

      this.configureTabs(viewStub.getContext(), this.getNavigationMenuViewHolders(this.navigationMenuItems), this.tabHost);
      return tabBarLayout;
    }

    @Override
    public void selectNavigationMenuItem(NavigationMenuItem navigationMenuItem) {
      this.tabHost.setCurrentTab(navigationMenuItem.position);
    }

    @Override
    public void onNavigationMenuChildrenLoaded(NavigationMenuItem parentNavigationMenuItem, List<NavigationMenuItem> children) {
      // Not relevant for this tabs navigation provider
    }

    private List<NavigationMenuViewHolder> getNavigationMenuViewHolders(List<NavigationMenuItem> navigationMenuItems) {
      List<NavigationMenuViewHolder> result = new ArrayList<>();

      // This helper method converts the `NavigationMenuItems` into `NavigationMenuViewHolder`,
      // by asking the app level to provide custom views
      // In case the implementation does not require such logic,
      // it is possible to skip the conversion, and use the `NavigationMenuItems` directly.
      // Below is another usage example to retrieve images for the tab icons
      if (navigationMenuItems != null) {
        for (NavigationMenuItem navigationMenuItem : navigationMenuItems) {
          NavigationMenuViewHolder holder = this.listener.getNavigationMenuViewHolder(this, navigationMenuItem);
          if (holder == null) {
            holder = new NavigationMenuViewHolder();
          }

          holder.navigationMenuItem = navigationMenuItem;

          if (this.configuration.showIconsOnTabs) {
            holder.defaultImageHolder = new ImageLoader.ImageHolder(navigationMenuItem.category.getImage_json("tab_icon"));
            holder.disabledImageHolder = new ImageLoader.ImageHolder(navigationMenuItem.category.getImage_json("tab_icon_disabled"));
            holder.pressedImageHolder = new ImageLoader.ImageHolder(navigationMenuItem.category.getImage_json("tab_icon_highlighted"));
          }

          result.add(holder);
        }
      }

      return result;
    }

    private void configureTabs(Context context, List<NavigationMenuViewHolder> holders, TabHost tabHost) {
        tabHost.setOnTabChangedListener(this);

        for (NavigationMenuViewHolder holder : holders) {
            TabHost.TabSpec tabSpec = tabHost.newTabSpec(String.valueOf(holder.navigationMenuItem.position));
            tabSpec.setIndicator(holder.navigationMenuItem.title);

            tabHost.addTab(tabSpec);
        }
    }

    @Override
    public void onTabChanged(String tabId) {
      try {
        // Let the listener change the currently displayed fragment
        int position = Integer.parseInt(tabId);
        this.listener.onNavigationMenuItemSelected(this, this.navigationMenuItems.get(position));
      }
      catch (NumberFormatException exception) {
      }
    }

    public static class Configuration {
        public boolean showIconsOnTabs;
    }
}
  ````

* Second part relates to the required data loading, implement the required method inside `TabBarRootActivityManager`, see the inline comments for further information:

  ```java
  @Override
  public void setConfiguration(Map<String, Object> configuration) {
    // Store the map with relevant external configurations for later use (during views creation).
    // You can create an internal class named Configuration with typed fields to assign them from this map.
    this.configuration = this.new Configuration();
    this.configuration.tabBarConfiguration.showIconsOnTabs = Boolean.getBoolean((String) configuration.get("show-tab-icons"));
  }

  @Override
  public void preloadContent(PreloadListener preloadListener) {
    this.preloadListener = preloadListener;

    // To help load the relevant collections (especially if you have more than one), use the loading synchronizer
    this.collectionLoadingSynchronizer = new CollectionLoadingSynchronizer();

    // For cleaner code you can define an inner class for the relevant ui-tags and the resulted data tags.
    // It is possible in some cases that you'll have multiple ui-tags from which 1 will be chosen.
    // Upon response  the result will be indicated with the selected data tag.
    // The data tags are needed in case it will be required to load additional collections,
    // for other navigation providers (like a top bar) in the same manager.
    this.collectionLoadingSynchronizer.addCollectionLoader(UITags.TAB_BAR_UI_TAG2, DataTags.TAB_BAR_DATA_TAG);
    this.collectionLoadingSynchronizer.loadAll(this);
  }
  ```

  These auxiliary methods should be defined together with the above:

  ```java
  @Override
  public void onLoadingFinished(ArrayList<Pair<APCollection, String>> results) {
    // The CollectionLoadingSynchronizer success callback,
    // should parse the results into NavigationMenuItems using the helper Parser.
    // Once done, notify the preload listener.
    for (Pair<APCollection, String> result : results) {
      APCollection collection = result.first;
      String dataTag = result.second;
      if (dataTag.equals(DataTags.TAB_BAR_DATA_TAG)) {
        this.tabBarNavigationMenuItems = Parser.parseNavigationMenuItems(collection);
      }
    }

    this.collectionLoadingSynchronizer = null;
    this.preloadListener.onPreloadReady();
  }

  @Override
  public void onCollectionLoadFailure(Exception exception) {
    this.collectionLoadingSynchronizer = null;
    this.preloadListener.handleException(exception);
  }

  protected class UITags {
    private static final String TAB_BAR_UI_TAG1 = "tab_bar_collection1";
    private static final String TAB_BAR_UI_TAG2 = "tab_bar_collection2";
  }

  protected class DataTags {
    private static final String TAB_BAR_DATA_TAG = "TAB_BAR_DATA_TAG";
  }

  private Configuration configuration;

  private class Configuration {
    // In this case declare only the tab bar configuration,
    // in other cases it is possible to add other fields
    TabBar.Configuration tabBarConfiguration = new TabBar.Configuration();
  }
  ````

* Third part relates to presenting the content to the screen. To achieve it, the inner class `TabBarContentConfigurator` needs to be implemented, and created inside the following `RootActivityManager` method:

  ```java
  @Override
  public ContentConfigurator getContentConfigurator(RootActivityManager.DataSource dataSource) {
    return new TabBarContentConfigurator(dataSource);
  }
  ````

  Define the `TabBarContentConfigurator`:

  ```java
  private FragmentManager fragmentManager;
  private TextView titleTextView;
  private View backButton;

  public TabBarContentConfigurator(RootActivityManager.DataSource dataSource) {
    super(dataSource);
  }

  @Override
  public int getContentViewResourceId() {
    // Choose the layout of the root activity
    return R.layout.tab_bar_base_layout;
  }

  @Override
  public void setTitle(String title) {
    if (this.titleTextView != null) {
      this.titleTextView.setText(title);
    }
  }

  @Override
  public void configureContent(Activity activity, FragmentManager fragmentManager, LayoutInflater layoutInflater, View contentView) {
    this.fragmentManager = fragmentManager;

    ViewStub tabBarViewStub = (ViewStub) contentView.findViewById(R.id.tab_bar);
    if (tabBarViewStub != null) {
      this.tabBar = new TabBar(SideMenuRootActivityManager.this.configuration.topBarConfiguration, SideMenuRootActivityManager.this.topBarNavigationMenuItems, this);
      View tapBarLayout = this.tabBar.configureContent(tabBarViewStub);
      this.titleTextView = (TextView) tapBarLayout.findViewById(R.id.title_text_view);
  }

  @Override
  public void addBackButton() {
    if (this.backButton != null) {
      this.backButton.setVisibility(View.VISIBLE);
      this.backButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          TabBarContentConfigurator.this.handleBackPress();
        }
      });
    }
  }

  @Override
  public void handleBackPress() {
    int backStackEntryCount = this.fragmentManager.getBackStackEntryCount();
    if (backStackEntryCount > 0 && this.tabBar != null) {
      // Re-select the current tab to dismiss the inner fragment
      this.tabBar.selectNavigationMenuItem(this.tabBar.selectedNavigationMenuItem);
    }
    else {
      this.dataSource.finishActivity();
    }
  }

  @Override
  public void addFragment(Fragment fragment, int contentFrameId, boolean isInner, NavigationMenuItem.Type type {
    // This class is responsible to execute the fragment transition,
    // Notice the `contentFrameId` which might be different than 0,
    // In that case the caller requires to preform a sub-fragment transition
    FragmentTransaction fragmentTransaction = this.fragmentManager.beginTransaction();
    fragmentTransaction.setTransition(FragmentTransaction.TRANSIT_NONE);

    if (isInner) {
      fragmentTransaction.addToBackStack(null);
    }
    else if (this.fragmentManager.getBackStackEntryCount() > 0) {
      this.fragmentManager.popBackStack();
    }
            
    fragmentTransaction.replace(contentFrameId == 0 ? R.id.content_frame : contentFrameId, fragment);
    fragmentTransaction.commit();
  }
  ````

**Using the new manager**

You can now create the `TabBarRootActivityManager` in your loading activity and execute preloadContent():

  ````java
  RootActivtyManager rootActivityManager = new TabBarRootActivtyManager();
  rootActivityManager.setConfiguration(configuration);
  rootActivityManager.preloadContent(preloadListener);
  ````

Once the preload done, assign the `sharedInstance`:

  ```java
  RootActivityManager.sharedInstance = rootActivityManager;
  ````

And create the `MainActivity`:

  ```java
  SampleMainActivity extends Activity implements RootActivityManager.DataSource {
    private RootActivityManager rootActivityManager = RootActivityManager.sharedInstance;
    private RootActivityManager.ContentConfigurator contentConfigurator;

    @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);

      this.contentConfigurator = this.rootActivityManager.getContentConfigurator(this);

      this.setContentView(this.contentConfigurator.getContentViewResourceId(););
      this.contentConfigurator.configureContent(this, this.getSupportFragmentManager(), this.getLayoutInflater(), this.findViewById(android.R.id.content));
    }

    @Override
    public NavigationMenuViewHolder getNavigationMenuViewHolder(NavigationMenuItem navigationMenuItem) {
      // Create your custom views if necessary or return null
      return NavigationUtils.getNavigationMenuViewHolder(this, navigationMenuItem);
    }

    @Override
    public void handleNavigationMenuItemSelection(NavigationMenuItem navigationMenuItem) {
      // Handle navigation changes by creating relevant fragments,
      // and asking the `contentConfigurator` to present them
      Fragment fragment = NavigationUtils.getFragment(this, navigationMenuItem);
      this.contentConfigurator.addFragment(fragment, 0, false, navigationMenuItem.type);
    }

    @Override
    public void finishActivity() {
      // The content configurator determines when the back stack is empty,
      // and the activity should be terminated
      this.finish();
    }
  }
  ````