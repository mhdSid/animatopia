(async () => {
	const { matchAnimationFrames } = require('../src')
	// Animation that runs on page load
	await matchAnimationFrames({
		url: 'http://localhost:3000/webAnimation',
		selector: '.wrapper',
		frameRate: 60,
		maxCaptureDuration: 3000,
		frameDelay: 20,
		pageScreenshotDelay: 100,
		animationName: 'pulse'
	})
})()
