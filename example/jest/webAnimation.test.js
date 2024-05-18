const { matchAnimationFrames } = require('../../src')

describe.skip('web animations', () => {
  test('animation pulse looks as expected', async () => {
    // Animation that runs on page load
    const matchAnimationSuccess = await matchAnimationFrames({
      url: 'http://localhost:3000/SimpleAnimation',
      selector: '.wrapper',
      frameRate: 60,
      maxCaptureDuration: 3000,
      frameDelay: 30,
      pageScreenshotDelay: 100,
      animationName: 'pulse-70524638'
    })
    expect(matchAnimationSuccess).toBe(true)
  })
})
