import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const verification = cookies.get('verification-token')
const verificationToken = ref(verification)

export default function useVerificationToken() {
  const setVerificationToken = (value: string): void => {
    cookies.set('verification-token', value)
    verificationToken.value = value
  }

  const removeVerificationToken = () => {
    cookies.remove('verification-token')
    verificationToken.value = ''
  }

  return { verificationToken, setVerificationToken, removeVerificationToken }
}
