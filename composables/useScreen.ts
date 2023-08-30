export function useScreen() {
  enum ScreenSize {
    SM = 640,
    MD = 768,
    LG = 1024,
    XL = 1280,
  }

  const { width } = useWindowSize()
  const lessThanMD = computed(() => width.value <= ScreenSize.MD)

  return {
    ScreenSize,
    width,
    lessThanMD,
  }
}
