const { isNumeric } = require('./util/number/isNumeric')
const { captureAnimationFrames } = require('./core/animation')
const { launchPuppeteer, openNewPage } = require('./core/puppeteer')
const { matchFrames } = require('./core/frame')
const { INTERACTION_EVENT_MAP } = require('./constants/interactionEvents')
const { UNKNOWN_TRIGGER_ACTION_ERROR, NO_URL_ERROR, NO_SELECTOR_ERROR, NO_ANIMATION_ERROR } = require('./constants/errorMessages')
const { DEFAULT_FRAME_RATE, DEFAULT_FRAME_DELAY, DEFAULT_PAGE_SCREENSHOT_DELAY, DEFAULT_MAX_CAPTURE_DURATION } = require('./constants/defaults')

function handleDefaultValues ({
  baselineFolder,
  actualFolder,
  diffFolder,
  frameRate,
  frameDelay,
  pageScreenshotDelay,
  maxCaptureDuration
}) {
  return {
    baselineFolder: baselineFolder || `${process.cwd()}/web-animation/screenshots/baseLine`,
    actualFolder: actualFolder || `${process.cwd()}/web-animation/screenshots/actual`,
    diffFolder: diffFolder || `${process.cwd()}/web-animation/screenshots/diff`,
    frameRate: isNumeric(frameRate) ? frameRate : DEFAULT_FRAME_RATE,
    frameDelay: isNumeric(frameDelay) ? frameDelay : DEFAULT_FRAME_DELAY,
    pageScreenshotDelay: isNumeric(pageScreenshotDelay) ? pageScreenshotDelay : DEFAULT_PAGE_SCREENSHOT_DELAY,
    maxCaptureDuration: isNumeric(maxCaptureDuration) ? maxCaptureDuration : DEFAULT_MAX_CAPTURE_DURATION
  }
}

function validate ({
  url,
  selector,
  animationName,
  cssTransitionData = {},
  triggerInfo = {},
  isSvg
}) {
  const { action: triggerAction } = triggerInfo
  if (triggerAction && !INTERACTION_EVENT_MAP[triggerAction.toUpperCase()]) {
    throw new Error(UNKNOWN_TRIGGER_ACTION_ERROR(triggerAction))
  }
  if (!url) {
    throw new Error(NO_URL_ERROR)
  }
  if (!selector) {
    throw new Error(NO_SELECTOR_ERROR)
  }
  if (!isSvg && !animationName && !Object.keys(cssTransitionData).length) {
    throw new Error(NO_ANIMATION_ERROR)
  }
}

async function matchAnimationFrames ({
  baselineFolder,
  actualFolder,
  diffFolder,
  url,
  selector,
  frameRate,
  frameDelay,
  pageScreenshotDelay,
  maxCaptureDuration,
  animationName,
  cssTransitionData,
  frameImagePrefix,
  isSvg,
  triggerInfo = { triggerAction: null, triggerSelector: null }
} = {}) {
  validate({
    url,
    selector,
    animationName,
    cssTransitionData,
    triggerInfo,
    isSvg
  })
  const {
    baselineFolder: _baselineFolder,
    actualFolder: _actualFolder,
    diffFolder: _diffFolder,
    frameRate: _frameRate,
    frameDelay: _frameDelay,
    pageScreenshotDelay: _pageScreenshotDelay,
    maxCaptureDuration: _maxCaptureDuration
  } = handleDefaultValues({
    baselineFolder,
    actualFolder,
    diffFolder,
    frameRate,
    frameDelay,
    pageScreenshotDelay,
    maxCaptureDuration
  })
  let matchSuccess = false

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
      triggerInfo,
      frameRate: _frameRate,
      maxCaptureDuration: _maxCaptureDuration,
      frameDelay: _frameDelay,
      pageScreenshotDelay: _pageScreenshotDelay,
      baselineFolder: _baselineFolder,
      isSvg
    })
    if (Array.isArray(frameList) && frameList.length) {
      const results = await matchFrames({
        frameList,
        animationName,
        frameImagePrefix,
        baselineFolder: _baselineFolder,
        actualFolder: _actualFolder,
        diffFolder: _diffFolder
      })
      matchSuccess = results.every(item => item === true)
    }
  } catch (error) {
    console.error('Error occurred during animation capture:', error)
  } finally {
    await browser.close()
    return matchSuccess
  }
}

module.exports = {
  matchAnimationFrames
}
