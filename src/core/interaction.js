const { INTERACTION_EVENT_MAP } = require('../constants/interactionEvents')

module.exports = {
  ANIMATION_TRIGGER_ACTIONS: {
    [INTERACTION_EVENT_MAP.CLICK]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.CLICK, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.DBLCLICK]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.DBLCLICK, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.FOCUS]: selector => {
      document.querySelector(selector).focus()
    },
    [INTERACTION_EVENT_MAP.BLUR]: selector => {
      document.querySelector(selector).blur()
    },
    [INTERACTION_EVENT_MAP.MOUSEDOWN]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.MOUSEDOWN, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.MOUSEENTER]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.MOUSEENTER, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.MOUSEMOVE]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.MOUSEMOVE, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.MOUSEOUT]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.MOUSEOUT, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.MOUSEOVER]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.MOUSEOVER, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.MOUSEUP]: selector => {
      const event = new MouseEvent(INTERACTION_EVENT_MAP.MOUSEUP, {
        view: window,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.KEYDOWN]: (selector, key) => {
      const event = new KeyboardEvent(INTERACTION_EVENT_MAP.KEYDOWN)
      document.querySelector(selector).dispatchEvent(event, { key })
    },
    [INTERACTION_EVENT_MAP.KEYPRESS]: (selector, key) => {
      const event = new KeyboardEvent(INTERACTION_EVENT_MAP.KEYPRESS)
      document.querySelector(selector).dispatchEvent(event, { key })
    },
    [INTERACTION_EVENT_MAP.KEYUP]: (selector, key) => {
      const event = new KeyboardEvent(INTERACTION_EVENT_MAP.KEYUP)
      document.querySelector(selector).dispatchEvent(event, { key })
    },
    [INTERACTION_EVENT_MAP.MOUSEWHEEL]: selector => {
      const event = new KeyboardEvent('wheel', {
        deltaY: 1,
        deltaMode: 1
      })
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTERCANCEL]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTERCANCEL)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTERUP]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTERUP)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTEROVER]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTEROVER)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTEROUT]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTEROUT)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTERMOVE]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTERMOVE)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTERLEAVE]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTERLEAVE)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTERENTER]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTERENTER)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.POINTERDOWN]: selector => {
      const event = new PointerEvent(INTERACTION_EVENT_MAP.POINTERDOWN)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.TOUCHCANCEL]: selector => {
      const event = new Event(INTERACTION_EVENT_MAP.TOUCHCANCEL)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.TOUCHEND]: selector => {
      const event = new Event(INTERACTION_EVENT_MAP.TOUCHEND)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.TOUCHMOVE]: selector => {
      const event = new Event(INTERACTION_EVENT_MAP.TOUCHMOVE)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.TOUCHSTART]: selector => {
      const event = new Event(INTERACTION_EVENT_MAP.TOUCHSTART)
      document.querySelector(selector).dispatchEvent(event)
    },
    [INTERACTION_EVENT_MAP.SCROLL]: selector => {
      document.querySelector(selector).scrollLeft = 100
      document.querySelector(selector).scrollTop = 100
    }
  }
}
