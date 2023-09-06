export function useAside() {
  const openAside = useState('openAside', () => true)
  /**
   * 设置侧边栏的开关
   * @param {AsideAlways} always
   */
  const setOpenAside = (always: AsideAlways = 0) => {
    if (always === 0)
      openAside.value = !openAside.value
    else if (always === 1)
      openAside.value = true
    else if (always === 2)
      openAside.value = false
  }

  return {
    openAside,
    setOpenAside,
  }
}
