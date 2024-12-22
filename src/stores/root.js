import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const rootStore = defineStore('root', () => {

  const request = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    })
  }

  return {request}
})
