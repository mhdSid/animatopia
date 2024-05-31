async function attachUIInteractionEvents (page) {
  if (!page) throw new Error('A page must be passed to attach UI interaction events')

  await page.evaluateOnNewDocument(() => {
    const createMouseEvent = type => new window.MouseEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true
    })

    const createKeyboardEvent = (type, key) => new window.KeyboardEvent(type, {
      key,
      bubbles: true,
      cancelable: true
    })

    const createPointerEvent = type => new window.PointerEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true
    })

    const createEvent = type => new window.Event(type, {
      bubbles: true,
      cancelable: true
    })

    window.ANIMATION_TRIGGER_ACTIONS = {
      click: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('click'))
      },
      dblclick: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('dblclick'))
      },
      focus: selector => {
        document.querySelector(selector).focus()
      },
      blur: selector => {
        document.querySelector(selector).blur()
      },
      mousedown: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('mousedown'))
      },
      mouseenter: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('mouseenter'))
      },
      mousemove: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('mousemove'))
      },
      mouseout: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('mouseout'))
      },
      mouseover: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('mouseover'))
      },
      mouseup: selector => {
        document.querySelector(selector).dispatchEvent(createMouseEvent('mouseup'))
      },
      keydown: (selector, key) => {
        document.querySelector(selector).dispatchEvent(createKeyboardEvent('keydown', key))
      },
      keypress: (selector, key) => {
        document.querySelector(selector).dispatchEvent(createKeyboardEvent('keypress', key))
      },
      keyup: (selector, key) => {
        document.querySelector(selector).dispatchEvent(createKeyboardEvent('keyup', key))
      },
      mousewheel: selector => {
        const event = new window.WheelEvent('wheel', {
          deltaY: 1,
          deltaMode: 1,
          bubbles: true,
          cancelable: true
        })
        document.querySelector(selector).dispatchEvent(event)
      },
      pointercancel: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointercancel'))
      },
      pointerup: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointerup'))
      },
      pointerover: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointerover'))
      },
      pointerout: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointerout'))
      },
      pointermove: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointermove'))
      },
      pointerleave: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointerleave'))
      },
      pointerenter: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointerenter'))
      },
      pointerdown: selector => {
        document.querySelector(selector).dispatchEvent(createPointerEvent('pointerdown'))
      },
      touchcancel: selector => {
        document.querySelector(selector).dispatchEvent(createEvent('touchcancel'))
      },
      touchend: selector => {
        document.querySelector(selector).dispatchEvent(createEvent('touchend'))
      },
      touchmove: selector => {
        document.querySelector(selector).dispatchEvent(createEvent('touchmove'))
      },
      touchstart: selector => {
        document.querySelector(selector).dispatchEvent(createEvent('touchstart'))
      },
      scroll: selector => {
        const element = document.querySelector(selector)
        element.scrollLeft = 100
        element.scrollTop = 100
      }
    }
  })
}

module.exports = {
  attachUIInteractionEvents
}
