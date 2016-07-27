# ZappRoot-iOS

##Motivation

Allow different Root Controller configuration as a plugin, for example: Side Menu View Controller or TabBar View Controller.

##Project structure

The Application will request the plugin manager`GARootPluginFactory` to retrieve a Root Plugin Adapter. In case a Root Plugin Adapter is available, the application will create it.
If the `GARootPluginFactory` did not provide a plugin RootViewController, there was either an error or a root plugin was not added inside the app configuration.

##Usage
#####Note: All code should be written on Swift in ZappRoot

Once the root plugin was created, the application will call the func `- (void)prepareRoot:(void (^ _Nonnull)(BOOL success))completion` to prepare the root view controller for usage. This function will include: load data source, create root structure, customize root if needed.

The root Plugin is responsible for loading its own root data source. `MADataSourceLoader` class can be used to load the default root data source. Alternatively implement the root data source manually.

In order to create screen view controllers that will be added to the root structure, `adapterDataSource` var of `MAAdapterRootProtocol` can be utalized, using the method `- (UIViewController * _Nullable)viewController:(APModel *)model metaData:(APCollectionChildMetadata *)metaData`. It will ask the dataSource(__Zapp-App__) to create the ViewController by model and metadata.  Alternatively the Screen ViewControllers can be created manually.

When the root will be preapred and the application will finish its loading flow, the root will be added to the `appLoadingViewController`.

The  orientation is requested from __ZappApp__ by calling `adapterDataSource`, using the method `- (UIInterfaceOrientationMask)rootInterfaceOrientation`

All transitions between ViewControllers in the Navigation Stack is defined by the ComponentSDK. However, the Root Controller defines the methods of presenting some exceptional viewControllers that are outside of the current navigation stack, such as `GAIntermediateViewController`, `GAStoreFrontViewController` and others. __ZappApp__ creates these screens by calling the root controller to present them. The Root controller selects the presentation type: `Present Modally` `Add as Child ViewController` `Push in current stack`

The ability to retrieve the current selected View Controller in the root structure, should be implemented in the root controller.

The Root has the ability to customize the navigation behavior per screen, for example displaying the navigation bar on top or as an overlay per screen. It can be described in `func customizeNavigationWithScreenEntity(sirenEntity:APSirenEntity)`. Once a ComponentSDK screen is presented, it calls __AppDelegate__ to customize the Navigation with the screen entity (APSirenEntity). __AppDelegate__ redirects this call to the root. The root updates the navigation according to the implementation. This an optional update, depending if a different navigation was implemented per screen.

## Tutorial

#####This tutorial will instruct you how to create a new Root Plugin implementation. Make sure you read first the explanation about the project structure.

