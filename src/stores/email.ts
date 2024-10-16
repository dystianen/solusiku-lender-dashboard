import { defineStore } from 'pinia'
import { ref } from 'vue'

const useEmailStore = defineStore('email', () => {
  // Initialize email with the value from localStorage if it exists
  const email = ref(localStorage.getItem('email') || '')

  function setEmail(value: string) {
    email.value = value
    localStorage.setItem('email', value) // Store the value in localStorage
  }

  return { email, setEmail }
})

export default useEmailStore
