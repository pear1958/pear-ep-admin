import { defineComponent, h, Fragment } from 'vue'

export default defineComponent({
  name: 'TabItem',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  render() {
    return h(Fragment, (this.$slots as any).default())
  }
})
