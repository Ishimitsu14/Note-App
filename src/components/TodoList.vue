<template>
  <transition-group
    name="item-list"
    tag="ul"
  >
    <li
      v-for="item in items"
      :key="item.key"
      :class="{'done': item.checked}"
    >
      <template v-if="editable">
        <checkbox v-model.lazy="item.checked" />
        <input v-model="item.description">
        <btn
          class="btn_todo_remove"
          :icon="['far', 'trash-alt']"
          size="small"
          title="Удалить"
          @click="remove(item)"
        />
      </template>
      <template v-else>
        {{ item.description }}
      </template>
    </li>
    <li
      v-if="editable"
      key="add"
    >
      <checkbox
        v-model="newTodo.checked"
        :disabled="!editable"
      />
      <input
        v-model.lazy="newTodo.description"
        placeholder="Add..."
        @change="add"
      >
    </li>
  </transition-group>
</template>

<script>
import checkbox from './UI/checkbox.vue'
import Todo from '../classes/Todo.js'
import btn from './UI/btn.vue'
import { uuid } from 'uuidv4'

export default {
  name: 'TodoList',
  components: {
    checkbox,
    btn
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      newTodo: new Todo()
    }
  },
  methods: {
    add () {
      this.newTodo.key = uuid()
      this.$emit('add', this.newTodo)
      this.newTodo = new Todo()
    },
    remove (item) {
      this.$emit('remove', item)
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  list-style-type none
  max-width 500px
  width 100%
  overflow auto
  font-weight 400

  li
    display flex
    align-items center
    max-width 100%
    text-overflow ellipsis
    cursor default
    margin 5px
    margin-bottom 30px
    padding 10px 20px
    border-radius 2px
    box-shadow: 0 0 5px white;
    &.done
      text-decoration line-through
    input
      background transparent
      border none
      border-bottom 2px solid transparent
      outline none
      font-size .4em
      width 100%
      &:focus
        border-bottom 1px solid #423fff

@media (orientation: portrait)
  ul
    max-width calc(100% - 40px)
    paddin 0 20px

// Анимации списка
.item-list-move
  transition transform .5s
.item-list-enter-active, .item-list-leave-active
  transition-property opacity, transform
  transition-duration .4s
.item-list-enter, .item-list-leave-active
  opacity 0
  transform scale(.8)
</style>
