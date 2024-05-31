const { matchAnimationFrames } = require('../../src')
const { INTERACTION_EVENT_MAP } = require('../../src/constants/interactionEvents')

describe('web animations', () => {
  test('css transition looks as expected', async () => {
		// CSS transition that is transformed into animation
		const matchAnimationSuccess = await matchAnimationFrames({
			url: 'http://localhost:3000/cssTransition',
			baselineFolder: `${process.cwd()}/web-animation/screenshots/css/baseLine`,
			actualFolder: `${process.cwd()}/web-animation/screenshots/css/actual`,
			diffFolder: `${process.cwd()}/web-animation/screenshots/css/diff`,
			selector: '.wrapper',
			frameRate: 60,
			maxCaptureDuration: 3000,
			frameDelay: 30,
			pageScreenshotDelay: 100,
			animationName: 'myCssAnimation',
			cssTransitionData: {
				keyframes: [{offset: 0, transform: 'scale(1)'}, {offset: 1, transform: 'scale(2)'}],
				duration: 1000,
				easing: 'linear',
				iterations: 1,
				fill: '',
				delay: 0
			},
			triggerInfo: {
				triggerAction: INTERACTION_EVENT_MAP.MOUSEOVER,
				triggerSelector: '.wrapper'
			}
		})
		expect(matchAnimationSuccess).toBe(true)
	})
})