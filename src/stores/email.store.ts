import { defineStore } from 'pinia'
import { ref } from 'vue'

const emailStore = defineStore('email', () => {
  const email = ref(localStorage.getItem('email'))

  function setEmail(value: string) {
    email.value = value
    localStorage.setItem('email', value)
  }

  function removeEmail() {
    email.value = ''
    localStorage.removeItem('email')
  }

  return { email, setEmail, removeEmail }
})

export default emailStore
