const BASEURL =
  'https://www.easy-mock.com/mock/5d089b763794435ed3adc1a3/StoreVue/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index', //商城首页所有信息
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', //用户注册接口
  login: LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', //获取商品大类
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', //获取商品子类
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' //根据商品类别获取商品列表
}

module.exports = URL
