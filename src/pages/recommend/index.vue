<template>
    <div class="recommend" ref="recommend">
    	<scroll ref="scroll" class="recommend-content" :data="discLists">
        <div>
      		<div v-if="recommends.length" class="slider-wrapper">
      			<slider >
      				<div v-for="item in recommends">
      					<a :href="item.linkUrl">
      						<img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
      					</a>
      				</div>
      			</slider>	
      		</div>
      		<div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
                <li v-for="item in discLists" class="item">
                  <div class="icon">
                    <img width="60" height="60" v-lazy="item.imgurl">
                  </div>
                  <div class="text">
                    <h2 class="name" v-html="item.creator.name"></h2>
                    <p class="desc" v-html="item.dissname"></p>
                  </div>
                </li>  
            </ul>
          </div>
          <div class="loading-container" v-show="!discLists.length">
            <loading></loading>
          </div>
      	</div>
      </scroll>
    </div>
</template>

<script>
    import Scroll from '../../components/scroll'
    import Slider from '../../components/slider'
    import Loading from '../../components/loading'
    import { getRecommend, getDiscList } from 'api/recommend'
    import { ERR_OK } from 'api/config'
    
    export default{
      data() {
        return {
          recommends: [],
          discLists: []
        }
      },
      created() {
        this._getReommend()
        this._getDiscList()
      },
      methods: {
        _getReommend() {
          getRecommend().then((res) => {
            if (res.code === ERR_OK) {
              this.recommends = res.data.slider
            }
          })
        },
        _getDiscList() {
          getDiscList().then((res) => {
            if (res.code === ERR_OK) {
              this.discLists = res.data.list
              // console.log(res.data.list)
            }
          })
        },
        loadImage() {
          if (!this.checkLoaded) {
            this.$refs.scroll.refresh()
            this.checkLoaded = true
          }
        }
      },
      components: {
        Slider,
        Scroll,
        Loading
      }
    }
</script>

<style rel="stylesheet" lang="stylus">
    @import "../../assets/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>