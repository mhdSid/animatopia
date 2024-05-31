const { generateAnimationFrameTimeline, delay } = require('./frame')
const { ANIMATION_TRIGGER_ERROR } = require('../constants/errorMessages')

/**
 * Captures animation frames for visual regression testing.
 * @param {Object} params - The parameters for capturing animation frames.
 * @param {Object} params.page - The Puppeteer page instance.
 * @param {Object} params.element - The element to capture animation frames from.
 * @param {number} params.frameRate - The frame rate for capturing frames.
 * @param {number} params.maxCaptureDuration - The maximum duration to capture frames.
 * @param {number} params.frameDelay - The delay between frames.
 * @param {number} params.pageScreenshotDelay - The delay before taking a screenshot.
 * @param {string} params.baselineFolder - The folder to save baseline images.
 * @param {Object} [params.cssTransitionData={}] - The CSS transition data.
 * @param {string} params.animationName - The name of the animation.
 * @param {boolean} params.isSvg - Whether the element is an SVG.
 * @param {Object} [params.triggerInfo={}] - The trigger info for the animation.
 * @param {string} [params.triggerInfo.triggerAction=null] - The action to trigger the animation.
 * @param {string} [params.triggerInfo.triggerSelector=null] - The selector to trigger the animation.
 * @returns {Promise<Object[]>} The list of captured frames with their image data and current time.
 */
async function captureAnimationFrames ({
  page,
  element,
  frameRate,
  frameCount,
  maxCaptureDuration,
  frameDelay,
  pageScreenshotDelay,
  baselineFolder,
  cssTransitionData = {},
  animationName,
  isSvg,
  triggerInfo: { triggerAction = null, triggerSelector = null } = {}
}) {
  try {
    const animationFrameTimelineList = await generateAnimationFrameTimeline({
      baselineFolder,
      animationName,
      frameRate,
      frameCount,
      maxCaptureDuration,
      frameDelay
    })

    if (Object.keys(cssTransitionData).length > 0) {
      await playCssTransitionAsAnimation({ element, animationName, cssTransitionData, triggerAction, triggerSelector })
    } else {
      await playAnimation({ element, animationName, triggerAction, triggerSelector, isSvg })
    }

    await pauseAnimation({ element, animationName, isSvg })
    await setAnimationAtCurrentTime({ element, animationName, currentTime: 0.0, isSvg })

    const frameList = await captureFrames({
      page,
      element,
      animationFrameTimelineList,
      pageScreenshotDelay,
      animationName,
      isSvg
    })

    return frameList
  } catch (error) {
    console.error('Error capturing animation frames:', error)
    throw error
  }
}

/**
 * Captures frames for each time point in the animation timeline.
 * @param {Object} params - The parameters for capturing frames.
 * @param {Object} params.page - The Puppeteer page instance.
 * @param {Object} params.element - The element to capture animation frames from.
 * @param {number[]} params.animationFrameTimelineList - The list of animation frame times.
 * @param {number} params.pageScreenshotDelay - The delay before taking a screenshot.
 * @param {string} params.animationName - The name of the animation.
 * @param {boolean} params.isSvg - Whether the element is an SVG.
 * @returns {Promise<Object[]>} The list of captured frames with their image data and current time.
 */
async function captureFrames ({
  page,
  element,
  animationFrameTimelineList,
  pageScreenshotDelay,
  animationName,
  isSvg
}) {
  const frameList = []

  for (const currentTime of animationFrameTimelineList) {
    await setAnimationAtCurrentTime({ element, currentTime, animationName, isSvg })
    await delay(pageScreenshotDelay)
    const frameImageData = await page.screenshot()
    frameList.push({ frameImageData, frameCurrentTime: currentTime })
  }

  return frameList
}

async function playAnimation ({
  element,
  animationName,
  triggerAction,
  triggerSelector,
  isSvg
}) {
  const isPlaySuccess = await element.evaluate((element, animationName, triggerAction, triggerSelector, isSvg) => {
    return new Promise(async resolve => {
      const getAnimation = () => {
        const animationList = element.getAnimations()
        if (!animationList || !animationList.length) {
          return null
        }
        const animation = animationList.find(({ animationName: name, id }) => [name, id].includes(animationName))
        return animation || null
      }
      const checkIfAnimationPlaying = async () => {
        return new Promise(resolve => {
          // Confirm that animation is playing
          setTimeout(() => {
            if (isSvg) {
              if (element.getCurrentTime() > 0) {
                resolve(true)
              } else {
                resolve(false)
              }
            } else {
              const animation = getAnimation()
              if (animation && animation.playState === 'running' && animation.currentTime > 0) {
                resolve(true)
              } else {
                resolve(false)
              }
            }
          }, 15)
        })
      }
      if (triggerAction && triggerSelector && window.ANIMATION_TRIGGER_ACTIONS[triggerAction]) {
        window.ANIMATION_TRIGGER_ACTIONS[triggerAction](triggerSelector)
      } else {
        if (isSvg) {
          element.setCurrentTime(0)
        } else {
          const animation = getAnimation()
          if (animation) {
            animation.play()
          }
        }
      }
      const isAnimationPlaying = await checkIfAnimationPlaying()
      setTimeout(() => resolve(isAnimationPlaying), 1)
    })
  }, animationName, triggerAction, triggerSelector, isSvg)
  if (!isPlaySuccess) {
    throw new Error(ANIMATION_TRIGGER_ERROR({ triggerSelector, triggerAction }))
  }
}

