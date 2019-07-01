<template lang="html">
  <div>
    <div class="floor">
      <div class="floor-title">{{ floorTiltle }}</div>
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floorDate0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floorDate1.image" width="100%" />
          </div>
          <div><img :src="floorDate2.image" width="100%" /></div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item, index) in floorDate.slice(3)" :key="index">
          <img :src="item.image" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'floorComponent',
  props: ['floorDate', 'floorTiltle'],
  data() {
    return {
      floorDate0: {},
      floorDate1: {},
      floorDate2: {}
    }
  },
  watch: {
    floorDate(val) {
      this.floorDate0 = this.floorDate[0]
      this.floorDate1 = this.floorDate[1]
      this.floorDate2 = this.floorDate[2]
    }
  },
  components: {},
  methods: {}
}
</script>
<style lang="css" scoped>
.floor-title{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .floor-anomaly{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd
  }
  .floor-anomaly div{
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing:border-box
  }
  .floor-one{
    border-right: 1px solid #ddd
  }
  .floor-two{
    border-bottom: 1px solid #ddd
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff
  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
  }
</style>
