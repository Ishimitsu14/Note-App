<template>
  <label :class="{'checked': checked, 'editable': !disabled}">
    <!--
      Срабатывает при изменении
      @event change
      @property {Boolean} value - значение checked
    -->
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', !checked)"
    >
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    /**
     * Значение чекбокса
     */
    checked: {
      type: Boolean,
      required: true
    },
    /**
     * Disabled-статус чекбокса
     */
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="stylus">
input
  display none

label
  width 20px
  min-width 20px
  height 20px
  min-height 20px
  border-radius 2px
  border 1px solid #423fff
  margin 5px
  margin-right 15px
  position relative
  display flex
  align-items center
  justify-content center
  &.editable
    cursor pointer
  &.checked
    background-color #423fff
    &:after
      opacity 1

label:after
  content ''
  display block
  position absolute
  background-color white
  width 50%
  height 50%
  border-radius 100%
  opacity 0
  transition opacity .3s ease
</style>
