(async () => {
	const { matchAnimationFrames } = require('../src')
	// CSS transition that is transformed into animation
	const success = await matchAnimationFrames({
		url: 'http://localhost:3000/cssTransition',
		selector: '.wrapper',
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
		},
		triggerInfo: {
			triggerAction: 'hover',
			triggerSelector: '.wrapper'
		}
	})
})()
