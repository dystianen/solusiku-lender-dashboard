import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const verification = cookies.get('verification-token')
export const verificationToken = ref(verification)

export const setVerificationToken = (value: string): void => {
  cookies.set('verification-token', value)
  verificationToken.value = value
}

export const removeVerificationToken = () => {
  cookies.remove('verification-token')
  verificationToken.value = ''
}
