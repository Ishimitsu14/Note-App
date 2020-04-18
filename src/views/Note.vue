<template>
  <div class="layout">
    <div
      class="note"
    >
      <input
        v-model="note.label"
        placeholder="Some label"
      >
      <todo-list
        :items="note.todoList"
        @add="addTodo"
        @remove="removeTodo"
      />
      <!-- Элементы управления -->
      <div class="controls">
        <btn
          v-if="note.changed"
          :icon="['far', 'save']"
          title="Save"
          @click="save()"
        />
        <btn
          v-if="!newNoteComputed"
          :icon="['far', 'trash-alt']"
          title="Delete"
          @click="remove()"
        />
        <btn
          :icon="['fas', 'times']"
          :title="undoTitleComputed"
          @click="cancel()"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @example [none]
 */
import Note from '../classes/Note'
import TodoList from '../components/TodoList'
import btn from '../components/UI/btn.vue'

export default {
  name: 'Note',
  components: { TodoList, btn },
  props: {
    /**
     * Id Note
     * @values {[Number, String]}
     */
    id: {
      type: [Number, String],
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      to: 0,
      note: new Note(this.$ls.get(`note_${this.id}`))
    }
  },
  computed: {
    undoTitleComputed () {
      return this.note.changed ? 'Cancel' : 'Return'
    },
    newNoteComputed () {
      return [0, '0'].includes(this.id)
    }
  },
  created () {
    document.addEventListener('keydown', this.hotkeyHundler)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.hotkeyHundler)
  },
  methods: {
    /**
     * Выполняет сохранение
     * @public
     */
    save () {
      if (!this.note.label) {
        return this.$modal.create(
          {
            label: 'CONTINUE?',
            description: 'Note must contain label.',
            actions: {
              ok: { do: () => { this.$router.push('/') }, title: 'Home', icon: ['far', 'caret-square-left'] },
              cancel: { icon: ['fas', 'times'], title: 'Close' }
            }
          }
        )
      }
      this.$ls.set(this.note)
      this.cancel(true)
    },
    /**
     * Выполняет удаления
     * @public
     */
    remove () {
      const del = () => {
        this.$ls.remove(this.note)
        this.cancel(true)
      }
      this.$modal.create(
        {
          label: 'CONTINUE?',
          description: `"${this.note.label}" will be deleted.`,
          actions: {
            ok: { do: del, icon: ['far', 'trash-alt'], title: 'Delete' },
            cancel: { icon: ['fas', 'times'], title: 'Close' }
          }
        }
      )
    },
    /**
     * Выполняет добавление Todo элемента в список
     * @param {Object} data - объект new Todo()
     * @public
     */
    addTodo (data) {
      // Proxy не отследит простой push, т.к. следит за note
      this.note.todoList = [...this.note.todoList, data]
    },
    /**
     * Выполняет удаление Todo элемента из списка
     * @param {Object} data - объект new Todo()
     * @public
     */
    removeTodo (data) {
      this.note.todoList = this.note.todoList.filter(todo => todo.key !== data.key)
    },
    /**
     * Выполняет переход на домашнюю страницу
     * @param {Boolean} forced - флаг принудительной переадресации. Игнорирует проверку несохраненных изменений
     * @public
     */
    cancel (forced = null) {
      if (this.note.changed && !forced) {
        const abort = () => {
          this.cancel(true)
        }
        return this.$modal.create(
          {
            label: 'SAVE CHANGES?',
            description: `"${this.note.label}" contains unsaved changes.`,
            actions: {
              ok: { do: this.save, icon: ['far', 'trash-alt'], title: 'Save and exit' },
              return: { name: 'return', do: abort, title: 'Not save and exit', icon: ['far', 'caret-square-left'], order: 15 },
              cancel: { icon: ['fas', 'times'], title: 'Close' }
            }
          }
        )
      }
      this.$router.push('/')
    },
    /**
     * Обработчик нажатия кнопок
     * @param e - нативное событие нажатия кнопок
     * @public
     */
    hotkeyHundler (e) {
      if (e.code === 'KeyZ' && e.ctrlKey && !e.shiftKey) {
        e.preventDefault()
        this.note.applyPreviousVersion()
      }
      if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        this.note.applyNextVersion()
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.layout
  display flex
  flex 1
  width 100%
  height 100%
  overflow hidden

.note
  background #2D2C3E
  border-radius 5px
  box-shadow 0 5px 5px #000000
  padding 40px 0
  max-width 900px
  width 100%
  height 600px
  margin auto
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-size 3em
  font-weight 600
  position relative
  input
    margin-bottom 40px
    background-color transparent
    outline none
    border none
    font-size 1em
    text-align center
    border-bottom 2px solid transparent
    &:focus
      border-bottom 2px solid #423fff

  .controls
    position absolute
    bottom 15px
    right 30px
    display flex
    align-self flex-end
    .btn
      margin 5px

@media (orientation: portrait)
  .note
    width calc(100% - 30px)
    height 100%
    input
      max-width calc(100% - 30px)
</style>
