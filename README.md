# AnimaTopia

## API Description

The Animation Regression Testing Library is a powerful tool designed to facilitate automated testing of animations in web applications and game engines.
It allows developers and designers to ensure that animations behave as intended, providing a seamless and visually appealing user experience.

## Key Features:

### Declarative API: 
The library offers a declarative API that understands CSS transitions as web animations.
Developers can define animations and CSS transitions using Web Animation Interface for testing purposes.
This approach simplifies the testing process and aligns with existing animation development workflows.

The core functionality is currently being worked on to be imported to popular game engines such as **Unity**.

### Cross-Platform Compatibility: (TO-DO)
The library is designed to be versatile and can be adapted for various platforms, including web, WebGL, Unity, and other game engines.
Developers can leverage the library's core functionality and methodologies across different animation contexts, enabling consistent and efficient testing.

### Visual Regression Testing: 
The library employs visual regression testing techniques to compare frames and detect any visual differences between animation states.
By capturing and analyzing frames at various points during an animation, developers can ensure visual accuracy and identify potential issues, such as unexpected artifacts or glitches.

### Automation and Integration: (TO-DO)
Integration with testing frameworks and automation tools allows for seamless incorporation into existing testing pipelines.
Developers can automate animation tests, execute them in a controlled environment, and receive actionable feedback on animation behavior, helping them deliver high-quality and visually polished applications.

### Flexible and Extensible: 
The library is designed with flexibility in mind, allowing developers to customize and extend its functionality to suit specific testing requirements.
It provides hooks and callbacks for incorporating additional logic, handling animation events, and integrating with other testing frameworks or tools.
Benefits:

### Improved Animation Quality: 
By integrating the Animation Regression Testing Library into the development process, developers can catch animation-related issues early, resulting in higher-quality animations that enhance the overall user experience.
Time and Effort Savings: Automated testing eliminates the need for manual inspection of animations, reducing the time and effort required for regression testing. Developers can focus on creating and fine-tuning animations, knowing that they will be automatically validated.

### Cross-Platform Consistency: 
The library's cross-platform compatibility ensures that animations behave consistently across different environments, such as web browsers, game engines, and other platforms. This consistency is crucial for delivering a cohesive user experience across multiple devices and platforms.

## Technical Description:

### Overview:
The Animation Regression Testing Library is implemented as a JavaScript library that leverages the web animations API and visual regression testing techniques.

### Core Functionality:

#### Frame Capture: 
The library captures frames at various points during the animation, utilizing platform-specific mechanisms such as requestAnimationFrame or native APIs. The captured frames are stored for subsequent comparison and analysis.

#### Frame Comparison: 
Visual regression testing is performed by comparing the captured frames with reference frames or baseline images. Various image comparison algorithms are employed to identify visual differences, including pixel-level comparisons, color thresholding, and structural similarity index measurements.


## What is it capable of?
If your core product relies on smooth web transitions, then this library should be used in order to garantee that each frame is as elegant as possible.

Initially, it saves all the frames of the animation as baseline images which will be compared against new actual screenshots in order to check if there is a mismatch in each and every frame.

- It saves tons of time to visually test animations.
- A great tool that detects changes and anomalies in JavaScript animations.
- It captures frame by frame screenshots of your animation or css transition based on a frame rate and frame delay values provided as inputs.

<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_0_0.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_1_18.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_2_58.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_3_96.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_4_140.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_5_182.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_6_222.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_7_263.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_8_302.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_9_342.png" width="400" height="400"/>
<img style="display: inline-block; margin: 8px;" src="./example/web-animation/screenshots/baseLine/pulse_10_382.png" width="400" height="400"/>

## What is still missing?
 1. Support multile animations per element
 2. Support for game engines
 3. Support for WebGl

## Usage

### Test Web Animations

```
const AnimaTopia = require('animatopia')
	
const webAnimationTest = new AnimaTopia()
	
await webAnimationTest.matchAnimationFrames({
	url: 'http://localhost:3000/',
	selector: '.heart',
	frameRate: 60,
	maxCaptureDuration: 3000,
	frameDelay: 20,
	pageScreenshotDelay: 100,
	animationName: 'pulsate-63aed68e'
})
```

### Declarative Testing of CSS Transitions by declaring them as Web Animations

```
const AnimaTopia = require('animatopia')
	
const webAnimationTest = new AnimaTopia()
	
await webAnimationTest.matchAnimationFrames({
	url: 'http://localhost:3000/',
	selector: '.heart',
	frameRate: 60,
	maxCaptureDuration: 3000,
	frameDelay: 20,
	pageScreenshotDelay: 100,
	cssTransitionData: {
		keyframes: [{offset: 0, transform: 'scale(1)'}, {offset: 1, transform: 'scale(2)'}],
		duration: 1000,
		easing: 'linear',
		iterations: 1,
		fill: '',
		delay: 0
	}
})
```

### Constructor

| Prop Name       |     Type       | Default                                                 |
| --------------- | :------------: | ------------------------------------------------------: |
| baselineFolder  |     string     |   `${process.cwd()}/web-animation/screenshots/baseLine` |
| actualFolder    |     string     |   `${process.cwd()}/web-animation/screenshots/actual`   |
| diffFolder      |     string     |   `${process.cwd()}/web-animation/screenshots/diff`     |


### matchAnimationFrames

| Prop Name              |     Type                    | Default      |
| ---------------------- | :-------------------------: | -----------: |
| url                    |     string                  |              |
| selector               |     string                  |              |
| frameRate              |     number                  | 60           |
| frameDelay             |     number                  | 100          |
| pageScreenshotDelay    |     number                  | 100          |
| maxCaptureDuration     |     number                  | 500          |
| animationName          |     string                  |              |
| cssTransitionData      |     Web Animation Object    |              |
| frameImagePrefix       |     string                  |              |

[Web Animation Object](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
