**How to create an analytics provider plugin on Android**

If you find any issue please contact e.bendavid@applicaster.com

**For update exist again please jump section 3**

**1. Set Local Environment:**<br />
  <ol>
  **a.** Create new repository in [Github](https://github.com/applicaster). the repository should be in naming convention 'xxxAnalyticsPlugin-Android', where xxx is the provider name<br/>
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
     **3. Create/Update Analytic Agent:**<br />
     <ol>
      **a.** Add/edite the agent in the project, The agent must inherit from BaseAnalyticsAgent.<br />
  **b.** Make sure all your private methods and parameters are well documented.<br />
  **c.** Add documentation for the class, and set link to the provider manual.<br />
  **d.** Add Unit tests for any logic.<br />
  **e.** Add integration tests for any inherited function.<br />
  **f.** Commit and push your changes.<br />
  **g.** Make sure the build on CircleCi success. <br />
  </ol>
  
  **4. Update the README and marge you branch:**<br />
   <ol>
   **a.** Specify which function you ovveride.<br />
   **b.** Describe the tests you covered.<br />
   **c.** Add relese note for any meaningful change including the plugin version.<br />
    **d.** Marge your code by following our [working agreements](https://github.com/applicaster/zapp-awesome/blob/master/working_agreements.md).<br />
    </ol>
    
**5. Create dependency to your Agent:**<br />
  <ol>
  **a.** Add ascending tag. start with 0.1.x <br />
  **b.** Verfiy you have build in Bintray .<br />
</ol>
**6. Create Plugin on Zapp:**<br />
  <ol>
  **a.** Go to [Zappifest](https://github.com/applicaster/zappifest) repository and Follow the instructions.<br />
  **b.** Make sure your plugin is working well by testing it on Zapp application.<br />
</ol>