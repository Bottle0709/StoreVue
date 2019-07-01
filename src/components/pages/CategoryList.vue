<template lang="html">
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(category, index) in categorys"
                :key="index"
                @click="clickCategorys(index, category.ID)"
                :class="{ categoryActive: categorysIndex == index }"
              >
                {{ category.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(categorysub, index) in categorysubs"
                :key="index"
                :title="categorysub.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div
                  class="list-item"
                  @click="getGoodsInfo(item.ID)"
                  v-for="(item, index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{ item.NAME }}</div>
                    <div class="">￥{{ item.ORI_PRICE | moneyFilter }}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '../../serviceAPI.config'
import { toMoney } from '@/filter/moneyFilter.js'
import { Toast } from 'vant'
export default {
  name: 'CategoryList',
  data() {
    return {
      categorys: [], //商品大类
      categorysIndex: 0,
      categorysubs: [], //商品子类
      active: 0, //激活标签的值
      loading: false, //上拉加载使用
      finished: false, //上拉加载是否没有数据了
      isRefresh: false, //下拉加载
      goodList: [], //商品信息
      page: 1, //商品列表的页数
      categorySubId: '', //商品子类ID
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"' //失效图片显示路径
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  },
  created() {
    this.getCategoryList()
  },
  components: {},
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  methods: {
    //获取大类信息
    getCategoryList() {
      axios({
        url: url.getCategoryList,
        method: 'get'
      })
        .then(response => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.categorys = response.data.message
            this.getCategorySubByCategoryId(this.categorys[0].ID)
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //点击大类
    clickCategorys(index, categoryId) {
      this.categorysIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: { categoryId: categoryId }
      })
        .then(response => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            this.categorysubs = response.data.message
            this.active = 0
            this.categorySubId = this.categorysubs[0].ID
            this.onLoad()
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorysubs[0].ID
        this.getGoodsList()
      }, 500)
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    //获取商品列表
    getGoodsList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: { categorySubId: this.categorySubId, page: this.page }
      })
        .then(response => {
          console.log(response)
          if (response.data.code == 200 && response.data.message.length) {
            this.page++
            this.goodList = this.goodList.concat(response.data.message)
          } else {
            this.finished = true
          }
          this.loading = false
          //console.log(this.finished)
        })
        .catch(error => {
          console.log(error)
        })
    },
    //点击子类获取商品信息
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorysubs[index].ID
      console.log(this.categorySubId)
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    getGoodsInfo(id) {
      this.$router.push({ name: 'Goods', params: { goodsId: id } })
    }
  }
}
</script>
<style lang="css" scoped>
#leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>
