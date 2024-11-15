import { defineStore } from 'pinia'
import { ref } from 'vue'

const accessTokenStore = defineStore('access-token', () => {
  const accessToken = ref(localStorage.getItem('access-token'))

  function setAccessToken(value: string) {
    accessToken.value = value
    localStorage.setItem('access-token', value)
  }

  function removeAccessToken() {
    accessToken.value = ''
    localStorage.removeItem('access-token')
  }

  return { accessToken, setAccessToken, removeAccessToken }
})

export default accessTokenStore
