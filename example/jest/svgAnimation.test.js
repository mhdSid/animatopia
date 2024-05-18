const { matchAnimationFrames } = require('../../src')

describe.skip('web animations', () => {
  test('<svg> animation looks as expected', async () => {
		// <SVG> Animation that runs on page load
		const matchAnimationSuccess = await matchAnimationFrames({
			url: 'http://localhost:3000/svgAnimation',
			selector: '.svgEl',
			animationName: 'svgAnim',
			frameRate: 60,
			maxCaptureDuration: 3000,
			frameDelay: 100,
			pageScreenshotDelay: 100,
			isSvg: true
		})
		expect(matchAnimationSuccess).toBe(true)
	})
})
