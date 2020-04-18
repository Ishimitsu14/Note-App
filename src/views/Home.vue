<template>
  <div class="home">
    <btn
      class="btn-fixed"
      :icon="['fas', 'plus']"
      title="Создать"
      @click="create"
    />
    <note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :is-overflow="true"
    />
  </div>
</template>

<script>
import Note from '../components/NoteCard'
import btn from '../components/UI/btn'

export default {
  name: 'Home',
  components: { Note, btn },
  data() {
    return {
      notes: this.$ls.getAllNotes()
    }
  },
  methods: {
    /**
     * Переход на страницу создания нового Note
     * @public
     */
    create () {
      this.$router.push('/note/create')
    }
  }
}
</script>

<style scoped lang="stylus">
.home
  display flex
  flex 1
  flex-wrap wrap
  align-content flex-start
  width 100%
  height 100%
  .btn_add
    z-index 2
    position absolute
    bottom 20px
    right 20px

@media (orientation: portrait)
  .home
    flex-direction column
    flex-wrap nowrap
    margin 0
</style>
