<template>
    <div ref="wrapper" class="wrapper">
    	<slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default{
      props: {
        probeType: { // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发 - scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: true
        },
        data: { // 数据源
          type: Array,
          default: null
        },
        listScroll: { // 要不要监听滚动事件
          type: Boolean,
          default: false
        }
      },
      mounted() {
        setTimeout(() => {
          this._initScroll()
        }, 20)
      },
      methods: {
        _initScroll() {
          if (!this.$refs.wrapper) { //
            return
          }
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: this.click
          })
          if (this.listScroll) {
            let me = this
            this.scroll.on('scroll', (pos) => {
              this.$emit('scroll', pos)
            })
          }
        },
        enable() {
          this.scroll && this.scroll.enable()
        },
        disable() {
          this.scroll && this.scroll.disable()
        },
        refresh() {
          this.scroll && this.scroll.refresh()
        },
        scrollTo() {
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
      },
      watch: {
        data() {
          setTimeout(() => {
            this.refresh()
          }, 20)
        }
      }
    }
</script>

<style rel="stylesheet">
    
</style>