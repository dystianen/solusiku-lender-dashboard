import { defineStore } from 'pinia'
import { ref } from 'vue'

const verificationTokenStore = defineStore('verification-token', () => {
  const verificationToken = ref(localStorage.getItem('verification-token') || '')

  function setVerificationToken(value: string) {
    verificationToken.value = value
    localStorage.setItem('verification-token', value)
  }

  function removeVerificationToken() {
    verificationToken.value = ''
    localStorage.removeItem('verification-token')
  }

  return { verificationToken, setVerificationToken, removeVerificationToken }
})

export default verificationTokenStore
