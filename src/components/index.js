import Vue from 'vue'

const requireComponent = require.context('./', true, /\.vue$/)

requireComponent.keys().forEach((item) => {
  const defaultObj = requireComponent(item).default

  Vue.component(defaultObj.name, defaultObj)
})
