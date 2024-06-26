const { DEFAULT_FRAME_RATE, DEFAULT_FRAME_DELAY, DEFAULT_FRAME_COUNT } = require('../constants/defaults')
const { isNumeric } = require('../util/number/isNumeric')
const { Timer } = require('../util/time/timer')
const { matchImageSnapshot, getBaselineFileList } = require('./snapshot')

function requestAnimationFrame (frameRate) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000 / frameRate)
  })
}

function delay (frameDelay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, frameDelay)
  })
}

async function generateFrameTimeline ({
  frameRate = DEFAULT_FRAME_RATE,
  maxCaptureDuration = DEFAULT_MAX_CAPTURE_DURATION,
  frameDelay = DEFAULT_PAGE_SCREENSHOT_DELAY,
  frameCount = DEFAULT_FRAME_COUNT
}) {
  const frameTimelineList = []
  const timer = new Timer()
  let elapsedTime = 0
  timer.start()

  if (isNumeric(frameCount)) {
    for (let i = 0; i < frameCount; i++) {
      frameTimelineList.push(Math.floor(elapsedTime))
      await requestAnimationFrame(frameRate)
      elapsedTime = timer.getTimeElapsed()
      await delay(frameDelay)
    }
  } else {
    while (elapsedTime <= maxCaptureDuration) {
      frameTimelineList.push(Math.floor(elapsedTime))
      await requestAnimationFrame(frameRate)
      elapsedTime = timer.getTimeElapsed()
      await delay(frameDelay)
    }
  }
  return frameTimelineList
}

async function generateAnimationFrameTimeline ({
  baselineFolder,
  animationName,
  frameRate,
  frameCount,
  maxCaptureDuration,
  frameDelay
}) {
  let animationFrameTimelineList = null
  const baselineFileList = getBaselineFileList(baselineFolder, animationName)
  if (Array.isArray(baselineFileList) && baselineFileList.length) {
    animationFrameTimelineList = baselineFileList.map(item => Number(item.substring(item.lastIndexOf('_') + 1, item.indexOf('.png'))))
    animationFrameTimelineList.sort((a, b) => a - b)
  } else {
    animationFrameTimelineList = await generateFrameTimeline({
      frameRate,
      frameCount,
      maxCaptureDuration,
      frameDelay
    })
  }
  return animationFrameTimelineList
}

async function matchFrames ({
  frameList,
  animationName,
  frameImagePrefix,
  baselineFolder,
  actualFolder,
  diffFolder
}) {
  const promises = []
  for (let frameIndex = 0; frameIndex < frameList.length; frameIndex++) {
    promises.push(new Promise (async (resolve) => {
      const { frameImageData, frameCurrentTime } = frameList[frameIndex]

      const imageName = getFrameImageName({ frameImagePrefix, animationName, frameIndex, frameCurrentTime })
      const matchSuccess = await matchImageSnapshot({
        imageData: frameImageData,
        snapshotName: imageName,
        baselineFolder,
        actualFolder,
        diffFolder
      })
      console.log(`Frame ${frameIndex + 1} saved: ${imageName} - Match success: ${matchSuccess}`)
      resolve(matchSuccess)
    }))
  }
  const results = await Promise.all(promises)
  return results
}

function getFrameImageName ({
  frameImagePrefix,
  animationName,
  frameIndex,
  frameCurrentTime
}) {
  return `${frameImagePrefix || ''}${animationName}_${frameIndex}_${frameCurrentTime}.png`
}

module.exports = {
  generateFrameTimeline,
  generateAnimationFrameTimeline,
  matchFrames,
  requestAnimationFrame,
  delay
}
