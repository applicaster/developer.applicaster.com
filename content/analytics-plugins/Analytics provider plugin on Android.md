**How to create an analytics provider plugin on Android**

Note: If you find any issue in the documentation, please submit a Pull Request with proposed changes and submit to Elad Ben David or contact him at e.bendavid@applicaster.com

To create an analytics provider plugin on Android, follow the steps outlined below:

**1. Set Local Environment:**<br />
  <ol>
  **a.** Create new repository in [Github](https://github.com/applicaster). The repository should follow the naming convention 'xxxAnalyticsPlugin-Android', where xxx is the provider name<br/>
  **b.** Create a new branch from master.<br />
   **c.** Create a new android project with name based on the repository name.<br />
  **d.** Update your .gitignore file like [here](https://gist.github.com/vtanathip/9414323).<br />
 
  </ol>
**2. Prepare your project:**<br />
 <ol>
  **a.** Update build.gradle, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/build.gradle).<br />
  **b.** Update circle.yml, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/circle.yml).<br />
    **c.** Update gradle.properties, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/gradle.properties).<br />
     **d.** Update proguard-rules.pro, you can find example [here](https://github.com/applicaster/NeonKitPlayerAdapter-Android/blob/master/proguard-rules.pro).<br />
     </ol>
     **3. Create your Agent:**<br />
     <ol>
      **a.** Add your agent in the new project, The agent must inherit from BaseAnalyticsAgent.<br />
  **b.** Make sure all your private methods and parameters are well documented.<br />
  **c.** Add documentation for the class, and set link to the provider manual.<br />
  **d.** Add Unit tests for any logic.<br />
  **e.** Add integration tests for any inherited function.<br />
  **f.** Commit and push your changes.<br />
  **g.** Make sure the build on CircleCi is a success. <br />
  </ol>
  
  **4. Update the README and merge you branch:**<br />
   <ol>
   **a.** Specify which function you override.<br />
   **b.** Describe the tests you covered.<br />
   **c.** Add relese note for any meaningful changes, including the plugin version.<br />
    **d.** Merge your code by following our [working agreements](https://github.com/applicaster/zapp-awesome/blob/master/working_agreements.md).<br />
    </ol>
    
**5. Create dependency to your Agent:**<br />
  <ol>
  **a.** Add ascending tag. start with 0.1.x <br />
  **b.** Verfiy you have a build in Bintray .<br />
</ol>
**6. Create a Plugin in Zapp:**<br />
  <ol>
  **a.** Go to [Zappifest](https://github.com/applicaster/zappifest) repository and follow the instructions there.<br />
  **b.** Make sure your plugin is working well by testing it on a Zapp application.<br />
</ol>
