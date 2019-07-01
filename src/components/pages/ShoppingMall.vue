<template lang="html">
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swiper area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type bar-->
    <div class="type-bar">
      <div v-for="(catagory, index) in catagorys" :key="index">
        <img v-lazy="catagory.image" width="90%" />
        <span>{{ catagory.mallCategoryName }}</span>
      </div>
    </div>
    <!--adbanner area-->
    <div class="ad-banner">
      <img v-lazy="adbanner.PICTURE_ADDRESS" width="100%" />
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="(recommendGood, index) in recommendGoods"
            :key="index"
          >
            <div class="recommend-item">
              <img :src="recommendGood.image" width="80%" />
              <div>{{ recommendGood.goodsName }}</div>
              <div>
                ￥{{ recommendGood.price | moneyFilter }}(￥{{
                  recommendGood.mallPrice | moneyFilter
                }})
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor-->
    <floorComponent :floorDate="floor1" :floorTiltle="floorName.floor1" />
    <floorComponent :floorDate="floor2" :floorTiltle="floorName.floor2" />
    <floorComponent :floorDate="floor3" :floorTiltle="floorName.floor3" />
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col
              span="12"
              v-for="(hotGood, index) in hotGoods"
              :key="index"
            >
              <goodsInfoComponent
                :goodsId="hotGood.goodsId"
                :goodsImage="hotGood.image"
                :goodsName="hotGood.name"
                :goodsPrice="hotGood.price"
              />
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//引入Vue-Awesome-Swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

//引入filter
import { toMoney } from '../../filter/moneyFilter'
import floorComponent from '../component/floorComponent'
import goodsInfoComponent from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'
export default {
  name: 'ShoppingMall',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [], //轮播图片
      catagorys: [], //商品类别标签栏
      adbanner: [], // 广告图片
      recommendGoods: [], //推荐商品
      floorName: {}, //楼层名字
      floor1: [], //楼层1的数据
      floor2: [], //楼层2的数据
      floor3: [], //楼层3的数据
      hotGoods: [] //热卖商品
    }
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    })
      .then(response => {
        if (response.status == 200) {
          this.catagorys = response.data.data.category
          this.adbanner = response.data.data.advertesPicture
          this.bannerPicArray = response.data.data.slides
          this.recommendGoods = response.data.data.recommend
          this.floorName = response.data.data.floorName
          this.floor1 = response.data.data.floor1
          this.floor2 = response.data.data.floor2
          this.floor3 = response.data.data.floor3
          this.hotGoods = response.data.data.hotGoods
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  components: { swiper, swiperSlide, floorComponent, goodsInfoComponent },
  methods: {}
}
</script>
<style lang="css" scoped>
.search-bar{
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input{
      width:100%;
      height: 1.3rem;
      border-top:0px;
      border-left:0px;
      border-right:0px;
      border-bottom: 1px solid 1px !important ;
      background-color: #e5017d;
      color:#fff;
  }
  .location-icon{
      padding-top: .2rem;
      padding-left: .3rem;
  }
  .swiper-area{
    overflow: hidden;
    clear: both;
    max-height: 9rem;
  }
  .type-bar{
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row
  }
  .type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .type-bar div img{
      width: 2.9rem;
      height: 2.9rem;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem
  }
  .recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
  }
  .recommend-item{
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
  .hot-goods{
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
</style>
