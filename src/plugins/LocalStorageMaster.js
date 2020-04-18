import Note from '../classes/Note'
import Todo from '../classes/Todo'
const ls = {
  getAllNotes () {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('note_'))
      .map(key => this.get(key))
  },
  set (data) {
    localStorage.setItem(data.key, JSON.stringify(data))
  },
  get (key) {
    const data = localStorage.getItem(key)
    return data ? new Note(JSON.parse(data)) : data
  },
  remove (data) {
    localStorage.removeItem(data.key)
  },
  generateDefaultData () {
    const data = [
      {
        id: new Date().getTime(),
        label: 'Edit Note',
        todoList: [
          new Todo({ description: 'Click on Note' }),
          new Todo({ description: 'Toggle first goal' })
        ]
      },
      {
        id: new Date().getTime() + 1,
        label: 'Create Note',
        todoList: [
          new Todo({ description: 'Click on "add" button' }),
          new Todo({ description: 'Fill in the fields and create task' })
        ]
      },
      {
        id: new Date().getTime() + 2,
        label: 'Pick a Color',
        todoList: [
          new Todo({ description: 'Click on "add" button or edit Note' }),
        ]
      }
    ]
    data.forEach(note => this.set(new Note(note)))
  }
}

export default {
  install (Vue) {
    Vue.prototype.$ls = ls
  }
}
