import { onMounted, onUnmounted, ref } from 'vue'

function useScreenType() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  // Function to check the window width and update device type
  const updateDeviceType = () => {
    const width = window.innerWidth

    if (width <= 768) {
      isMobile.value = true
      isTablet.value = false
      isDesktop.value = false
    } else if (width > 768 && width <= 1024) {
      isMobile.value = false
      isTablet.value = true
      isDesktop.value = false
    } else {
      isMobile.value = false
      isTablet.value = false
      isDesktop.value = true
    }
  }

  onMounted(() => {
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType)
  })

  return { isMobile, isTablet, isDesktop }
}

export default useScreenType
