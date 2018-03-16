import Vue from 'vue'

export const eventBus = new Vue({
  methods: {
    closeAutoSearchModal (data) {
      this.$emit('closeAutoSearchModal', data)
    }
  }
})