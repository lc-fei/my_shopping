import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      this.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {},
  getters: {}
}
