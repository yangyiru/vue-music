import * as types from './mutation-types'

//  书写方便
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
