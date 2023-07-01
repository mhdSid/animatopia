const NO_URL_ERROR = 'A "url" must be provided!'

const NO_SELECTOR_ERROR = 'A "selector" must be provided!' 

const NO_ANIMATION_ERROR = 'Either "animationName" or "cssTransitionData" of type Web Animation must be provided!'

const ANIMATION_TRIGGER_ERROR = ({ triggerSelector, triggerAction }) => `Unable to trigger animation on ${triggerSelector} with ${triggerAction}`

const UNKNOWN_TRIGGER_ACTION_ERROR = triggerAction => `Unknown trigger action: ${triggerAction}`

module.exports = {
  UNKNOWN_TRIGGER_ACTION_ERROR,
  NO_URL_ERROR,
  NO_SELECTOR_ERROR,
  NO_ANIMATION_ERROR,
  ANIMATION_TRIGGER_ERROR
}
