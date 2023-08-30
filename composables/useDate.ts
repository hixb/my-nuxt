export function useTime() {
  const DATE = new Date()

  const period = computed(() => {
    const currentHour = DATE.getHours()

    if (currentHour >= 0 && currentHour < 6)
      return '凌晨'
    else if (currentHour >= 6 && currentHour < 12)
      return '上午好！'
    else if (currentHour >= 12 && currentHour < 18)
      return '下午好！'
    else
      return '晚上好！'
  })

  return {
    period,
  }
}
