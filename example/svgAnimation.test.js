(async () => {
	const { matchAnimationFrames } = require('../src')
	// <SVG> Animation that runs on page load
	await matchAnimationFrames({
		url: 'http://localhost:3000/svgAnimation',
		selector: '.svgEl',
		animationName: 'svgAnim',
		frameRate: 60,
		maxCaptureDuration: 3000,
		frameDelay: 100,
		pageScreenshotDelay: 100,
		isSvg: true
	})
})()
