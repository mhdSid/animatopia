const { generateAnimationFrameTimeline, delay } = require('./frame')

async function captureAnimationFrames ({
  page,
  element,
  frameRate,
  maxCaptureDuration,
  frameDelay,
  pageScreenshotDelay,
  baselineFolder,
  cssTransitionData,
  animationName
}) {
  const animationFrameTimelineList = await generateAnimationFrameTimeline({
    baselineFolder,
    frameRate,
    maxCaptureDuration,
    frameDelay
  })
  const frameList = []
  if (cssTransitionData) {
    await playCssTransitionAsAnimation({ element, cssTransitionData })
  } else {
    await playAnimation({ element, animationName })
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
  animationName
}) {
  await element.evaluate((element, animationName) => {
    return new Promise(resolve => {
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) resolve()
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
      if (animation) {
        animation.play()
      }
      setTimeout(() => resolve(), 0)
    })
  }, animationName)
}

async function playCssTransitionAsAnimation ({
  element,
  cssTransitionData
}) {
  await element.evaluate((element, animationData) => {
    return new Promise(resolve => {
      const isNumeric = value => /^\d+$/.test(`${value}`)
      element.animate(animationData.keyframes, {
        duration: animationData.duration,
        delay: animationData.delay || 0,
        iterations: isNumeric(animationData.iterations) || animationData.iterations === Infinity ? animationData.iterations : 1,
        fill: animationData.fill || 'forwards',
        easing: animationData.easing || 'ease'
      })
      setTimeout(() => resolve(), 0)
    })
  }, cssTransitionData)
}

async function pauseAnimation ({
  element,
  animationName
}) {
  await element.evaluate((element, animationName) => {
    return new Promise(resolve => {
      const animationList = element.getAnimations()
      if (!animationList || !animationList.length) {
        resolve()
      }
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
      if (animation) {
        animation.pause()
      }
      setTimeout(() => resolve(), 0)
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
        resolve()
      }
      const animation = animationList.find(animationItem => animationItem.animationName === animationName)
      if (animation) {
        animation.currentTime = currentTime
      }
      setTimeout(() => resolve(), 0)
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
