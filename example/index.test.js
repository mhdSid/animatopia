(async () => {
	const { matchAnimationFrames } = require('../src')
	
	// // Animation that runs on page load
	// await matchAnimationFrames({
	// 	url: 'http://localhost:3000/',
	// 	selector: '.wrapper',
	// 	frameRate: 60,
	// 	maxCaptureDuration: 3000,
	// 	frameDelay: 20,
	// 	pageScreenshotDelay: 100,
	// 	animationName: 'pulse'
	// })

	// // Animation that is triggered on user interaction
	// await matchAnimationFrames({
	// 	url: 'http://localhost:3000/',
	// 	selector: '.wrapper',
	// 	frameRate: 60,
	// 	maxCaptureDuration: 3000,
	// 	frameDelay: 20,
	// 	pageScreenshotDelay: 100,
	// 	animationName: 'pulse',
	// 	triggerInfo: {
	// 		triggerAction: 'click',
	// 		triggerSelector: '.wrapper'
	// 	}
	// })

	// // CSS transition that is transformed into animation
	// await matchAnimationFrames({
	// 	url: 'http://localhost:3000/',
	// 	selector: '.wrapper',
	// 	frameRate: 60,
	// 	maxCaptureDuration: 3000,
	// 	frameDelay: 20,
	// 	pageScreenshotDelay: 100,
	// 	cssTransitionData: {
	// 	  keyframes: [{offset: 0, transform: 'scale(1)'}, {offset: 1, transform: 'scale(2)'}],
	// 	  duration: 1000,
	// 	  easing: 'linear',
	// 	  iterations: 1,
	// 	  fill: '',
	// 	  delay: 0
	// 	},
	// 	triggerInfo: {
	// 		triggerAction: 'hover',
	// 		triggerSelector: '.wrapper'
	// 	}
	// })

	// <SVG> Animation that runs on page load
	await matchAnimationFrames({
		url: 'http://localhost:3000/',
		selector: '.svgEl',
		animationName: 'svgAnim',
		frameRate: 60,
		maxCaptureDuration: 3000,
		frameDelay: 20,
		pageScreenshotDelay: 100,
		isSvg: true
	})
})()
