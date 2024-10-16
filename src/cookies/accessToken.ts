import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

const token = cookies.get('access-token')
export const accessToken = ref(token)

export const setAccessToken = (value: string): void => {
  cookies.set('access-token', value)
  accessToken.value = value
}
