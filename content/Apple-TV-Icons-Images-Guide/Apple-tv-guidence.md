##Apple TV Icons and Images



####All our in-app images are with a ratio of 16:9. The largest Image on the app is 1920x1080. You will only ask to Upload 1920x1080 images and we will do all the scales and fit for you.

When ingest the content to Applicaster Admin make sure the image key is: 'tvml_image'.
[more details regaring vod imgestion](http://developer.applicaster.com/docs/public/vod-ingestion-xml).

#Image Size and Resolution#

All images on Apple TV are @1x resolution.

**Make sure images are clear at a distance.** Remember, your app is across the room on a large screen. Scale images large enough to be seen clearly from far away, and ensure that focus and interaction are easy. This is especially important during gameplay.

**Test image quality.** An image that looks great on your computer screen may appear pixelated or stretched when displayed on a large TV screen. Always test your app on a TV to confirm that your images still look crisp.

#App Icon#
Every app needs a beautiful and memorable icon that attracts attention in the App Store and that stands out on the Apple TV Home screen. Your icon is the first opportunity to communicate, at a glance, your app’s purpose to people.

![](https://developer.apple.com/tvos/human-interface-guidelines/icons-and-images/images/icons-and-images-app-icon-grid_2x.png)

**Provide a single focus point.** Design an icon with a single, centered point that immediately captures attention and clearly identifies your app. People shouldn’t have to analyze the icon to figure out what it represents.

**Keep the background simple.** Don’t clutter your icon with too much background noise. Give it a simple background so higher layers stand out and it doesn’t overpower other app icons nearby. Remember, you don’t need to fill the entire icon with content.

**Use words only when they’re essential or part of a logo.** An app’s name appears below its icon when the icon is in focus. Don’t include nonessential words that repeat the name or tell people what to do with your app, like "Watch" or "Play." If your design includes any text, emphasize words that relate to the actual content your app offers.

**Don’t include screenshots.** Screenshots are too complex for an app icon and don’t generally help communicate your app’s purpose. Instead, take the time to design a beautiful and engaging icon that really pops.

**Keep icon corners square.** The system applies a mask that rounds icon corners automatically.

#Layering

App icons must have between two and five layers to create a sense of depth and vitality as your icon comes into focus.

Important: Layered images are required for app icons. For guidance, see Layered Images.

**Consider layer separation carefully.** If your icon includes a logo, separate it from the background. If your icon includes text, bring it to the front so it’s not hidden by other layers when the parallax effect occurs.

![](http://images.applicaster.com/accounts/3/broadcasters/5/categories/6054/image_assets/302355/cms.png?1450275723)


#Effects

**Consider gradients and shadows carefully.** Background gradients and vignettes can clash with the parallax effect, so use them cautiously. For gradients, top-to-bottom, light-to-dark styles are recommended.

In app icons, shadows usually look best as sharp, hard-edged tints that are baked into the background layer and aren’t visible when the app icon is stationary.

**Leverage varying opacity levels to increase the sense of depth and liveliness.** Creative use of opacity can make your icon stand out. For example, the Photos icon separates its centerpiece into multiple layers that contain translucent pieces, bringing greater liveliness to the design.

#Sizes

Important: Every app must supply both a small and a large app icon.

App icons must be submitted in two sizes, both with the same aspect ratio.


![](http://images.applicaster.com/accounts/3/broadcasters/5/categories/6054/image_assets/302354/cms.png?1450275812)



**Allow a conservative safe zone in your small app icon.** During focus and parallax, content around the edges of your app icon may be cropped as the icon scales and moves. To ensure your icon’s content isn’t cropped too tightly, consider allowing some additional breathing room.

**Mimic your small app icon with your large app icon.** Although the large icon is used differently than the small one, it’s still your app icon. It should match the smaller version in appearance.

For downloadable app icon templates that can help you position your content, see [Resources](https://developer.apple.com/tvos/human-interface-guidelines/resources/#icon-and-image-templates).


#Scrolling Carousel

This layout shows a series of large images, each of which spans almost the entire width of the screen. Apple TV automatically scrolls through these Images from left to right on a preset timer until one is brought into focus. The sequence circles back to the beginning once the final image is reached.

When a Image is in focus, a small, circular gesture on the remote’s touch surface enacts the system focus effect, animating the item, applying lighting effects, and, if the image contains multiple layers, producing a 3D effect. Swiping on the touch surface pans to the next or previous image in the sequence. Use this style to showcase rich, captivating content, such as a popular new TV shows.

![](http://images.applicaster.com/accounts/3/broadcasters/5/categories/6054/image_assets/302352/cms.png)

**Provide the right amount of content to make scrolling comfortable.**
A minimum of three images is recommended for a scrolling banner to feel effective. More than eight images makes it harder to manually navigate to a specific image.

**If you need text, add it to your image.** This layout style doesn’t show labels under content, so any text must be part of the image itself. In layered images, consider elevating text by placing it on a dedicated layer above the others. Add the text to the accessibility label of the image too, so VoiceOver can read it to the visually impaired.


#Layered Images

Layered images are at the essence of the Apple TV user experience. In conjunction with the parallax effect, they produce a sense of realism and vigor that evokes a personal connection as people interact with content onscreen.

A layered image consists of between two and five distinct layers that come together to form a single image. The separation between layers, along with use of transparency, creates a feeling of depth. As someone interacts with an image, higher levels elevate and scale, overlapping lower levels further back and producing a 3D effect.

Important: Layered images are required for app icons. They’re optional but strongly encouraged for other focusable images in your app, including top shelf images.

**Use standard interface elements to display layered images.**
If your app’s user interface uses UIKit views and the focus API, layered images automatically get the parallax treatment whenever they’re brought into focus.

**Identify logical foreground, middle, and background elements.**
In foreground layers, display prominent elements such as a character in a game, or text in an album cover or movie poster. Middle layers are perfect for secondary content and effects like shadows. Background layers are opaque backdrops that showcase the layers above without upstaging them.

**Generally, keep text in the foreground.** Unless you want to obscure text, bring it to the forefront in a layered image for clarity.

**Keep the background layer opaque.** Using varying levels of opacity to let content shine through higher layers is fine, but your background layer must be opaque—you’ll get an error if it’s not. This ensures your artwork looks great with parallax, drop shadows, and system backgrounds.

**Keep layering simple and subtle.** Parallax is designed to be almost unnoticeable. Excessive 3D effects can appear unrealistic and jarring. Keep depth simple to bring your content to life and add delight.

**Leave a safe zone around your content.**
During focus and parallax, content around the edges of some layers may be cropped or difficult to see clearly as the image scales and moves. To ensure that your primary content is always visible, don’t put it too close to the edges. The safe zone varies, depending on the image size, layer depth, and motion. Foreground layers are cropped more than background layers.

**Always preview layered images.** The best way to design layered images that look great on Apple TV is to preview them throughout your design process using Xcode, the Parallax Previewer app for OS X, or the Parallax Exporter Photoshop plug-in. Pay special attention as scaling and clipping occur, and readjust your imagery to keep important content safe if necessary. Once your layered images are final, make sure you preview them on an actual TV for the most accurate representation of what people will see. Parallax Previewer and Parallax Exporter are available for download in [Resources](https://developer.apple.com/tvos/human-interface-guidelines/resources/).

#Sizing Layered Images

To determine the appropriate size for a layered image, take both the unfocused and focused states into account. During the parallax effect, background layers may be cropped slightly, so keep essential content within a safe zone and include some additional breathing room to make sure your content always looks great.

![](http://images.applicaster.com/accounts/3/broadcasters/5/categories/6054/image_assets/302350/cms.png?1450274920)


Layered images can be embedded in your app or retrieved from a content server at runtime.


#Launch Image

![](http://images.applicaster.com/accounts/3/broadcasters/5/categories/6054/image_assets/302351/cms.png?1450275033)


A launch image displays when your app starts up. It appears instantly and is quickly replaced with the first screen of your app, giving the impression that your app is fast and responsive. A launch image isn’t an opportunity for artistic expression. It’s solely intended to enhance the perception of your app as quick to launch and immediately ready for use. Launch images are static, and don’t include layers.

**Design a launch image that’s nearly identical to the first screen of your app.** If you include elements that look different when the app finishes launching, people can experience an unpleasant flash between the launch image and the first screen of the app.

**Avoid including text in your launch image.** Because launch images are static, any displayed text won’t be localized.

**Downplay launch.** People are likely to switch apps frequently, so design a launch image that doesn’t draw attention to the app launching experience.

**Don’t advertise.** The launch image isn’t a branding opportunity. Don’t design an entry experience that looks like a splash screen or an "About" window. Don’t include logos or other branding elements unless they’re a static part of your app’s first screen.