1. Clone [ZappRoot-iOS](https://github.com/applicaster/ZappRoot-iOS.git) to your working folder
2. Open the Podfile and add the relevant pod with the 3rd party root project.
    For Example:
    ```
    target ZappRoot do
       pod 'ApplicasterSDK', :path => 'ApplicasterSDK-iOS/ApplicasterSDK-Dev.podspec'
       pod 'ThirdPartyRootViewController'
    end
    ```
3. Call `pod install` from the main __ZappRoot-iOS__ folder to prepare the new 3rd party SDK to work.

4. Open the workspace of __ZappRoot-iOS__.
5. Create a folder with the new __Root__  name, and place it inside the __ZappRoot/RootViewController__ folder.
6. In this folder create the __Adapter__ file.
    ```Example: MATAbBarAdapter.swift```
    
	The Root Adapter should adopt the logic of a 3rd party root with the ZappApp structure implementation.

	The Adapter Class should have the mark ```@objc``` to allow using this code in objective c.
7. The __Adapter__ should inherit the __UIViewController__ and conform the __MAAdapterRootProtocol__ protocol.

8. All mandatory __MAAdapterRootProtocol__ functions should be implemented in the __Adapter__.

#####TabBar Example
Below is a simple implementation of the __Adapter__ accompanied with explanations. 
The Example used is the __MATabBarAdapter.swift__ file that can be found inside the __ZappRoot-iOS__ folder. This example is based on the UITabBarViewController class.

Non-protocol variables
`var dataSource:APCollection?` - Protocols that store the collection for the Root Data Source

Protocol variables and functions
`var adapterDataSource: MAAdapterRootDataSource?` - A protocol object that conforms the __MAAdapterRootDelegate__ protocol that is used to get data from the __ZappApp-iOS__

Interface orientation func
```
    override func supportedInterfaceOrientations() -> UIInterfaceOrientationMask {
        return self.adapterDataSource!.rootInterfaceOrientation() //ZappRoot asks DataSource(ZappApp) to provide relevant  UIInterfaceOrientationMask
    }

override func shouldAutorotate() -> Bool {
        return true
    }
```

The Func used to prepare the Root for usage. After completion, the Zapp Root should be fully prepared.
```
  func prepareRoot(completion: (success:Bool) -> Void) {
  		// Non protocol function will be described below. Retrieve array of UINavigationController that will be used for TabBarControllers chealdren
        self.loadDataSource { (navigationItems) -> Void in
            if navigationItems.count > 0 {
                self.viewControllers = navigationItems
                completion(success: true)
            } else {
                completion(success: false)
            }
        }
    }
```

The Protocol methods that are used for presenting specific screens that are not in the Component SDK, such as __Intermidiate screen__, __Storefront__ and others.
```
    func presentViewController(viewController:UIViewController, completion: ((success:Bool) -> Void)?) {
        self.currentViewController()?.presentViewController(viewController,
                                                            animated: true,
                                                            completion: nil)
    }
    
    func pushViewController(viewController:UIViewController, completion: ((success:Bool) -> Void)?) {
        if let navigationController = self.selectedViewController as? UINavigationController {
            navigationController.pushViewController(viewController, animated: true)
        }
    }
    
    func addChildViewController(viewController:UIViewController, completion: ((success:Bool) -> Void)?) {
        viewController.beginAppearanceTransition(true, animated: true)
        self.addChildViewController(viewController,
                                    toView: self.view)
        viewController.endAppearanceTransition()
     }
```

The Func that returns the current presented View Controller
```
 func currentViewController() -> UIViewController? {
        return self.selectedViewController?.topmostModalViewController()
    }
```
The Func used to retrieve the array of __UINavigationController__ used for TabBarController
```
    func loadDataSource(completion:(navigationItems:[UINavigationController]) -> Void) {
		
        // MADataSourceLoader is a universal helper, used to download the standard structure of the root.
        // It should not be used if the root has a specific loader.
        
        MADataSourceLoader.rootDataSource(dataSourceKey) {(collection: APCollection?) -> Void in
            if let dataSource = collection {
                self.dataSource = dataSource
                var navItems:[UINavigationController] = []

                for (index, model) in self.dataSource!.collectionItems.enumerate() {
                    if let currentModel = model as? APModel {
                        let metaData = collection?.collectionItemsMetadataArray[index] as? APCollectionChildMetadata
                        
                        //ZappRoot calls the DataSource(ZappApp) to provide a viewController by model and metaData.
                        //It is possible not to use this method and manually define the viewController.
                        
                        if let viewController = self.adapterDataSource!.viewController(currentModel,
                                                                                            metaData: metaData) {
                            let navController = UINavigationController(rootViewController: viewController)
                            navItems.append(navController)
                        }
                    }
                }
                completion(navigationItems: navItems)
            }
        }
    }
```
When the development is done, the next step is creating a podspec file.

#### How to create a podspec?

Note: Please read how cocoapods works. This explanation does not include [__Cocoapods__](https://guides.cocoapods.org) basics.


1. The ZappRoot works with different subspecs. Each subspec should be setup to be used for different kinds of roots.
    Example:
    ```
      s.subspec 'Lite' do |lite|
        // Files for a ZappRoot with 'Lite' settings should be added here.
      end

      s.subspec 'TabBar' do |tabBar|
        // Files for a ZappRoot with 'Lite' settings and with 'TabBar root' settings should be added here.
     end
    ```
2. Open __ZappRoot.podspec__
3. Add a new subspec section. Instead of 'NewRoot', wrote the name of the new Root.
    ```
    s.subspec 'NewRoot' do |newRoot|
    end
    ```
4. Inside the __NewRoot__ subspec, the relevant files and pods' dependency used for new Root, should be added.
    Note: The files defining in the 'Lite' subspec should be added as well, because the 'Lite' subspec has basic files for all the root controllers.
    ```
    s.subspec 'NewRoot' do |newRoot|
        newRoot.prefix_header_file = 'ZappRoot/ZappRoot.pch'
        newRoot.private_header_files = 'ZappRoot/ZappRoot.h'
        newRoot.source_files  = ['ZappRoot/*.swift', 'ZappRoot/Protocol/**/*.swift', 'ZappRoot/ZappRoot.h', 'ZappRoot/RootViewController/TabBarController/**/*.swift']
        newRoot.resources = [
            'ZappRoot/RootViewController/TabBarController//**/*.xib',
            'Resources/*',
            'ZappRoot/**/*.xib'
        ]
         s.dependency 'ThirdPartyRootViewController'
    end
    ```
5. Update a version of the podspec, save and quit.

#### Deploy the Root Controller
1. After all the changes were done, update the version number in the ZappRoot project and create a pull request with the new changes.
2. When the pull request will be merged, create a new tag with a release version number.
3. Update the podspec inside the pods repo
	a. Clone (https://github.com/applicaster/CocoaPods-Private)
    b. Open the ZappRoot folder and create a folder with the name of the new ZappRoot version.
    Example: `ZappRoot/0.1.1`
    c. Copy into this folder the __ZappRoot.podspec__ that was created before.
    d. Push changes to repo.
4. Create a manifest json with __ZappiFest__ and publish it to the Zapp Website. __ZappiFest__ will instruct how to create the json file with relevant params of the new plugin. Documentation can be found here: https://github.com/applicaster/zappifest.
5. After the plugin was published successfuly, the plugin can be used in the Zapp App Website.

#### How a plugin Works?
This description is general to all plugins of Zapp. This is relevant in case when a root plugin was added for a specific application and build. The same logic applyies if the build is locally.

1. The ZappTool receives parameters from ZappWebsite or from local environment.
2. The ZappTool will open a Podfile of the Zapp-App-iOS and add the __Source__ for the Zapp Root. It will also add the `ZappRoot` with relevant subspec.
    Example:
    ```
    Zaptool sources - Do not remove or change.
    source 'git@github.com:CocoaPods/Specs.git'

    Zaptool pods - Do not remove or change.
    pod 'ZappRoot/TabBar'
    ```
3. The ZappTool will download the file ```plugin_configurations.json```from the Build Params file and save it in Zapp-App-iOS into the __Resources__ folder.
4. The Pod install will create a pod structure of the relevant __Root__.
5. After the configuration is finished, the app is ready for use.