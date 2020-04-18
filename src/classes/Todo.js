'use strict'
import { uuid } from 'uuidv4';
/** Class representing a Todo. */
class Todo {
  /**
   * Create a Todo
   * @param {Object} todo - The todo value
   * @return {Object} The todo proxying value
   */
  constructor (todo) {
    this.checked = (todo || {}).checked || false
    this.description = (todo || {}).description || ''
    this.key = (todo || {}).key || uuid()
    this.$changed = false
    return new Proxy(this, {
      set (target, name, value) {
        target.$changed = true
        target[name] = value
        return true
      }
    })
  }
}

export default Todo
