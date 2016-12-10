**How to create a new analytics provider plug-in on Android or update an existing one**

Note: If you would like to improve this documentation, please submit a Pull Request with your proposed changes and submit it for review to Elad Ben David. You could send your questions or suggestions to e.bendavid@applicaster.com.

**Follow the steps below to create a new analytics provider plug-in on the Android platform, Skip sections 1 and 2 if you want to update an existing analytics agent:**

**1. Set Your Local Environment:**<br />
  <ol>
    **a.** Ask somebody with admin rights on Github to create a new repository of you. If you don't know who has admin rights, ask on Slack. The repository should be in naming convention 'xxxAnalyticsPlugin-Android', where xxx is the provider name<br/>
    **b.** Create a new branch from master and start adding your code there. Even though the repository was created for you, it belongs to your team.<br />
    **c.** Create a new android library in android studio with name based on the repository name.<br />
    **d.** Update your .gitignore file like [here](https://gist.github.com/vtanathip/9414323).<br />
  </ol>
**2. Prepare your project:**<br />
 <ol>
    **a.** Update build.gradle, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/build.gradle).<br />
    **b.** Create circle.yml so as to set up your project on the Circle CI continuous integration system, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/circle.yml).<br />
    **c.** Update gradle.properties, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/gradle.properties).<br />
    **d.** Mention the public fields and methods of your class in proguard-rules.pro. You can find an example  [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/proguard-rules.pro).<br />
  </ol>
**3. Create a New Analytics Agent Or Update an Existing One:**<br />
  <ol>
      **a.** If you are creating a new agent, it must inherit from the BaseAnalyticsAgent abstract class (com.applicaster.analytics.BaseAnalyticsAgent).<br />
    **b.** Use meaningful names for your private members and methods. Add documentation in Javadoc format. In general, your code should be well documented.<br />
    **c.** Add documentation for the class, and set link to the provider manual.<br />
    **d.** Add Unit tests for any non-trivial logic.<br />
    **e.** Add unit tests in BaseAnalyticsAgentTests for any inherited function.<br />
    **f.** make sure you didn't forget to commit and push your changes.<br />
    **g.** Make sure the build on CircleCi success. <br />
  </ol>
  **4. Update the README file and merge your branch to master:**<br />
   <ol>
    **a.** Add release not for any meaningful changes, including the plug-in version.<br />
    **b.** Create a Pull Request and ask another developer to review your code. After your Pull Request is approved, merge your code to the master branch. You should follow our [working agreements](https://github.com/applicaster/zapp-awesome/blob/master/working_agreements.md).<br />
  </ol>
  **5. Update the README and merge you branch:** <br />
   <ol>
   **a.** Add relese note for any meaningful changes, including the plugin version.<br />
    **b.** Merge your code by following our [working agreements](https://github.com/applicaster/zapp-awesome/blob/master/working_agreements.md).<br />
    </ol>
    
**6. Create dependency to your Agent:**<br />
  <ol>
  **a.** Add an ascending tag beginning with 0.1.x. Use [semantic versioning](http://semver.org). Push your tag to the remote repository. <br />
  **b.** Verify that your plug-in binary was created successfully on Bintray. If you don't have a Bintray account, ask for one to be created for you.<br />
 </ol>
**7. Create a Plugin in Zapp:**<br />
  <ol>
  **a.** Go to [Zappifest](https://github.com/applicaster/zappifest) repository and follow the instructions there.<br />
  **b.** Make sure your plugin is working well by testing it on a Zapp application.<br />
</ol>
