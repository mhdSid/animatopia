const { generateAnimationFrameTimeline, delay } = require('./frame')
const { INTERACTION_EVENT_MAP } = require('../constants/interactionEvents')
const { ANIMATION_TRIGGER_ERROR } = require('../constants/errorMessages')
const { ANIMATION_TRIGGER_ACTIONS } = require('./interaction')

async function captureAnimationFrames ({
  page,
  element,
  frameRate,
  maxCaptureDuration,
  frameDelay,
  pageScreenshotDelay,
  baselineFolder,
  cssTransitionData = {},
  animationName,
  triggerInfo: { triggerAction, triggerSelector } = { triggerAction: null, triggerSelector: null }
}) {
  const animationFrameTimelineList = await generateAnimationFrameTimeline({
    baselineFolder,
    frameRate,
    maxCaptureDuration,
    frameDelay
  })
  const frameList = []
  let animationTriggerAction = null
  if (triggerAction) {
    animationTriggerAction = () => {
      ANIMATION_TRIGGER_ACTIONS(triggerAction)(triggerSelector)
    }
  }
  if (!!Object.keys(cssTransitionData).length) {
    await playCssTransitionAsAnimation({ element, cssTransitionData, animationTriggerAction })
  } else {
    await playAnimation({ element, animationName, animationTriggerAction })
  }
  await pauseAnimation({ element, animationName })
  await setAnimationAtCurrentTime({ element, animationName, currentTime: 0 })
  for (let frameIndex = 0; frameIndex < animationFrameTimelineList.length; frameIndex++) {
    const currentTime = animationFrameTimelineList[frameIndex] 
    await setAnimationAtCurrentTime({ element, currentTime, animationName })
    await delay(pageScreenshotDelay)
    const frameImageData = await page.screenshot()
    frameList.push({
      frameImageData,
      frameCurrentTime: currentTime
    })
  }
  return frameList
}

async function playAnimation ({
  element,
  animationName,
  animationTriggerAction
}) {
  const isPlaySuccess = await element.evaluate((element, animationName, animationTriggerAction) => {
    return new Promise(resolve => {
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) {
        resolve(false)
      }
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
      if (animation) {
        if (animationTriggerAction) {
          animationTriggerAction()
        } else {
          animation.play()
        }
        // Confirm that animation is playing after half of the duration time
        setTimeout(() => {
          if (animation.playState === 'running' && animation.currentTime > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        }, 1)
      } else {
        resolve(false)
      }
      setTimeout(() => resolve(true), 0)
    })
  }, animationName, animationTriggerAction)
  if (!isPlaySuccess) {
    throw new Error(ANIMATION_TRIGGER_ERROR({ triggerSelector, triggerAction }))
  }
}

async function playCssTransitionAsAnimation ({
  element,
  cssTransitionData,
  animationTriggerAction
}) {
  const isPlaySuccess = await element.evaluate((element, animationData, animationTriggerAction) => {
    return new Promise(resolve => {
      const isNumeric = value => /^\d+$/.test(`${value}`)
      element.animate(animationData.keyframes, {
        duration: animationData.duration,
        delay: animationData.delay || 0,
        iterations: isNumeric(animationData.iterations) || animationData.iterations === Infinity ? animationData.iterations : 1,
        fill: animationData.fill || 'forwards',
        easing: animationData.easing || 'ease'
      })
      // Confirm that animation is playing after half of the duration time
      setTimeout(() => {
        if (animation.playState === 'running' && animation.currentTime > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1)
    })
  }, cssTransitionData, animationTriggerAction)
  if (!isPlaySuccess) {
    throw new Error(ANIMATION_TRIGGER_ERROR({ triggerSelector, triggerAction }))
  }
}

async function pauseAnimation ({
  element,
  animationName
}) {
  await element.evaluate((element, animationName) => {
    return new Promise(resolve => {
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) {
        resolve(false)
      }
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
      if (animation) {
        animation.pause()
      } else {
        resolve(false)
      }
      setTimeout(() => resolve(true), 0)
    })
  }, animationName)
}

async function setAnimationAtCurrentTime ({
  element,
  currentTime,
  animationName
}) {
  await element.evaluate((element, animationName, currentTime) => {
    return new Promise(resolve => {
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) {
        resolve(false)
      }
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
      if (animation) {
        animation.currentTime = currentTime
      } else {
        resolve(false)
      }
      setTimeout(() => resolve(true), 0)
    })
  }, animationName, currentTime)
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
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
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
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
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
