import request from '@/utils/request'
export const getProList = (obj) => {
  const {
    sortType,
    sortPrice,
    categoryId,
    goodsName,
    page
  } = obj
  request.get('/goods/list', {
    sortType,
    sortPrice,
    categoryId,
    goodsName,
    page
  })
}
