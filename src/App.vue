<template>
  <div id="app"  >
    <m-header></m-header>
    <m-nav></m-nav> 
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header.vue'
import MNav from './components/m-nav/index.vue'
export default {
  name: 'app',
  components: {
    MHeader,
    MNav
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
