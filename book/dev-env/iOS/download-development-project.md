# Download iOS development project

In order to help developers iterate on plugins, after submiting an initial version or making code fixes to an existing version, Zapp gives the option to prepare a downloadable project.

This project enables developers to debug and add features using their development repository and running it in full context of an existing app.

Here are the full instructions on how to achieve this:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRBD1LkNz5SoSH8XM1DkSrFlL5k5wyLtK2uWxoqkC4Mr7aGnL3UWx1mbVhdAXj9m64ptDiB9gp-JaBX/embed?start=false&loop=false&delayms=5000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

After downloading the Development Project please make sure to add your local plugin. To do so:
1. Updating the `Podfile` to include your `podspec` local path.
2. Run `pod install --no-repo-update` on your terminal to add your plugin pod.
3. Run `pod update YourPlugin --no-repo-update` to update your changes.
