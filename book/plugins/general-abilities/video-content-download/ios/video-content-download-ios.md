## Video Content Downloads
### Availible from SDK: 11.2.0

1. <a href="#description">Description</a>
2. <a href="#general">General</a>
3. <a href="#implementation">Download button protocol implementation</a>
4. <a href="#download-button-states-images3">Download button states images</a>
* * *

<a name="description" />

##### Description
Given a screen plugin with Atom Item or items, the following guide goes through how to implement and customize a download button as a part of a Screen, component or cell.

***

<a name="general" />

##### General

Zapp apps supports downloads of one of the following video container types:
* Mpeg video files for progressive download - `mp4` video type
* HLS using m3u8 manifests - `m3u8` video type
	- The offline video caching is implemented using Apple's built in video caching capabilities introduces in iOS 10.
	- The Downloaded item (including the relevant metadata such as the Atom model and images) is stored on the device and will be used for presenting in a downloaded content dedicated screen, played locally, and marking it for deletion.
***

<a name="protocol-implementation" />

##### Pre-condition
Downloads plugin should be added to the app.

##### Protocol implementation
1. Implement `ZPDownloadButtonDelegate` to prepare the download button appearance on your screen.

	* `func downloadButton(_ downloadButton: ZPDownloadButtonProtocol, stateChanged state: ZPDownloadButtonState)`
		- fired on download button state change, usually no action is required on this function.

		- implementation example:
		```swift
		public func downloadButton(_ downloadButton: ZPDownloadButtonProtocol, stateChanged state: ZPDownloadButtonState) {
				guard let model = self.componentDataSourceModel as? ZPDownloadableItemProtocol else {
						return
				}

				switch state {
						case .error:
								//as an example, cancel downloading if error received
								ZAAppConnector.sharedInstance().hqmeDelegate?.cancelDownloading(model)
						default:
								break
				}
		}
		```

	* `func downloadButton(_ downloadButton: ZPDownloadButtonProtocol, tappedWithState state: ZPDownloadButtonState)`
		- fired on download button click, to implement the action on each one of the download button states.

		- implementation example:

		```swift
		public func downloadButton(_ downloadButton: ZPDownloadButtonProtocol, tappedWithState state: ZPDownloadButtonState) {
		    guard let model = self.componentDataSourceModel as? ZPDownloadableItemProtocol else {
		        return
		    }

		    switch state {
		    case .downloaded:
						//perform an action on already downloaded item. (ex. remove)
		        break
		    case .startDownload:
						//perform an action on not downloaded item
						ZAAppConnector.sharedInstance().hqmeDelegate?.download(model)

						//update state to pending
						downloadButton.downloadStateChange(to: .pending)
		        break
		    case .downloading:
						//perform an action on item that is currently being downloaded
		        ZAAppConnector.sharedInstance().hqmeDelegate?.cancelDownloading(model)

		        //update state to initial after cleanup
		        downloadButton.downloadStateChange(to: .startDownload)
		        break
		    case .error:
						//perform an action on item that got an error in downloading. (ex. remove)
		        break
		    default:
		        break
		    }
	  }
		```

	* `func downloadStateChangeNotificationName() -> String?`
		- Defines the unique StateChange notification name for download item based on item identifier
			- example: "AssetDownloadStateChanged"+identifier.md5()

	* `func downloadingProgressChangeNotificationName() -> String?`
		- Defines the unique ProgressChange notification name for download item based on item identifier
			- example: "AssetDownloadProgressChanged"+identifier.md5()

	* `func downloadButtonCustomImagesSuffix() -> String?`
		- Defines the custom images suffix for download button download states images.
		There are base sdk images for download button different states (explained in images section), custom suffix will be added to the image name lookup.
		example:
			 - item not downloaded image is `generic_item_download_btn` (value with custom suffix XYZ `generic_item_download_btnXYZ`)
			 - item download progress image `generic_item_downloading_btn_1` (value with custom suffix XYZ `generic_item_downloading_btnXYZ_1`)

2. Create a download button container on screen.
3. Add download button to the container.

***

<a name="images" />

##### Download button states images

Download button states default images are defined in Zapp SDK and attached to the app.
* *Mandatory* button states images:
	- Start Download Button image - `generic_item_download_btn`
	- Completed Download Button image - `generic_item_downloaded_btn`
	- Error Download Button image - `generic_item_error_btn`

* *Optional* button states images:
	- Pending Download Button image - `generic_item_pending_download`.
		- If image added to the SDK, it will appear on pending download state, otherwise the default native animation will appear.
	- Downloading - sequence of 10 images creating an animation of item downloading - `generic_item_downloading_btn_XX` (XX is 0-9).
		- If the images are not attached to the SDK, item downloading process will appear as Appstore-style download progress reflecting actual item download progress.
***
