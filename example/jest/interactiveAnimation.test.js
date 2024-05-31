const { matchAnimationFrames } = require('../../src')
const { INTERACTION_EVENT_MAP } = require('../../src/constants/interactionEvents')

describe('web animations', () => {
  test('interactive animation looks as expected', async () => {
		// Animation that is triggered on user interaction
		const matchAnimationSuccess = await matchAnimationFrames({
			url: 'http://localhost:3000/interactiveAnimation',
			baselineFolder: `${process.cwd()}/web-animation/screenshots/interactive/baseLine`,
			actualFolder: `${process.cwd()}/web-animation/screenshots/interactive/actual`,
			diffFolder: `${process.cwd()}/web-animation/screenshots/interactive/diff`,
			selector: '.wrapper',
			frameRate: 60,
			maxCaptureDuration: 3000,
			frameDelay: 20,
			pageScreenshotDelay: 100,
			animationName: 'pulse',
			triggerInfo: {
				triggerAction: INTERACTION_EVENT_MAP.CLICK,
				triggerSelector: '.wrapper'
			}
		})
		expect(matchAnimationSuccess).toBe(true)
	})
})
