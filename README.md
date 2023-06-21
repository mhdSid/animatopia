# AnimaTopia

## API Description

This library leverages the power and capabilities of Visual Regression Testing by extending the scope to cover testing web animations and CSS transitions using Puppeteer.

we aim to standardize testing web animations and CSS transitions by using visual regression testing.


## What is it capable of?
If your core product relies on smooth web transitions, then this library should be used in order to garantee that each frame is as elegant as possible.

Initially, it saves all the frames of the animation as baseline images which will be compared against new actual screenshots in order to check if there is a mismatch in each and every frame.

- It saves tons of time to visually test animations.
- A great tool that detects changes and anomalies in JavaScript animations.
- It captures frame by frame screenshots of your animation or css transition based on a frame rate and frame delay values provided as inputs.


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

| Prop Name              |     Type       | Default      |
| ---------------------- | :------------: | -----------: |
| url                    |     string     |              |
| selector               |     string     |              |
| frameRate              |     number     | 60           |
| frameDelay             |     number     | 100          |
| pageScreenshotDelay    |     number     | 100          |
| maxCaptureDuration     |     number     | 500          |
| animationName          |     string     |              |
| cssTransitionData      |     object     |              |
| frameImagePrefix       |     string     |              |

