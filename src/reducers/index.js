import {combineReducers} from 'redux'
import dashboard from './dashboard'
import colors from './colors'
import config from './config'
import leftSidebar from './left-sidebar'
import palettes from './palettes'
import navigation from './navigation'

const rootReducer = combineReducers({
  dashboard,
  navigation,
  colors,
  config,
  leftSidebar,
  palettes
})

export default rootReducer
