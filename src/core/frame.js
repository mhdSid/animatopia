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

const generateFrameTimeline = async ({
  frameRate,
  maxCaptureDuration,
  frameDelay
}) => {
  const frameTimelineList = []
  const timer = new Timer()
  let elapsedTime = 0
  timer.start()
  while (elapsedTime <= maxCaptureDuration) {
    frameTimelineList.push(Math.floor(elapsedTime))
    await requestAnimationFrame(frameRate)
    elapsedTime = timer.getTimeElapsed()
    await delay(frameDelay)
  }
  return frameTimelineList
}

async function generateAnimationFrameTimeline ({
  baselineFolder,
  frameRate,
  maxCaptureDuration,
  frameDelay
}) {
  let animationFrameTimelineList = null
  const baselineFileList = getBaselineFileList(baselineFolder)
  if (Array.isArray(baselineFileList) && baselineFileList.length) {
    animationFrameTimelineList = baselineFileList.map(item => Number(item.substring(item.lastIndexOf('_') + 1, item.indexOf('.png'))))
    animationFrameTimelineList.sort((a, b) => a - b)
  } else {
    animationFrameTimelineList = await generateFrameTimeline({
      frameRate,
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
  for (let frameIndex = 0; frameIndex < frameList.length; frameIndex++) {
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
  }
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
