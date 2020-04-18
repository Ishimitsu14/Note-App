import Vue from 'vue'
export default Vue.directive('body', {
  // отображает элемент внутри body
  // v-body
  inserted (el) {
    el.style.zIndex = '99'
    const container = document.body
    container.appendChild(el)
  },
  unbind (el) {
    el.remove()
  }
})