async function playCssTransitionAsAnimation ({
  element,
  animationName,
  cssTransitionData,
  triggerAction,
  triggerSelector
}) {
  const isPlaySuccess = await element.evaluate((element, animationData, triggerAction, triggerSelector, animationName) => {
    return new Promise(resolve => {
      const isNumeric = value => /^\d+$/.test(`${value}`)
      let animationRef = null
      const handlePlayAnimation = () => {
        animationRef = element.animate(animationData.keyframes, {
          id: animationName,
          duration: animationData.duration,
          delay: animationData.delay || 0,
          iterations: isNumeric(animationData.iterations) || animationData.iterations === Infinity ? animationData.iterations : 1,
          fill: animationData.fill || 'forwards',
          easing: animationData.easing || 'ease'
        })
      }
      if (triggerAction && triggerSelector && window.ANIMATION_TRIGGER_ACTIONS[triggerAction]) {
        element.addEventListener(triggerAction, handlePlayAnimation)
        window.ANIMATION_TRIGGER_ACTIONS[triggerAction](triggerSelector)
      } else {
        handlePlayAnimation()
      }
      // Confirm that animation is finished
      setTimeout(() => {
        resolve(animationRef.playState === 'finished')
      }, animationData.duration + 100)
    })
  }, cssTransitionData, triggerAction, triggerSelector, animationName)
  if (!isPlaySuccess) {
    throw new Error(ANIMATION_TRIGGER_ERROR({ triggerSelector, triggerAction }))
  }
}

async function pauseAnimation ({
  element,
  animationName,
  isSvg
}) {
  await element.evaluate((element, animationName, isSvg) => {
    return new Promise(resolve => {
      if (isSvg) {
        element.pauseAnimations()
      } else {
        const animationList = element.getAnimations()
        if (!animationList || !animationList.length) {
          resolve(false)
        }
        const animation = animationList.find(({ animationName: name, id }) => [name, id].includes(animationName))
        if (animation) {
          animation.pause()
        } else {
          resolve(false)
        }
      }
      setTimeout(() => resolve(true), 100)
    })
  }, animationName, isSvg)
}

async function setAnimationAtCurrentTime ({
  element,
  currentTime,
  animationName,
  isSvg
}) {
  await element.evaluate((element, animationName, currentTime, isSvg) => {
    return new Promise(resolve => {
      if (isSvg) {
        element.setCurrentTime(currentTime)
      } else {
        const animationList = element.getAnimations()
        if (!animationList || !animationList.length) {
          resolve(false)
        }
        const animation = animationList.find(({ animationName: name, id }) => [name, id].includes(animationName))
        if (animation) {
          animation.currentTime = currentTime
        } else {
          setTimeout(() => resolve(false), 100)
        }
      }
      setTimeout(() => resolve(true), 100)
    })
  }, animationName, currentTime, isSvg)
}

async function cancelAnimation ({
  element,
  animationName
}) {
  const animationData = await element.evaluate((element, animationName) => {
    return new Promise(resolve => {
      let keyframes = null
      let animationTiming = null
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) {
        resolve({
          keyframes,
          animationTiming
        })
      }
      const animation = animationList.find(({ animationName: name, id }) => [name, id].includes(animationName))
      if (animation) {
        keyframes = animation.effect.getKeyframes()
        animationTiming = animation.effect.getComputedTiming()
        animation.cancel()
      } else {
        resolve(false)
      }
      setTimeout(() => resolve({
        keyframes,
        animationTiming
      }), 0)
    })
  }, animationName)
  return animationData
}

async function getAnimationCurrentTime ({
  element,
  animationName
}) {
  return await element.evaluate((element, animationName) => {
    return new Promise(resolve => {
      let currentTime = null
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) resolve(currentTime)
      const animation = animationList.find(({ animationName: name, id }) => [name, id].includes(animationName))
      if (animation) {
        currentTime = animation.currentTime
      } else {
        resolve(false)
      }
      setTimeout(() => resolve(currentTime), 0)
    })
  }, animationName)
}

module.exports = {
  captureAnimationFrames,
  pauseAnimation,
  cancelAnimation,
  playCssTransitionAsAnimation,
  playAnimation,
  getAnimationCurrentTime,
  generateAnimationFrameTimeline
}
