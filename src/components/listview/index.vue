<template>
    <scroll class="listview" 
       		:data="data" 
       		ref="listview" 
       		:list-scroll="listScroll"
       		:probe-type = 'probeType'
       		@scroll="scroll"
    >
    	<ul class="list-group">
    		<li v-for="(group, index) in data" class="list-group" ref="listGroup">
    			<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" >
						<img class="avatar" v-lazy="item.avatar" alt="">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
    		</li>
    	</ul>
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        	<ul>
        		<li class="item" v-for="(item, index) in shortcutList" :data-index="index" :class="{'current':currentIndex===index}">
        			{{item}}
        		</li>
        	</ul>
        </div>
        <div class="list-fixed" v-show="fixdTitle" ref="fixed">
        	<h1 class="fixed-title">{{fixdTitle}}</h1>
        </div>
        <div v-show="!data.length" class="loading-container">
        	<loading></loading>
        </div>
    </scroll>
</template>

<script>
  import Scroll from '../scroll/index'
  import loading from '../loading/index'
  import { getData } from '../../assets/js/dom'
  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default{
    created() {
      this.touch = {}
      this.listScroll = true
      this.listHight = []
      this.probeType = 3
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixdTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      selectItem(item) { // 派发事件，谁被点击了
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex // 最开始点击时，触摸的位置
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta // move时，触摸的位置
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
        // this.currentIndex =
      },
      _scrollTo(index) {
        console.log(index)
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHight.length - 2) {
          index = this.listHight.length - 2
        }
        this.scrollY = -this.listHight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)  // scrollToElement(参数1，参数2) 参数2：动画时间
      },
      _calculateHeight() {
        this.listHight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHight.push(height)
        for (var i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHight.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHight = this.listHight
        // 当滚动顶部 newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 中间部分滚动
        for (var i = 0; i < listHight.length; i++) {
          let height1 = listHight[i]
          let height2 = listHight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动底部 ，且-newY大于最后一个元素的上限
        this.currentIndex = listHight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      loading
    }
  }
</script>

<style rel="stylesheet" lang="stylus">
 @import "../../assets/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)   
</style>