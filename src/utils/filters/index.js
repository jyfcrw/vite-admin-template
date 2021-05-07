import * as formatter from './formatter'

export default {
  install (app, varName = '$filters') {
    app.config.globalProperties[varName] = {
      ...formatter
    }
  }
}
