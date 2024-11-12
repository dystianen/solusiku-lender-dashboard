import { ref } from 'vue'

const token = localStorage.getItem('access-token')
export const accessToken = ref(token)

export const setAccessToken = (value: string): void => {
  localStorage.setItem('access-token', value)
  accessToken.value = value
}

export const removeAccessToken = () => {
  localStorage.removeItem('access-token')
  accessToken.value = ''
}
