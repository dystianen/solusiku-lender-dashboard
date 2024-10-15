import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccessTokenStore = defineStore('access-token', () => {
  const accessToken = ref('')
  function setAccessToken(token: string) {
    accessToken.value = token
  }

  return { accessToken, setAccessToken }
})
