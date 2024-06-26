const { matchAnimationFrames } = require('../../src')

jest.useRealTimers()

describe('web animations', () => {
  test('animation pulse looks as expected', async () => {
    // Animation that runs on page load
    const matchAnimationSuccess = await matchAnimationFrames({
      url: 'http://localhost:3000/SimpleAnimation',
      baselineFolder: `${process.cwd()}/web-animation/screenshots/simpleAnimation/baseLine`,
			actualFolder: `${process.cwd()}/web-animation/screenshots/simpleAnimation/actual`,
			diffFolder: `${process.cwd()}/web-animation/screenshots/simpleAnimation/diff`,
      selector: '.wrapper',
      frameRate: 60,
      maxCaptureDuration: 3000,
      frameDelay: 10,
      pageScreenshotDelay: 100,
      animationName: 'pulse-70524638'
    })
    expect(matchAnimationSuccess).toBe(true)
  })
})
