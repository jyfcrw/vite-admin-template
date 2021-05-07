import elementUiValidators from './element-plus'
export default {
  install (app, varName = '$validators') {
    app.config.globalProperties[varName] = elementUiValidators
  }
}
