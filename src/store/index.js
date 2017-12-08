import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createlogger from 'vuex/dist/logger'  // 查看日志


Vue.use(Vuex)


// 线下调试工具
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,  // vue严格模式 不建议在线上模式使用
  plugins: debug ? [createlogger()] : []
})