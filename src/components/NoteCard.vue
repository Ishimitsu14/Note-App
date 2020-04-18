<template>
  <div
    class="note"
    @click="edit"
  >
    <btn
      class="delete_action"
      :icon="['far', 'trash-alt']"
      @click.stop="remove"
    />
    <p :title="note.label">
      {{ labelComputed }}
    </p>
    <todo-list
      :items="note.shortTodoList"
      :editable="false"
      class="overflow-hidden"
    />
  </div>
</template>

<script>
import TodoList from './TodoList'
import btn from './UI/btn'

export default {
  name: 'NoteCard',
  components: { TodoList, btn },
  props: {
    /**
     * Объект Note
     * @values new Note()
     */
    note: {
      type: Object,
      required: true
    }
  },
  computed: {
    labelComputed () {
      return this.note.label.length > 16 ? `${this.note.label.slice(0, 20)}...` : this.note.label
    },
    linkComputed () {
      return `/note/${this.note.id}`
    }
  },
  methods: {
    /**
     * Открывает заметку на редактирование
     * @public
     */
    edit () {
      this.$router.push(this.linkComputed)
    },
    /**
     * Удаляет заметку (с подтверждением через Modal)
     * @public
     */
    remove () {
      this.$modal.create(
        {
          label: 'WARNING',
          description: `"${this.note.label}" будет удален. Вы уверены?`,
          actions: {
            ok: {
              name: 'Ok',
              icon: ['far', 'trash-alt'],
              do: () => {
                this.$ls.remove(this.note)
                /**
                 * Событие обновления (состояние карточки обновилось)
                 */
                this.$emit('update')
              }
            },
            cancel: { icon: ['fas', 'times'], title: 'Close' }
          }
        }
      )
    }
  }
}
</script>

<style scoped lang="stylus">
.note
  background #2D2C3E
  overflow hidden
  border-radius 5px
  box-shadow 0 5px 5px #000000
  max-width calc(100% - 40px)
  padding 40px 20px 20px 20px
  width calc(23% - 40px)
  min-width 240px
  height 420px
  margin 1%
  display flex
  flex-direction column
  align-items center
  font-size 3em
  font-weight 600
  cursor pointer
  position relative

  .delete_action
    position absolute
    top 10px
    right 10px

  &:after
    content ''
    cursor: pointer
    display block
    position absolute
    top 0
    height 100%
    width 100%
    background #F5F5F5
    border-left 10px solid #423fff
    opacity .2
    transform-origin left top
    transform scale(0, 1)
    transition transform .3s ease
  &:hover
    &:after
      transform scale(1, 1)

  p
    text-align center
    text-transform uppercase
    margin-top 25px
    margin-bottom 20px
    font-size 40px
    height 90px
    width 100%
    overflow hidden

  ul
    font-size .5em
    list-style-type none
    li
      display flex
      align-items center

@media (orientation: portrait)
  .note
    margin .5% 0
    width calc(100% - 40px)
    flex-shrink 0
</style>
