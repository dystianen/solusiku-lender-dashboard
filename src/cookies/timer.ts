import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

// Function to set a timer cookie
export const setTimerCookies = (value: number = 180000): void => {
  const expires = new Date(new Date().getTime() + value)
  cookies.set('timer', value.toString(), expires)
}

// Function to get the timer cookie
export const getTimerCookies = () => {
  const timer = Number(cookies.get('timer'))
  return timer
}

// Function to remove the timer cookie
export const removeTimerCookies = () => {
  return cookies.remove('timer')
}
