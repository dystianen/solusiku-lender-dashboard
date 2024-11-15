import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

export default function useTimer() {
  const setTimerCookies = (value: number = 60000): void => {
    const expires = new Date(new Date().getTime() + value)
    cookies.set('timer', value.toString(), expires)
  }

  const getTimerCookies = () => {
    const timer = Number(cookies.get('timer'))
    return timer
  }

  const removeTimerCookies = () => {
    return cookies.remove('timer')
  }

  return { setTimerCookies, getTimerCookies, removeTimerCookies }
}
