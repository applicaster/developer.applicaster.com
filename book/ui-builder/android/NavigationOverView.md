# Navigation in the Android SDK

## Motivation

This documents explains the use of `Menu` and `Nav Bar` plugins, and the relations between an `Activity` in Zapp Android, a `RootActivityManager` and a `ToolbarPlugin`.

## Flags and Plugins

### Root Plugin

If the root plugin is not defined explicitly, the `side menu` root will be in chosen.
If the `Use UI Builder Root API` flag (in the app's version general configuration) is on, it will take its data from the ui builder API. Otherwise, it will take its data from Applicaster2.

#### Using the ui builder `Navigation` section:

- Make sure that `Use UI Builder Root API` is checked
- Select the desired root plugin in the UI builder navigation section.

#### Using `Applicaster2`:

- Make sure that `Use UI Builder Root API` is **not** checked.
- Selcect the desired root plugin in the Plugins section.

### Toolbar Plugin

If no plugin was selected, the app will use a default one: `DefaultUiBuilderToolbarPlugin` if `Use UI Builder Root API` is checked, or `DefaultLegacyToolbarPlugin` otherwise.

#### Using the ui builder `Navigation` section:

Select the desired nav bar plugin in the UI builder navigation section.

#### Using `Applicaster2`:

Select the desired nav bar plugin in the Plugins section.

## Navigation Data

- The legacy navigation data is stored in Applicaster2 Collections.
- The UI builder navigation data is part of the `rivers.json` of the app, and includes both the navigation items, and the navigation style.
- For both cases, The navigation data is accessible via `NavigationDataManager`.

## ToolbarManager

The Zapp Android SDK will never use a navbar plugin directly, but only via the `ToolbarManager`.
This singleton class is responsible to communicate between the SDK and the navbar plugin.

## Flow

All the activities in Zapp Android extend `GenericBaseFragmentActivity`.
Its `onCreate` method calls the following:

- `configureContent` on the menu plugin: Initializing the menu.
- `configureToolBar`on the `ToolbarManager`: initializing the toolbar.
  The `onCreateOptionsMenu` calls (invoked by the OS) are delegated to the `ToolbarManager` and handled by the navbar plugin, to populate the toolbar.

## Coupling

Both of the plugins are as decoupled as possible.
Those are the relations that exists:

- The menu plugin defines if a menu toggle button should be presented in the toolbar.
- The menu plugin asks the nav bar plugin to set the action icon (meaning, menu or back button), according to its state. Usually in the following methods: `addFragment`, `configureContent` and `handleBackPress`.
- The menu plugin ask the toolbar plugin wether it is in `overlay` state.
- The toolbar plugin calls the menu plugin when the menu button is clicked.

## The Legacy Toolbar Plugin

The legacy toolbar plugin replaces the the toolbars that where included in the different menu plugins.
For template apps it can be fully customized, by overriding the `legacy_toolbar_main_screen` and `legacy_toolbar_inner_screen` layouts.
For UI Builder app, it can be customized, to a certain extent, via the plugin configurations.

## Placement

Each activity defines in its layout XML a view stub for the toolbar, with a `toolbar` id.
The menu plugin relocates this view, if the toolbar is in `overlap` state.

## The toolbar interface:

```
public interface ToolbarPlugin extends GenericPluginI {

/**
 * Inflate the toolbar from the stub (id: toolbar), and set it into the activity * * @return the inflated toolbar
 */  Toolbar configureToolbar(AppCompatActivity activity, ToolbarNavigationMetaData navigationMetaData, @IdRes int stubId, boolean isMainActivity);

/**
 * Add the menu the menu items */  void createOptionMenu(AppCompatActivity activity, Menu menu, ToolbarNavigationMetaData navigationMetaData, String screenId, boolean isMainActivity, ToolbarItemClickListener listener);

/**
 * Set the action button to the toolbar (e.g. hamburger/back button) */  void setActionButton(@NonNull Activity activity, @NonNull FragmentManager fragmentManager, RootActivityManager.ContentConfigurator configurator);

/**
 * Defines wether the toolbar is overlapping the screen (used for transparent toolbars) */  NavigationStyle.State getToolbarState (ToolbarNavigationMetaData navigationMetaData);

/**
 * Set the title text for the toolbar (if the title is enabled) */  void setTitle(@NonNull Toolbar toolbarView, String title);
}
```
