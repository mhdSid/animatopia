(async () => {
	const { matchAnimationFrames } = require('../src')
	// Animation that is triggered on user interaction
	await matchAnimationFrames({
		url: 'http://localhost:3000/interactiveAnimation',
		selector: '.wrapper',
		frameRate: 60,
		maxCaptureDuration: 3000,
		frameDelay: 20,
		pageScreenshotDelay: 100,
		animationName: 'pulse',
		triggerInfo: {
			triggerAction: 'click',
			triggerSelector: '.wrapper'
		}
	})
})()
