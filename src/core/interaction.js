module.exports = {
  ANIMATION_TRIGGER_ACTIONS: {
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
}
