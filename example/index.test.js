(async () => {
	const { matchAnimationFrames } = require('../src')
		
	await matchAnimationFrames({
		url: 'http://localhost:3000/',
		selector: '.wrapper',
		frameRate: 60,
		maxCaptureDuration: 3000,
		frameDelay: 20,
		pageScreenshotDelay: 100,
		animationName: 'pulse',
		// cssTransitionData: {
		//   keyframes: [{offset: 0, transform: 'scale(1)'}, {offset: 1, transform: 'scale(2)'}],
		//   duration: 1000,
		//   easing: 'linear',
		//   iterations: 1,
		//   fill: '',
		//   delay: 0
		// }
	})
})()
