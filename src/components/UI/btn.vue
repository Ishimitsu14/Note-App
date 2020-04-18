<template>
  <transition
    name="fade"
    appear
  >
    <!--
      Срабатывает при клике
      @event click
      @property {$event} - нативный event
    -->
    <button
      class="btn"
      @click="$emit('click', $event)"
    >
      <font-awesome-icon :icon="icon" />
    </button>
  </transition>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    /**
     * Имя иконки
     */
    icon: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped lang="stylus">
$icon-size = 40px
$icon-border-radius = 1
$red = #C82647

.btn
  background none
  outline none
  border none
  cursor pointer
  position relative
  display inline-block
  min-width $icon-size
  width $icon-size
  height $icon-size
  margin-left 5px
  margin-right 5px
  border-radius $icon-size*$icon-border-radius
  overflow hidden
  &-fixed
    width 70px
    height 70px
    right 100px
    bottom 40px
    position fixed

    svg
      font-size: 24px
  &:before, &:after
    content ''
    position absolute
    top 0
    left 0
    height 100%
    width 100%
    transition all 0.25s ease
    border-radius $icon-size*$icon-border-radius
  &:before
    transition-duration 0.5s
    box-shadow inset 0 0 0 2px $red
  &:hover:before
    box-shadow inset 0 0 0 $icon-size $red
  svg
    position absolute
    color white
    left 0
    font-size 14px
    transition all 0.25s ease
    top 0
    right 0
    bottom 0
    margin auto

// Анимации появления
.fade-enter-active, .fade-leave-active
  transition opacity .2s ease

.fade-enter, .fade-leave-to
  opacity 0

</style>
