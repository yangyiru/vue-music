<template>
	<li class="song-item">
		<!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
		<router-link :to="{path: '/recommend/songDetail'}" tag="div" class="list-info">
			<div>
				<!-- <img :src="item.imgurl"> -->
				<img v-lazy="item.imgurl">
			</div>
			<div class="song-title">{{item.dissname}}</div>
			<div class="song-name">{{item.creator.name}}</div>
		</router-link>
	</li>
</template>

<script type="text/javascript">
export default {
  props: ["item"],
  methods: {
  // 参考 https://vuefe.cn/v2/guide/custom-directive.html
    directives: {
      swiper: {
        // 钩子函数 bind：在指令第一次绑定到元素时调用，只会调用一次。可以在此钩子函数中，执行一次性的初始化设置。
        bind: function(element, binding) {
          var isTouchMove, startTx, startTy
          element.addEventListener('touchstart', function(e) {
            var touches = e.touches[0]
            startTx = touches.clientX
            startTy = touches.clientY
            isTouchMove = false
          }, false)
          element.addEventListener('touchmove', function(e) {
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy
            if (distanceX < 0) { //右滑
                if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                    if (Math.abs(distanceX) > 20) {
                        element.style.transition = "0.3s"
                        element.style.marginLeft = 0 + "px"
                    }
                }
            } else { //左滑
                if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                    if (distanceX < 156 && distanceX > 20) {
                        e.preventDefault()
                        element.style.transition = "0s"
                        element.style.marginLeft = -distanceX + "px"
                        isTouchMove = true
                    }
                }
            }
            // e.preventDefault()
          }, false);
          element.addEventListener('touchend', function(e) {
              if (!isTouchMove) {
                  return;
              }
              var touches = e.changedTouches[0],
                  endTx = touches.clientX,
                  endTy = touches.clientY,
                  distanceX = startTx - endTx,
                  distanceY = startTy - endTy,
                  isSwipe = false
              if (Math.abs(distanceX) >= Math.abs(distanceY)) {
                  if (distanceX < 0) {
                      return;
                  }
                  if (Math.abs(distanceX) < 60) {
                      isSwipe = true
                      element.style.transition = "0.3s"
                      element.style.marginLeft = 0 + "px"
                  } else {
                      element.style.transition = "0.3s"
                      element.style.marginLeft = "-156px"
                  }
              }
          }, false);
        }
            }
        }
	}
}
</script>

<style type="text/css">
	
</style>