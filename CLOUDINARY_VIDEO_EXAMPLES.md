# Cloudinary Video Examples and Documentation

This document contains comprehensive examples and documentation for Cloudinary video transformations, optimizations, and integrations across various platforms and frameworks.

## Table of Contents

- [Custom Video Transitions](#custom-video-transitions)
- [Product Gallery Integration](#product-gallery-integration)
- [Video Overlays](#video-overlays)
- [Video Concatenation](#video-concatenation)
- [Flutter Video Transformations](#flutter-video-transformations)
- [Next.js Video Optimization](#nextjs-video-optimization)
- [Node.js Video Manipulation](#nodejs-video-manipulation)
- [React Video Transformations](#react-video-transformations)
- [Video Player API Reference](#video-player-api-reference)
- [Advanced Video Features](#advanced-video-features)

---

## Custom Video Transitions

Source: https://cloudinary.com/documentation/video_trimming_and_concatenating

Demonstrates concatenating two videos with a custom transition using Cloudinary's URL API. It includes a base video, an overlay video for the transition, and a second video.

```URL
https://res.cloudinary.com/demo/video/upload/du_5.0/c_fit,h_200,w_300/l_video:sunglasses/c_fit,h_200,w_300/du_5.0/e_transition,l_video:transition1/fl_layer_apply/fl_layer_apply/walking.mp4
```

### Interactive Cross Fade Demo URL

Provides a URL to an interactive demo for experimenting with different cross-fade transitions between videos.

```URL
https://res.cloudinary.com/demo/video/upload/du_4/fl_splice:transition_(name_fade;du_2),
l_video:docs:kitchen/du_4/fl_layer_apply/docs/livingspace.mp4
```

---

## Product Gallery Integration

Source: https://cloudinary.com/documentation/product_gallery

Populate the `mediaAssets` parameter with an Asset object specifying the `tag` for videos or the `public_id` of a video asset, and set `mediaType` to 'video'. This example shows how to display all videos with the 'shirt' tag.

```javascript
const myGallery = cloudinary.galleryWidget({
  container: "#my-gallery",
  cloudName: "demo",
  mediaAssets: [
    {
      tag: "shirt",
      mediaType: "video",
    },
  ],
});
```

---

## Video Overlays

Source: https://cloudinary.com/documentation/flutter_media_transformations

Add video, text, or image overlays onto existing videos. This example scales down a video and places it in the north-east corner as an overlay, starting 3 seconds after the main video begins playing.

```Dart
(CloudinaryContext.cloudinary.video('dog_mirror')
  ..transformation(Transformation()
    ..resize(Resize.scale()..width(300))
    ..addTransformation('l_video:exercise2/c_fit,w_80/bo_2px_solid_blue/fl_layer_apply,g_north_east,so_2.0')
  )
).toString();

// Output: https://res.cloudinary.com/demo/video/upload/c_scale,w_300/l_video:exercise2/c_fit,w_80/bo_2px_solid_blue/fl_layer_apply,g_north_east,so_2.0/v1/exercise1
```

### Overlay Video with Rounded Corners

Source: https://cloudinary.com/documentation/video_effects_and_enhancements

This example demonstrates overlaying a video with specific dimensions and rounded corners, applying gravity, and scaling the main video.

```URL
https://res.cloudinary.com/demo/video/upload/c_scale,w_300/l_video:man_talking/c_fill,h_100,w_100/r_max/fl_layer_apply,g_north_east/man_on_phone.mp4
```

### Add Watermark with Gravity and Opacity

Source: https://cloudinary.com/documentation/video_transformations_tutorial

Brand videos by overlaying an image as a watermark. Position it in the top right corner using `gravity: north_east` with margins (`x:10, y:10`). Set the watermark's width to 40 pixels and opacity to 80%. The `layer_apply` flag concludes the overlay transformation.

```Node.js
(async() => {
  let videoURL = cloudinary.url("docs/video_features_tutorial/hair", {
    resource_type: "video",
    transformation: [
      { aspect_ratio: "3:4", crop: "fill", gravity: "north", width: 250 },
      { duration: "5" },
      { duration: "5", flags: "splice", overlay: "video:docs:video_features_tutorial:makeup" },
      { aspect_ratio: "3:4", crop: "fill", gravity: "north", width: 250 },
      { flags: "layer_apply" },
      { overlay: "video:docs:video_features_tutorial:romeo_and_juliet" },
      { flags: "layer_apply" },
      { overlay: "cloudinary_icon" },
      { width: 40, x: 10, y: 10 },
      { opacity: 80 },
      { flags: "layer_apply", gravity: "north_east" },
      { overlay: { resource_type: "subtitles", public_id: "docs/video_features_tutorial/captions.srt" } },
      { flag: "layer_apply" }
    ]
  });
})();
```

---

## Video Concatenation

Source: https://cloudinary.com/documentation/dart_media_transformations

Concatenates two videos with specific transformations. This example shortens both videos to 5 seconds, starts the main video at a 1-second offset, resizes both to 300px height and 450px width, and splices them together.

```Dart
(cloudinary.video('horse_race')
  ..transformation(Transformation()
    ..resize(Resize.fill()..height(300)..width(450))
    ..addTransformation('du_5.0,so_1/fl_splice,l_video:swimming_race/c_fill,h_300,w_450/du_5.0/fl_layer_apply')
  )
).toString();

// Output: https://res.cloudinary.com/demo/video/upload/c_fill,h_300,w_450/du_5.0,so_1/fl_splice,l_video:swimming_race/c_fill,h_300,w_450/du_5.0/fl_layer_apply/v1/horse_race
```

### Concatenate Videos with Cloudinary Go SDK

Source: https://cloudinary.com/documentation/go_media_transformations

Concatenates videos using the Cloudinary Go SDK. This example demonstrates shortening videos, applying transformations, and splicing them together. It utilizes the `fl_splice` flag for concatenation.

```Go
// Instantiate an object for the video with public ID "docs/sdk/go/horse_race"
v_races, err := cld.Video("docs/sdk/go/horse_race")
if err != nil {
    fmt.Println("error")
}

// Add the transformation
v_races.Transformation = "c_fill,h_300,w_450/du_5.0,so_1/fl_splice,l_video:swimming_race/c_fill,h_300,w_450/du_5.0/fl_layer_apply"

// Generate and print the delivery URL
myURL, err := v_races.String()
if err != nil {
    fmt.Println("error")
}
fmt.Println(myURL)

// Output: https://res.cloudinary.com/demo/video/upload/c_fill,h_300,w_450/du_5.0,so_1/fl_splice,l_video:swimming_race/c_fill,h_300,w_450/du_5.0/fl_layer_apply/v1/docs/sdk/go/horse_race
```

### Splice Videos using Node.js SDK

Source: https://cloudinary.com/documentation/transformation_tutorials

Learn how to splice two videos together using the Cloudinary Node.js SDK. This tutorial demonstrates how to programmatically combine multiple video clips into a single video.

```Node.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (replace with your actual credentials)
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

const videoUrl = cloudinary.url('samples/elephants.mp4', {
  resource_type: 'video',
  transformation: [
    {
      flags: 'splice',
      overlay: 'video:samples:sea-turtle',
    },
    {
      flags: 'layer_apply'
    },
  ]
});

console.log(videoUrl);
```

### Node.js Video Splicing

Source: https://cloudinary.com/documentation/trim_videos_nodejs_tutorial

Demonstrates how to splice two videos together using the Cloudinary Node.js SDK.

```Node.js
const cloudinary = require('cloudinary').v2;

// Configuration (replace with your actual credentials)
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

async function spliceVideos(video1Url, video2Url, outputPublicId) {
  try {
    const result = await cloudinary.uploader.upload(
      `video:${video1Url}/splice:${video2Url}`,
      {
        resource_type: 'video',
        public_id: outputPublicId,
        // Add transformation options here if needed
      }
    );
    console.log('Videos spliced successfully:', result.secure_url);
    return result;
  } catch (error) {
    console.error('Error splicing videos:', error);
    throw error;
  }
}

// Example usage:
// spliceVideos('cloudinary://video1_url', 'cloudinary://video2_url', 'spliced_video');
```

---

## Flutter Video Transformations

Source: https://cloudinary.com/documentation/flutter_media_transformations

Explore video transformation capabilities with Cloudinary's Flutter SDK. This covers resizing, cropping, concatenating, trimming videos, adding video overlays, and applying video effects for enhanced media delivery.

```dart
// Example: Resizing and cropping a video
// CldVideoWidget(videoUrl: '...', transformations: [Transformation().resize(width: 320, height: 240)])

// Example: Concatenating videos
// CldVideoWidget(videoUrl: '...', transformations: [Transformation().concat(videos: ['video1_url', 'video2_url'])])

// Example: Trimming videos
// CldVideoWidget(videoUrl: '...', transformations: [Transformation().trim(startOffset: 10, endOffset: 20)])

// Example: Adding video overlays
// CldVideoWidget(videoUrl: '...', transformations: [Transformation().overlay(imageUrl: 'overlay_image_url')])

// Example: Adding video effects
// CldVideoWidget(videoUrl: '...', transformations: [Transformation().effect('blur')])
```

### Flutter Video Player Example

Source: https://cloudinary.com/documentation/flutter_video_player

A complete Flutter application example showcasing the integration of `CldVideoController` with the `VideoPlayer` widget. It includes initialization, display, and basic play/pause controls for a video.

```dart
import 'package:cloudinary_flutter/cloudinary_object.dart';
import 'package:cloudinary_flutter/video/cld_video_controller.dart';
import 'package:cloudinary_url_gen/cloudinary.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

void main() => runApp(const VideoApp());

/// Stateful widget to fetch and then display video content.
class VideoApp extends StatefulWidget {
  const VideoApp({super.key});

  @override
  _VideoAppState createState() => _VideoAppState();
}

class _VideoAppState extends State<VideoApp> {
  late CldVideoController _controller;
  Cloudinary cloudinary = CloudinaryObject.fromCloudName(cloudName: 'demo');

  @override
  void initState() {
    super.initState();
    _controller = CldVideoController(cloudinary: cloudinary, publicId: 'dog')
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Video Demo',
      home: Scaffold(
        body: Center(
          child: _controller.value.isInitialized
              ? AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  child: VideoPlayer(_controller),
                )
              : Container(),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              _controller.value.isPlaying ? _controller.pause() : _controller.play();
            });
          },
          child: Icon(
            _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }
}
```

### Create Cloudinary Video Instance (Dart)

Source: https://cloudinary.com/documentation/sdks/dart/url-gen/cloudinary/Cloudinary/video

Creates a new `CldVideo` instance using the current configuration. This method takes the public ID of the video as a String and returns a `CldVideo` object.

```dart
CldVideo video(String publicId) {
  CldVideo video = CldVideo(publicId);
  video.cloudConfig(config.cloudConfig);
  video.urlConfig(config.urlConfig);
  return video;
}
```

---

## Next.js Video Optimization

Source: https://cloudinary.com/documentation/nuxt_image_optimization_tutorial

A video tutorial demonstrating how to optimize videos using Cloudinary within a Next.js application.

```Video Tutorial
Optimize videos in Next.js (video tutorial)
```

### Optimize Videos in Next.js

Source: https://cloudinary.com/documentation/optimize_videos_nextjs_tutorial

This video tutorial teaches you how to optimize the delivery of videos in a Next.js app by using the `CldVideoPlayer` component of the Next Cloudinary library, which embeds the Cloudinary Video Player.

**Key Features:**

- Automatic format optimization (HLS, DASH, MP4)
- Adaptive bitrate streaming
- Responsive video delivery
- Built-in performance optimizations

**Basic Usage:**

```jsx
import { CldVideoPlayer } from "next-cloudinary";

<CldVideoPlayer
  width="1920"
  height="1080"
  src="your-video-id"
  autoPlay={true}
  loop={true}
  muted={true}
  controls={false}
  playsinline={true}
  sourceTypes={["hls", "dash", "mp4"]}
  transformation={{
    streaming_profile: "hd",
    quality: "auto:low",
  }}
  poster="your-poster-image-id"
/>;
```

---

## Node.js Video Manipulation

Source: https://cloudinary.com/documentation/node_video_manipulation

Builds a video URL with multiple transformations including start/end offsets, boomerang effect, scaling, overlays, and layer application. This example demonstrates advanced video manipulation for specific clip segments.

```Node.js
cloudinary.url("docs/sunglasses.mp4", {
  resource_type: "video",
  transformation: [
    { start_offset: "7.5", end_offset: "10.0" },
    { effect: "boomerang" },
    { width: "0.2", crop: "scale" },
    { overlay: "cloudinary" },
    { opacity: 90 },
    { height: 25, crop: "scale" },
    { flags: "layer_apply", gravity: "north_east" }
  ]
})
```

### Video URL with Transformations (Node.js)

Source: https://cloudinary.com/documentation/node_video_manipulation

Builds a video URL with multiple transformations including start/end offsets, boomerang effect, scaling, overlays, and layer application. This example demonstrates advanced video manipulation for specific clip segments.

```Node.js
cloudinary.url("docs/sunglasses.mp4", {
  resource_type: "video",
  transformation: [
    { start_offset: "7.5", end_offset: "10.0" },
    { effect: "boomerang" },
    { width: "0.2", crop: "scale" },
    { overlay: "cloudinary" },
    { opacity: 90 },
    { height: 25, crop: "scale" },
    { flags: "layer_apply", gravity: "north_east" }
  ]
})
```

### Create Product Video with Chained Transformations

Source: https://cloudinary.com/documentation/video_manipulation_and_delivery

Shows a Node.js example of using the Cloudinary SDK to create a product video by chaining multiple transformations, including aspect ratio, cropping, overlays, and subtitles.

```Node.js
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({ secure: true });

// Log the configuration
// console.log(cloudinary.config());

////////////////////// Main function////////////////////
(async() => {
  let videoURL = cloudinary.url("docs/video_features_tutorial/hair", {
    resource_type: "video",
    transformation: [
      { aspect_ratio: "3:4", crop: "fill", gravity: "north", width: 250 },
      { duration: "5" },
      { duration: "5", flags: "splice", overlay: "video:docs:video_features_tutorial:makeup" },
      { aspect_ratio: "3:4", crop: "fill", gravity: "north", width: 250 },
      { flags: "layer_apply" },
      { overlay: "video:docs:video_features_tutorial:romeo_and_juliet" },
      { flags: "layer_apply" },
      { overlay: { resource_type: "subtitles", public_id: "docs/video_features_tutorial/captions.srt" } },
      { flag: "layer_apply" }
    ]
  });

  console.log(videoURL);
})();
```

### JavaScript Video Transformations

Source: https://cloudinary.com/documentation/control_access_to_media

Discover how to perform video transformations with the Cloudinary JavaScript SDK. This covers video resizing, format conversion, and other video manipulations.

```JavaScript
const cloudinary = require('cloudinary').v2;

const videoUrl = cloudinary.url('my_video', {
  transformation: [
    { width: 500, height: 300, crop: 'scale' },
    { fetch_format: 'auto' }
  ]
});
console.log(videoUrl);
```

---

## React Video Transformations

Source: https://cloudinary.com/documentation/react_video_transformations

Demonstrates how to create a Cloudinary video instance, apply transformations (resize, round corners, focus on faces), and render the transformed video using the AdvancedVideo component in React.

```javascript
import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

const App = () => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({ cloud: { cloudName: "demo" } });

  // Use the video with public ID, 'docs/walking_talking'.
  const myVideo = cld.video("docs/walking_talking");

  // Apply the transformation.
  myVideo
    .resize(
      fill()
        .width(150)
        .height(150)
        .gravity(
          Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces()))
        )
    )
    // Crop the video, focusing on the faces.
    .roundCorners(byRadius(20)); // Round the corners.

  // Render the transformed video in a React component.
  return (
    <div>
      <AdvancedVideo cldVid={myVideo} controls />
    </div>
  );
};
```

### AdvancedVideo Component: cldPoster Example (Transformed Video)

Source: https://cloudinary.com/documentation/react_video_transformations

Illustrates setting the `cldPoster` property of the `AdvancedVideo` component using a transformed video object, specifically converting it to JPG format to serve as the poster image.

```javascript
<AdvancedVideo cldVid={myVideo} cldPoster={myVideo.format("jpg")} controls />
```

---

## Video Player API Reference

Source: https://cloudinary.com/documentation/video_player_tutorials

Documentation for the Cloudinary Video Player, a customizable and responsive HTML5 video player for embedding and controlling video playback.

### Features:

- Responsive design
- Playback controls (play, pause, volume, fullscreen)
- Customizable UI elements
- Supports adaptive bitrate streaming

### Basic Usage (JavaScript):

```html
<video
  id="my-video"
  data-public-id="my_video"
  data-cloud-name="my_cloud"
></video>
<script>
  Cloudinary.player("my-video").play();
</script>
```

### Advanced Features:

- **HLS/DASH Support**: Automatic format selection for optimal streaming
- **Accessibility**: Full keyboard navigation and screen reader support
- **Analytics**: Built-in video analytics and event tracking
- **Monetization**: Support for video ads and revenue generation
- **Live Streaming**: Real-time video streaming capabilities

---

## Advanced Video Features

### Video Effects and Enhancements

#### Vertically Flip and Rotate Video

Source: https://cloudinary.com/documentation/video_effects_and_enhancements

This example shows how to vertically flip a video and then rotate it by 45 degrees, resulting in a bounding box.

```URL
https://res.cloudinary.com/demo/video/upload/a_vflip.45/docs/hotel-slow-motion-waterfall.mp4
```

#### Video Clipping, Boomerang Effect, Resizing, and Overlay

Source: https://cloudinary.com/documentation/rails_video_manipulation

This example demonstrates extracting a video segment (7.5 to 10 seconds), applying a boomerang (reverse) effect, resizing, and adding an overlay with specific opacity and gravity using direct URL building with the Cloudinary Ruby SDK.

```Ruby
Cloudinary::Utils.cloudinary_url("docs/sunglasses.mp4", {
  resource_type: "video",
  transformation: [
    { start_offset: "7.5", end_offset: "10.0" },
    { effect: "boomerang" },
    { width: 0.2, crop: "scale" },
    { overlay: "cloudinary" },
    { opacity: 90 },
    { height: 25, crop: "scale" },
    { flags: "layer_apply", gravity: "north_east" }
  ]
})
```

```URL
https://res.cloudinary.com/demo/video/upload/eo_10.0,so_7.5/e_boomerang/c_scale,w_0.2/l_cloudinary/o_90/c_scale,h_25/fl_layer_apply,g_north_east/docs/sunglasses
```

### Video Clipping, Looping, and Resizing

Source: https://cloudinary.com/documentation/rails_video_manipulation

This example shows how to extract a segment of a video (from 1 to 3 seconds), loop it 3 times, and resize it to 20% of its original width using direct URL building with the Cloudinary Ruby SDK.

```Ruby
Cloudinary::Utils.cloudinary_url("docs/sunglasses.mp4", {
  resource_type: "video",
  transformation: [
    { start_offset: "1", end_offset: "3" },
    { effect: "loop:3" },
    { width: 0.2, crop: "scale" }
  ]
})
```

```URL
https://res.cloudinary.com/demo/video/upload/so_1,eo_3/e_loop:3/c_scale,w_0.2/docs/sunglasses
```

### Video Transformation: Looping and Cropping

Source: https://cloudinary.com/documentation/django_video_manipulation

Generates a video tag where the first 10 seconds loop continuously. The video is cropped to 360x480 using 'pad' method and generated at 70% quality.

```Python
CloudinaryVideo("blue_sports_car").video(
  loop=True,
  controls=True,
  transformation = {
    "height": 360,
    "width": 480,
    "quality": 70,
    "duration": 10,
    "crop": "pad"
  },
  fallback_content="Your browser does not support HTML5 video tags."
)
```

### Chained Video Transformations

Source: https://cloudinary.com/documentation/video_manipulation_and_delivery

Illustrates how to chain multiple video transformation parameters in a single Cloudinary delivery URL, such as cropping, blurring, and rounding corners.

```URL
https://res.cloudinary.com/demo/video/upload/ar_1:1,c_fill,g_auto,w_300/e_blur:50/r_max/ship.mp4
```

### Chaining Video Transformations

Source: https://cloudinary.com/documentation/transformation_basics_tutorial

Apply transformations to videos similarly to images. This example demonstrates adding a text overlay to a video using the `l_` parameter for the text and `fl_layer_apply` for positioning.

```URL
https://res.cloudinary.com/demo/video/upload/ar_2:3,c_fill,g_auto,w_500/l_text:times_80_bold:Beach Life/fl_layer_apply,g_north,y_25/docs/beach-walking.mp4
```

---

## Conditional Video Transformations

### Cloudinary Conditional Image Overlay by Tags

Source: https://cloudinary.com/documentation/video_conditional_expressions

Adds a 'sale' icon to a product video if its tags include both 'sale' and 'in_stock'. This demonstrates conditional image overlays based on multiple tag conditions.

```URL
https://res.cloudinary.com/demo/video/upload/if_!sale:in_stock!_in_tags/l_sale_icon/c_scale,w_200/fl_layer_apply,g_north_west,x_30,y_30/if_end/c_scale,w_300/docs/sunglasses.mp4
```

### Cloudinary Conditional Resize by Metadata

Source: https://cloudinary.com/documentation/video_conditional_expressions

Resizes a video to a 200x200 square if it has a contextual metadata key 'productType' with the value 'shoes'. This showcases conditional transformations based on specific metadata.

```URL
https://res.cloudinary.com/demo/video/upload/if_ctx:!productType!_eq_!shoes!/ar_1:1,c_fill,w_200/if_end/docs/walking.mp4
```

### Multiple AND Conditions for Cropping

Source: https://cloudinary.com/documentation/video_conditional_expressions

Crops a video to a portrait orientation with a width of 500px only if its aspect ratio is greater than 0.65 AND its width is greater than 500px. If either condition is false, the original video is delivered.

```URL
https://res.cloudinary.com/demo/video/upload/if_ar_gt_0.65_and_w_gt_500/ar_0.65,c_fill,w_500/if_end/snow_horses.mp4
```

---

## Video Optimization and Best Practices

### Cloudinary Video Transformation Example

Source: https://cloudinary.com/documentation/video_best_practices

This example demonstrates applying multiple video transformations, including aspect ratio, cropping, progress bar effect, and format optimization, using a Cloudinary URL. It showcases dynamic video manipulation for various platforms.

```URL
https://res.cloudinary.com/demo/video/upload/ar_9:16,c_fill,g_auto,w_300/e_progressbar:type_frame:width_5:color_62BDFF/f_auto/q_auto/docs/shoppable_demo.mp4
```

### Video Upload and Transformation Tutorial

Source: https://cloudinary.com/documentation/video_management_intro_tutorial

This tutorial guides users through uploading video content to Cloudinary's Media Library, understanding video formats for web delivery, optimizing videos, setting video codecs, applying aesthetic transformations, and chaining transformations.

**Tutorial Steps:**

1. Upload video content using the Upload Widget in the Media Library.
2. Understand web-friendly vs. non-web-friendly video formats and Cloudinary's conversion capabilities (e.g., MP4, WebM).
3. Optimize video for web delivery by accessing the transformation editor.
4. Set the 'video_codec' parameter to 'auto' for normalization and web optimization.
5. Apply aesthetic changes, such as overlaying a logo in a specific corner.
6. Chain multiple transformations for customization.

---

## Platform-Specific Examples

### .NET Video Transformation Example

Source: https://cloudinary.com/documentation/dotnet_video_manipulation

Demonstrates building a video URL with transformations like start/end offsets, boomerang effect, resizing, overlays, and opacity using the Cloudinary .NET SDK.

```.NET
cloudinary.Api.UrlVideoUp.Transform(new Transformation()
  .StartOffset("7.5")
  .EndOffset("10.0")
  .Chain()
  .Effect("boomerang")
  .Chain()
  .Width(0.2)
  .Crop("scale")
  .Chain()
  .Overlay(new Layer().PublicId("cloudinary"))
  .Chain()
  .Opacity(90)
  .Chain()
  .Height(25)
  .Crop("scale")
  .Chain()
  .Flags("layer_apply")
  .Gravity("north_east")
).Secure(true).BuildUrl("dog")
```

### Android Video Transformations

Source: https://cloudinary.com/documentation/llms

Transcode video formats, set quality, trim, concatenate videos, and utilize CDN delivery for videos with Cloudinary for Android.

```Android
https://cloudinary.com/documentation/android_video_manipulation.md
```

---

## Video Player Integration

### Insert Video from Cloudinary

Source: https://cloudinary.com/documentation/sfcc_page_designer_video_component

Steps to insert a video from your Cloudinary Media Library into the Cloudinary Video Component. This includes opening the configuration panel, selecting 'Choose Video', and picking a video from the Media Library.

```Markdown
1. To configure the Cloudinary Video Component, click the embedded component to open the **Cloudinary Video Component** configuration panel.

2. To insert a video from your Cloudinary product environment, click **Choose Video**. The **Media Library** opens.
3. Select the video you want to insert and click **Insert**.
```

---

## Video Analytics and Monitoring

### View Video Details and Delivery

Source: https://cloudinary.com/documentation/salesforce_site_cartridge_using_videos_tutorial

Inspect individual videos to see how they are delivered with Cloudinary's optimizations and transformations, based on cartridge configuration.

**Inspect a particular video:**
See that it's delivered with Cloudinary's optimizations and transformations based on how the cartridge has been configured.

---

## Video Tutorials and Learning Resources

### Cloudinary Video Tutorials

Source: https://cloudinary.com/documentation/video_transformations_tutorial

Links to video tutorials demonstrating specific Cloudinary features for video manipulation.

**Available Tutorials:**

- Zoompan effect (video tutorial)
- Crop and resize images in React (video tutorial)
- Crop and resize images in Python (video tutorial)

### Cloudinary Video Tutorials

Source: https://cloudinary.com/documentation/crop_and_resize_videos_in_react_tutorial

Links to video tutorials demonstrating how to crop and resize images using Cloudinary, with examples for React and Python.

**Available Tutorials:**

- Crop and resize images in React (video tutorial)
- Crop and resize images in Python (video tutorial)

---

## Video Add-ons and Extensions

### Cloudinary Video Add-ons

Source: https://cloudinary.com/documentation/video_addons

Documentation for various video add-ons and extensions available in Cloudinary.

**Available Add-ons:**

- Video transcription
- Video moderation
- Video analytics
- Live streaming
- Video effects and enhancements

---

## User-Generated Content

### Cloudinary Video Player for UGC

Source: https://cloudinary.com/documentation/user_generated_content

Documentation for the Cloudinary Video Player, a customizable and responsive HTML5 video player for embedding and controlling video playback in user-generated content scenarios.

**Features:**

- Responsive design
- Playback controls (play, pause, volume, fullscreen)
- Customizable UI elements
- Supports adaptive bitrate streaming

**Usage (JavaScript):**

```html
<video
  id="my-video"
  data-public-id="my_video"
  data-cloud-name="my_cloud"
></video>
<script>
  Cloudinary.player("my-video").play();
</script>
```

---

## Video Workflow Automation

### Condition Block: Is it a video?

Source: https://cloudinary.com/documentation/delete_temporary_ugc_assets

Sets up a Condition block to check if an asset's resource type is 'video'. Connects from the false output of the 'Is it an image' block.

**Condition Block (Is it a video?):**

- **Input:** False output of 'Is it an image' Condition block
- **Settings:**
  - Name: Is it a video
  - First variable: Resource type (from Iterate Assets)
  - Operator: equal_to
  - Second variable: video
  - Variable type: String
- **Outputs:**
  - True: If resource type is 'video'
  - False: If resource type is neither 'image' nor 'video' (presumed raw file)

---

## Video Codec and Format Optimization

### Video and Audio Optimization

Source: https://cloudinary.com/documentation/video_and_audio_optimization

Documentation for optimizing video and audio content for web delivery using Cloudinary's advanced compression and format conversion capabilities.

**Key Features:**

- Automatic format selection (MP4, WebM, HLS, DASH)
- Quality optimization based on network conditions
- Adaptive bitrate streaming
- Codec optimization for different devices and browsers

---

## Video Security and Access Control

### Control Access to Media

Source: https://cloudinary.com/documentation/control_access_to_media

Documentation for controlling access to video content, including signed URLs, token-based authentication, and IP restrictions.

**Security Features:**

- Signed URLs for secure video delivery
- Token-based authentication
- IP address restrictions
- Time-based access controls
- Geographic restrictions

---

This documentation provides comprehensive examples and references for working with Cloudinary video transformations, optimizations, and integrations across various platforms and frameworks. Use these examples as a starting point for implementing video features in your applications.
