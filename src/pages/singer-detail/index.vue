<template>
	<transition name="slide">
       <music-list :title="title" :bg-image="bgImage"  :songs="songs"></music-list>
    </transition>
</template>

<script>
 import MusicList from '../music-list/index.vue'
// mapGetter获取数据
 import { mapGetters } from 'vuex'
 import { createSong } from '../../assets/js/song'
 import { getSingerDetail } from 'api/singer'
 import { ERR_OK } from 'api/config'
 export default {
   data() {
     return {
       songs: []
     }
   },
   computed: {
     title() {
       return this.singer.name
     },
     bgImage() {
       return this.singer.avatar
     },
     ...mapGetters([
       'singer'
     ])
   },
   created() {
     this._getDetail()
   },
   methods: {

     _getDetail() {
       if (!this.singer.id) {
         this.$router.push('/singer')
         return
       }
       getSingerDetail(this.singer.id).then((res) => {
         if (res.code === ERR_OK) {
           this.songs = this._normalizeSongs(res.data.list)
           console.log(this.songs)
         }
       })
     },
     _normalizeSongs(list) {
       let ret = []
       list.forEach((item) => {
         let { musicData } = item
         // songid && albumid 必传
         if (musicData.songid && musicData.albumid) {
           ret.push(createSong(musicData))
         }
       })
       return ret
     }
   },
   components: {
     MusicList
   }
 }
</script>

<style rel="stylesheet" lang="stylus">
  @import '../../assets/stylus/variable'
  .singer-detail
  	position:fixed
  	z-index: 100
  	top: 0
  	left: 0
  	right:0
  	bottom:0
  	background: $color-background
  .slide-enter-active, .slide-leave-active
	   transition: all 0.3s
  .slide-enter, .slide-leave-to
	  transform: translate3d(100%, 0, 0)
</style>