<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'scale-in'
    }
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'scale-out' : 'scale-in'
    }
  },
  created () {
    if (!this.$ls.getAllNotes().length) {
      this.$ls.generateDefaultData()
    }
  }
}
</script>

<style lang="stylus">
@require('./assets/css/reset.styl')

// Анимации переключения компонентов
.scale-in-enter-active, .scale-in-leave-active
.scale-out-enter-active, .scale-out-leave-active
  position absolute
  transform-origin top center
  transition-property opacity, transform
  transition-duration .4s
  transition-timing-function ease-in-out

.scale-in-enter,
.scale-out-leave-active
  opacity 0
  transform scale(1.5)

.scale-in-leave-active,
.scale-out-enter
  opacity 0
  transform scale(.5)

// Переопределяем стили скролбара
::-webkit-scrollbar
    width 4px
    height 4px
::-webkit-scrollbar-thumb
    border-color #777
    background-color #aaa

</style>
