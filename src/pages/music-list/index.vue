<template>
    <div class="music-list">
    	<div class="back" @click="back"><i class="icon-back"></i></div>
    	<h1 class="title" v-html="title"></h1>
    	<div class="bg-image" :style="bgStyle" ref="bgImage">
    		<div class="filter" ref="filter"></div>
    	</div>
      <div class="bg-layer" ref="layer"></div>
    	<scroll :data="songs" 
              :list-scroll="listScroll"
              :probe-type = 'probeType'
              @scroll="scroll" 
              class="list" ref="list">
    		<div class="song-list-wrapper">
    			<song-list :songs="songs"></song-list>
    		</div>
    	</scroll>
    </div>
</template>

<script>
    import Scroll from '../../components/scroll'
    import SongList from '../../components/song-list'
    import { prefixStyle } from '../../assets/js/dom'
    const RESERVED_HEIGHT = 40
    const transform = prefixStyle('transform')
    const backdrop = prefixStyle('backdrop-filter')
    export default {
      created() {
        this.probeType = 3
        this.listScroll = true // 监听滚动
      },
      data() {
        return {
          scrollY: 0  // 维护y轴上面的变化
        }
      },
      props: {
        bgImage: {
          type: String,
          default: ''
        },
        songs: {
          type: Array,
          default: []
        },
        title: {
          type: String,
          default: ''
        }
      },
      computed: {
        bgStyle() {
          return `background-image:url(${this.bgImage})`
        }
      },
      mounted() {
        // 记录歌曲封面高度
        this.imageHeight = this.$refs.bgImage.clientHeight
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT // 最小滚动差
        // 获取 scroll top值
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
      },
      methods: {
        scroll(pos) {
          this.scrollY = pos.y // 实时监听Y 轴上面的值变化并赋值
        },
        back() {
          this.$router.back()
        }
      },
      watch: {
        // 监听scrollY y轴的值变化
        scrollY(newY) {
          let translateY = Math.max(this.minTranslateY, newY)
          let zIndex = 0
          let scale = 1
          let blur = 0 // 高斯模糊度
          this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
          const percent = Math.abs(newY / this.imageHeight)  // 计算公式  当前Y轴的值除以歌曲封面高度的绝对值  Math.abs(绝对值)
          if (newY > 0) {
            scale = 1 + percent
            zIndex = 10
          } else {
            blur = Math.min(20 * percent, 20)
          }
          this.$refs.filter.style[backdrop] = `blur(${blur}px)`
          if (newY < this.minTranslateY) {
            zIndex = 10
            this.$refs.bgImage.style.paddingTop = 0
            this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          } else {
            this.$refs.bgImage.style.paddingTop = '70%'
            this.$refs.bgImage.style.height = 0
          }
          this.$refs.bgImage.style.zIndex = zIndex
          this.$refs.bgImage.style[transform] = `scale(${scale})`
        }
      },
      components: {
        Scroll,
        SongList
      }
    }
</script>

<style rel="stylesheet" lang="stylus">
  @import "../../assets/stylus/variable"
  @import "../../assets/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>