const { matchAnimationFrames } = require('../../src')

describe('web animations', () => {
  test('<svg> animation looks as expected', async () => {
		// <SVG> Animation that runs on page load
		const matchAnimationSuccess = await matchAnimationFrames({
			url: 'http://localhost:3000/svgAnimation',
			baselineFolder: `${process.cwd()}/web-animation/screenshots/svg/baseLine`,
			actualFolder: `${process.cwd()}/web-animation/screenshots/svg/actual`,
			diffFolder: `${process.cwd()}/web-animation/screenshots/svg/diff`,
			selector: '.svgEl',
			animationName: 'svgAnim',
			frameRate: 60,
			maxCaptureDuration: 4000,
			frameDelay: 10,
			pageScreenshotDelay: 100,
			isSvg: true
		})
		expect(matchAnimationSuccess).toBe(true)
	})
})
