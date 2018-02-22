# Cell video background view

## OVERVIEW

This document will go through the details and implementations on adding support for Video background to any cell in Applicaster.

This ability was added in iOS SDK 4.5.5 and Android SDK 5.6.0

## SECTIONS

1. Explain visibility of the feature and how it behaves.

2. Details regarding expected format and best practices

3. Configuring the feature in data sources

4. Practical guidelines on adding the feature to an existing cell - iOS

5. Practical guidelines on adding the feature to an existing cell - Android

## VISIBILITY

The feature works by looping a short form video in an Aspect Fill ratio (Center crop) on a given layer in the cell. The video is played without sound.

The video is played without sound and can be layered with the rest of the views of the cell. (Hence - you can add a gradient on top).

The base behavior is that the video view is transparent and it becomes visible once the video is ready to play.

This is done in order to improve behavior on slow connections.

## Format and best practices

The video player used is the native video player (AVPlayer) in iOS and ExoPlayer in Android.

This means that any supported format on iOS and Android should be supported on this feature.

In terms of performance - a short form mp4 movie would work the best (device , memory, looping etc) - however HLS can be used as well.

Currently in iOS - HLS would sometime "blink" on lower end devices when looping.

# Data sources

## Atom and Data source providers

Atom feeds and atom entries both support this feature.

A media group with the key *promo_video*  should be added of type *video*.

The SDK will then detect this key and together with checking if the cell has a background video layer - will generate the correct view.

This video must be CDNed.

## Applicaster 2 (admin.applicaster.com)

Theoretically support for any Applicaster models is already existing in the SDK.

The SDK will check the existence of the key *promo_video* on the model and will set up the cell accordingly.

HOWEVER - at this point - this is not reflected in applicaster CMS system and is pending a decision if / how to add this.

This is not a straightforward decision as the asset will have to be hosted and CDNed.

# Practical Guides

## PRACTICAL GUIDE - iOS

In order to add the feature to any cell:

1. Open the xib of the cell

2. Create a UIView - ideally between the image and the shadow overlay

3. Set it’s alpha to 0.0

4. Set view layout constraints according to the desired behavior.

5. Mark view as clip to bounds

6. Connect the outlet to the *promoVideoContainerView*

7. Enjoy

# PRACTICAL GUIDE - Android

In order to add the feature to any cell:

1. Open the XML of the cell

2. Add the *video_background_view.xml* in your cell (e.g `<include layout="@layout/video_background_view"/>`) - Should be below the image and the shadow overlay if available.

3. Enjoy 

