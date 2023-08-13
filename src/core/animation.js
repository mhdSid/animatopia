const { generateAnimationFrameTimeline, delay } = require('./frame')
const { ANIMATION_TRIGGER_ERROR } = require('../constants/errorMessages')

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
  isSvg,
  triggerInfo: { triggerAction, triggerSelector } = { triggerAction: null, triggerSelector: null }
}) {
  const animationFrameTimelineList = await generateAnimationFrameTimeline({
    baselineFolder,
    frameRate,
    maxCaptureDuration,
    frameDelay
  })
  const frameList = []
  if (Object.keys(cssTransitionData).length) {
    await playCssTransitionAsAnimation({ element, cssTransitionData, triggerAction, triggerSelector })
  } else {
    await playAnimation({ element, animationName, triggerAction, triggerSelector, isSvg })
  }
  await pauseAnimation({ element, animationName, isSvg })
  await setAnimationAtCurrentTime({ element, animationName, currentTime: 0, isSvg })
  for (let frameIndex = 0; frameIndex < animationFrameTimelineList.length; frameIndex++) {
    const currentTime = animationFrameTimelineList[frameIndex]
    await setAnimationAtCurrentTime({ element, currentTime, animationName, isSvg })
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
  triggerAction,
  triggerSelector,
  isSvg
}) {
  const isPlaySuccess = await element.evaluate((element, animationName, triggerAction, triggerSelector, isSvg) => {
    return new Promise(async resolve => {
      const ANIMATION_TRIGGER_ACTIONS = {
        click: selector => {
          const event = new window.MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        dblclick: selector => {
          const event = new window.MouseEvent('dblclick', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        focus: selector => {
          document.querySelector(selector).focus()
        },
        blur: selector => {
          document.querySelector(selector).blur()
        },
        mousedown: selector => {
          const event = new window.MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        mouseenter: selector => {
          const event = new window.MouseEvent('mouseenter', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        mousemove: selector => {
          const event = new window.MouseEvent('mousemove', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        mouseout: selector => {
          const event = new window.MouseEvent('mouseout', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        mouseover: selector => {
          const event = new window.MouseEvent('mouseover', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        mouseup: selector => {
          const event = new window.MouseEvent('mouseup', {
            view: window,
            bubbles: true,
            cancelable: true
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        keydown: (selector, key) => {
          const event = new window.KeyboardEvent('keydown')
          document.querySelector(selector).dispatchEvent(event, { key })
        },
        keypress: (selector, key) => {
          const event = new window.KeyboardEvent('keypress')
          document.querySelector(selector).dispatchEvent(event, { key })
        },
        keyup: (selector, key) => {
          const event = new window.KeyboardEvent('keyup')
          document.querySelector(selector).dispatchEvent(event, { key })
        },
        mousewheel: selector => {
          const event = new window.KeyboardEvent('wheel', {
            deltaY: 1,
            deltaMode: 1
          })
          document.querySelector(selector).dispatchEvent(event)
        },
        pointercancel: selector => {
          const event = new window.PointerEvent('pointercancel')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointerup: selector => {
          const event = new window.PointerEvent('pointerup')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointerover: selector => {
          const event = new window.PointerEvent('pointerover')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointerout: selector => {
          const event = new window.PointerEvent('pointerout')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointermove: selector => {
          const event = new window.PointerEvent('pointermove')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointerleave: selector => {
          const event = new window.PointerEvent('pointerleave')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointerenter: selector => {
          const event = new window.PointerEvent('pointerenter')
          document.querySelector(selector).dispatchEvent(event)
        },
        pointerdown: selector => {
          const event = new window.PointerEvent('pointerdown')
          document.querySelector(selector).dispatchEvent(event)
        },
        touchcancel: selector => {
          const event = new window.Event('touchcancel')
          document.querySelector(selector).dispatchEvent(event)
        },
        touchend: selector => {
          const event = new window.Event('touchend')
          document.querySelector(selector).dispatchEvent(event)
        },
        touchmove: selector => {
          const event = new window.Event('touchmove')
          document.querySelector(selector).dispatchEvent(event)
        },
        touchstart: selector => {
          const event = new window.Event('touchstart')
          document.querySelector(selector).dispatchEvent(event)
        },
        scroll: selector => {
          document.querySelector(selector).scrollLeft = 100
          document.querySelector(selector).scrollTop = 100
        }
      }
      const getAnimation = () => {
        const animationList = element.getAnimations()
        if (!animationList || !animationList.length) {
          return null
        }
        const animation = animationList.find(animationItem => animationItem.animationName === animationName)
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
      if (triggerAction && triggerSelector && ANIMATION_TRIGGER_ACTIONS[triggerAction]) {
        ANIMATION_TRIGGER_ACTIONS[triggerAction](triggerSelector)
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
      resolve(isAnimationPlaying)
    })
  }, animationName, triggerAction, triggerSelector, isSvg)
  if (!isPlaySuccess) {
    throw new Error(ANIMATION_TRIGGER_ERROR({ triggerSelector, triggerAction }))
  }
}

async function playCssTransitionAsAnimation ({
  element,
  cssTransitionData,
  triggerAction,
  triggerSelector
}) {
  const isPlaySuccess = await element.evaluate((element, animationData, triggerAction) => {
    return new Promise(resolve => {
      const isNumeric = value => /^\d+$/.test(`${value}`)
      const animationId = 'animatopia-animation'
      const getAnimation = () => {
        const animationList = element.getAnimations()
        if (!animationList || !animationList.length) {
          return null
        }
        const animation = animationList.find(animationItem => animationItem.animationName === animationId)
        return animation || null
      }
      element.animate(animationData.keyframes, {
        id: animationId,
        duration: animationData.duration,
        delay: animationData.delay || 0,
        iterations: isNumeric(animationData.iterations) || animationData.iterations === Infinity ? animationData.iterations : 1,
        fill: animationData.fill || 'forwards',
        easing: animationData.easing || 'ease'
      })
      // Confirm that animation is playing after half of the duration time
      setTimeout(() => {
        const animation = getAnimation()
        if (animation.playState === 'running' && animation.currentTime > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      }, 10)
    })
  }, cssTransitionData, triggerAction)
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
        const animation = animationList.find(animationItem => animationItem.animationName === animationName)
        if (animation) {
          animation.pause()
        } else {
          resolve(false)
        }
      }
      setTimeout(() => resolve(true), 10)
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
        const animation = animationList.find(animationItem => animationItem.animationName === animationName)
        if (animation) {
          animation.currentTime = currentTime
        } else {
          resolve(false)
        }
      }
      setTimeout(() => resolve(true), 10)
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
