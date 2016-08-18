**How to create an analytics provider plugin on Android**

If you find any issue please contact e.bendavid@applicaster.com

**1. Set Local Environment:**<br />
  <ol>
  **a.** Clone the [Analytics Provides Plugin repository](https://github.com/applicaster/analytic-providers-android). <br />
  **b.** Create a new branch from master.<br />
  **c.** Create a new directory under com.applicaster.analytic.plugins.<br />
  **d.** In gradle.properties change GROUP propery to the name of your directory.<br />
  </ol>
**2. Create your Agent:**<br />
 <ol>
  **a.** Add your Agent under the new directory, The Agent must inherit from BaseAnalyticsAgent.<br />
  **b.** Add dependency in build.gradle and in ci.build.gradle. If you need to use jars you can add it as usual in libs folder.<br />
  **c.** Add new proguard txt file under proguards folder, please rename your proguard file as the agent name.<br />
  **d.** Include all the public part of your class in the proguard file, you can see an [example here](https://github.com/applicaster/analytic-providers-android/blob/master/proguards/flurry.txt).<br />
  **e.** In build.gradle  and in ci.build.gradle change proguardFile parameter with your file name.<br />
  **f.** Make sure all your private methods and parameters are well documented. Add documentation for the class, and set link to the provider manual.<br />
  **g.** Add Unit tests for any logic.<br />
  **h.** Commit your changes.<br />
  </ol>
**3. Create dependency from your Agent:**<br />
  <ol>
  **a.**Add ascending tag. <br />
  **b.** Push your branch. Make sure that the build on CircleCi is successful, and that you have a Maven build in Bintray.<br />
</ol>
**4. Create Plugin on Zapp:**<br />
  <ol>
  **a.** Clone [Zappifest](https://github.com/applicaster/zappifest) repository. Follow the instructions and make sure your plugin is working well by testing it.<br />
</ol>
**5. Add your agent into the Master branch:**<br />
  <ol>
  **a.** Move all your dependencies to be provider instead of compile and move all your Jars from libs to optlibs.<br />
  **b.** Set proguard file to be dummy.txt.<br />
  **c.** Set in GROUP property value com.applicaster.analytic.plugins.<br />
  **d.** Commit your changes, add dummy tag, push and create pull request.<br />
  </ol>