<template lang="html">
  <div class="goods-info" @click="goGoodsPage()">
    <div class="goods-image">
      <img :src="goodsImage" width="100%" />
    </div>
    <div class="goods-name">{{ goodsName }}</div>
    <div class="goods-price">￥{{ goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import { toMoney } from '../../filter/moneyFilter'
export default {
  name: 'goodsInfoComponent',
  props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
  data() {
    return {}
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  components: {},
  methods: {
    goGoodsPage() {
      this.$router.push({ name: 'Goods', query: { goodsId: this.goodsId } })
    }
  }
}
</script>
<style lang="css" scoped>
.goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap;
    }
</style>
