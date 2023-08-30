import { themeVariety } from '~/plugins/highlight'

export function useTheme() {
  enum THEME {
    DARK = 'dark',
    LIGHT = 'light',
  }

  const isDark = ref(false)
  const colorMode = useColorMode()
  const theme = useState('theme', () => colorMode.value)
  const icon = computed(() => isDark.value ? 'weather/sun' : 'weather/moon')

  onMounted(async () => {
    await nextTick()

    isDark.value = theme.value === THEME.DARK

    themeVariety(isDark.value)
  })

  watch(() => colorMode.value, (newVal) => {
    theme.value = newVal
    isDark.value = newVal === THEME.DARK
  }, {
    immediate: true,
  })

  function toggleTheme() {
    colorMode.preference = isDark.value ? THEME.LIGHT : THEME.DARK
    isDark.value = !isDark.value

    themeVariety(isDark.value)
  }

  return {
    theme,
    THEME,
    isDark,
    icon,
    toggleTheme,
  }
}
