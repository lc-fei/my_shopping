const INFO_KEY = 'my_shoppping_info'
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)
  return res ? JSON.parse(res) : defaultObj
}
// 个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 清除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

const HISTORY_KEY = 'my_history_key'
export const getHistoryList = () => {
  const defaultList = []
  const List = localStorage.getItem(HISTORY_KEY)
  return List ? JSON.parse(List) : defaultList
}
export const setHistoryList = (list) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}
export const removeHistoryList = () => {
  localStorage.removeItem(HISTORY_KEY)
}
