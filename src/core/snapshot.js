const fs = require('fs')
const pixelmatch = require('pixelmatch')
const { PNG } = require('pngjs')
const sharp = require('sharp')

async function matchImageSnapshot ({
  imageData,
  snapshotName,
  baselineFolder,
  actualFolder,
  diffFolder
}) {
  const baselineScreenshotPath = `${baselineFolder}/${snapshotName}`
  const actualScreenshotPath = `${actualFolder}/${snapshotName}`
  const diffScreenshotPath = `${diffFolder}/${snapshotName}`
  const resizedActualScreenshotPath = `${actualFolder}/resize-${snapshotName}`

  let baseLineImage = null
  let actualImage = null
  let diffPercentage = 0
  let resizedActualImage = null

  fs.mkdirSync(baselineFolder, { recursive: true })
  fs.mkdirSync(actualFolder, { recursive: true })
  fs.mkdirSync(diffFolder, { recursive: true })

  const baselineScreenshotExists = fs.existsSync(baselineScreenshotPath)

  fs.writeFileSync(baselineScreenshotExists ? actualScreenshotPath : baselineScreenshotPath, imageData)

  if (baselineScreenshotExists) {
    try {
      baseLineImage = PNG.sync.read(fs.readFileSync(baselineScreenshotPath))
    } catch (e) {}
    try {
      actualImage = PNG.sync.read(fs.readFileSync(actualScreenshotPath))
    } catch (e) {}

    if (!baseLineImage?.data || !actualImage?.data) return null

    const { width: baseLineWidth, height: baseLineHeight } = baseLineImage

    // if images size don't match, make actual image same height as baseLine image
    if (imagesHaveSameSize(baseLineImage, actualImage) === false) {
      await sharp(actualScreenshotPath).resize({ height: baseLineHeight, width: baseLineWidth }).toFile(resizedActualScreenshotPath)
      resizedActualImage = PNG.sync.read(fs.readFileSync(resizedActualScreenshotPath))
    }

    const diff = new PNG({ width: baseLineWidth, height: baseLineHeight })
    diffPercentage = pixelmatch(baseLineImage.data, (resizedActualImage || actualImage).data, diff.data, baseLineWidth, baseLineHeight, {
      threshold: 0.0,
      diffColorAlt: [255, 0, 0],
      includeAA: true
    })

    // delete the created resized image
    if (resizedActualImage?.data) {
      try {
        fs.unlinkSync(resizedActualScreenshotPath)
      } catch (e) {}
    }

    if (diffPercentage === 0) {
      // delete diffed image that passed after some number of retries
      try {
        fs.unlinkSync(diffScreenshotPath)
      } catch (e) {}
    } else {
      try {
        fs.writeFileSync(diffScreenshotPath, PNG.sync.write(diff))
      } catch (e) {}
    }
  }
  return diffPercentage === 0
}

function getBaselineFileList (baselineFolder, animationName) {
  let baselineFileList = null
  try {
    baselineFileList = fs.readdirSync(baselineFolder)
    if (Array.isArray(baselineFileList) && baselineFileList.length) {
      baselineFileList = baselineFileList.filter(item => item.includes(animationName))
    }
  } catch (e) {}
  return baselineFileList
}

function imagesHaveSameSize (firstImage, secondImage) {
  if (!firstImage || !secondImage) return null
  return firstImage.height === secondImage.height && firstImage.width === secondImage.width
}

module.exports = {
  matchImageSnapshot,
  getBaselineFileList
}
