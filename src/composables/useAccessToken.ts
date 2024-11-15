import { ref } from 'vue'

const token = localStorage.getItem('access-token')
const accessToken = ref(token)

export default function useAccessToken() {
  const setAccessToken = (value: string) => {
    localStorage.setItem('access-token', value)
    accessToken.value = value
  }

  const removeAccessToken = () => {
    localStorage.removeItem('access-token')
    accessToken.value = ''
  }

  return { accessToken, setAccessToken, removeAccessToken }
}
