(async () => {
	const AnimaTopia = require('../src/index')
	
	const puppeteerWebAnimation = new AnimaTopia()
	
	await puppeteerWebAnimation.matchAnimationFrames({
		url: 'http://localhost:3000/',
		selector: '.heart',
		frameRate: 60,
		maxCaptureDuration: 3000,
		frameDelay: 20,
		pageScreenshotDelay: 100,
		animationName: 'pulsate-63aed68e',
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
