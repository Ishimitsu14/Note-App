'use strict'
import { uuid } from 'uuidv4';
import Todo from './Todo.js'
/** Class representing a Tick. */
class Note {
  /**
   * Create a Note
   * @param {Object} note - The Note value
   * @returns {Object} The Note proxying value
   */
  constructor (note) {
    this.id = (note || {}).id || uuid()
    this.created = (note || {}).created || new Date()
    this.label = (note || {}).label || ''
    this.todoList = ((note || {}).todoList || []).map(data => new Todo(data))
    this.$versions = []
    this.$versionNumber = 0
    this.$silent = false
    return new Proxy(this, {
      set (target, name, value) {
        if (!target.$silent && !name.startsWith('$')) {
          target.createVersion()
        }
        target[name] = value
        return true
      }
    })
  }

  /**
   * Откатывает версию note к следующей (если возможно).
   */
  applyNextVersion () {
    if (this.$versions[this.$versionNumber + 1]) {
      this.$versionNumber += 1
    }
    this.applyVersion(this.$versionNumber)
  }

  /**
   * Откатывает версию note к предыдущей (если возможно).
   */
  applyPreviousVersion () {
    // Создаем версию, если происходит первый откат
    if (this.$versionNumber === this.$versions.length && this.$versions.length) {
      this.createVersion()
      this.$versionNumber -= 1
    }
    if (this.$versions[this.$versionNumber - 1]) {
      this.$versionNumber -= 1
    }
    this.applyVersion(this.$versionNumber)
  }

  /**
   * Применяет указанную версию к note
   * @param {Number} v - Индекс версии
   */
  applyVersion (v = 0) {
    const to = this.getVersion(v)
    this.$silent = true
    Object.keys(to).forEach(k => {
      this[k] = to[k]
    })
    this.$silent = false
  }

  /**
   * Получаем указанную версию по индексу
   * @param {Number} v - Индекс версии
   * @returns {Object} Запрошенная версия или текущий note
   */
  getVersion (v) {
    if (this.$versions[v]) {
      return this.$versions[v]
    }
    return this
  }

  /**
   * Создает версию note исходя из текущего состояния
   */
  createVersion () {
    const clone = { ...this }
    Object.keys(clone)
      .filter(k => k.startsWith('$'))
      .forEach(k => {
        delete clone[k]
      })
    this.$versions.push(clone)
    this.$versionNumber = this.$versions.length
  }

  /**
   * Get Cостояние изменен/изменен
   * @type {Boolean}
   */
  get changed () {
    return !!this.$versions.length || this.todoList.filter(todo => todo.$changed).length
  }

  /**
   * Get Короткий список Todo до 4х элементов
   * @type {Array}
   */
  get shortTodoList () {
    return this.uncompleteToComplete.slice(0, 4)
  }

  /**
   * Get Список всех незавершенных Todo
   * @type {Array}
   */
  get uncomplete () {
    return this.todoList.filter(todo => !todo.checked)
  }

  /**
   * Get Список всех завершенных Todo
   * @type {Array}
   */
  get complete () {
    return this.todoList.filter(todo => todo.checked)
  }

  /**
   * Get Список всех Todo от незавршенных к завершенным
   * @type {Array}
   */
  get uncompleteToComplete () {
    return [...this.uncomplete, ...this.complete]
  }

  /**
   * Get Список всех Todo от завршенных к незавершенным
   * @type {Array}
   */
  get completeToUncomplete () {
    return this.uncompleteToComplete.reverse()
  }

  /**
   * Get Ключ для обращения к LocalStorage
   * @type {String}
   */
  get key () {
    return `note_${this.id}`
  }
}

export default Note
