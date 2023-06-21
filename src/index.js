const { isNumeric } = require('./util/number/isNumeric')
const { captureAnimationFrames } = require('./core/animation')
const { launchPuppeteer, openNewPage } = require('./core/puppeteer')
const { matchFrames } = require('./core/frame')

class AnimaTopia {
  constructor ({
    baselineFolder,
    actualFolder,
    diffFolder
  } = {}) {
    this.baselineFolder = baselineFolder || `${process.cwd()}/web-animation/screenshots/baseLine`
    this.actualFolder = actualFolder || `${process.cwd()}/web-animation/screenshots/actual`
    this.diffFolder = diffFolder || `${process.cwd()}/web-animation/screenshots/diff`
  }

  async matchAnimationFrames ({
    url,
    selector,
    frameRate,
    frameDelay,
    pageScreenshotDelay,
    maxCaptureDuration,
    animationName,
    cssTransitionData,
    frameImagePrefix
  } = {}) {
    this.frameRate = isNumeric(frameRate) ? frameRate : 60
    this.frameDelay = isNumeric(frameDelay) ? frameDelay : 100
    this.pageScreenshotDelay = isNumeric(pageScreenshotDelay) ? pageScreenshotDelay : 100
    this.maxCaptureDuration = isNumeric(maxCaptureDuration) ? maxCaptureDuration : 5000
    let browser = null
    try {
      browser = await launchPuppeteer()
      const page = await openNewPage({
        browser,
        url
      })
      await page.waitForSelector(selector)
      const element = await page.$(selector)
      const frameList = await captureAnimationFrames({
        page,
        element,
        animationName,
        cssTransitionData,
        frameRate: this.frameRate,
        maxCaptureDuration: this.maxCaptureDuration,
        frameDelay: this.frameDelay,
        pageScreenshotDelay: this.pageScreenshotDelay,
        baselineFolder: this.baselineFolder 
      })
      await matchFrames({
        frameList,
        animationName,
        frameImagePrefix, 
        baselineFolder: this.baselineFolder,
        actualFolder: this.actualFolder,
        diffFolder: this.diffFolder
      })
    } catch (error) {
      console.error('Error occurred during animation capture:', error)
    } finally {
      await browser.close()
    }
  }
}

module.exports = AnimaTopia
