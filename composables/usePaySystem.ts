import axios from 'axios'

export function usePaySystem() {
  // QR code key
  const qrcodeKey = ref('')
  // generating QR code image
  const isGenerating = ref(false)

  const timer = ref<ReturnType<typeof setTimeout>>()
  // pay state
  const currentPayState = ref<
    typeof PaySystem.PayStatusConst[keyof typeof PaySystem.PayStatusConst]
  >(PaySystem.PayStatusConst.INIT)
  // whether to stop polling
  const isStop = ref(false)

  function toggleItem<Item, Index>(item: Item, index: Index) {
    isGenerating.value = true

    return {
      item,
      index,
    }
  }

  function createOrder<T>(params: T) {
    clearPayTimer()

    setPayState(PaySystem.PayStatusConst.INIT)

    axios.post('/ement', params)
      .then((res) => {
        if (res.data.status === 0) {
          const key = res.data.hash_order_no
          qrcodeKey.value = `${window.location.origin}/mobile/${key}`
          pollOrderState(key)
        }
        else {
          setPayState(PaySystem.PayStatusConst.CREATE_FAIL)
          clearPayTimer()
        }
      })
      .then(() => isGenerating.value = false)
      .catch(_ => console.error(_))
  }

  function pollOrderState(key: string) {
    if (isStop.value)
      return

    axios.post('/check', { hash_order_no: key })
      .then((res) => {
        if (res.data.status === 'error') {
          clearPayTimer()

          if (res.data.message === '-101') {
            timer.value = setTimeout(() => pollOrderState(key), 2000)
          }
          else if (res.data.message === '-102') {
            setPayState(PaySystem.PayStatusConst.WAIT)
            timer.value = setTimeout(() => pollOrderState(key), 2000)
          }
          else if (res.data.message === '-99') {
            setPayState(PaySystem.PayStatusConst.MATURITY)
          }
          else if (res.data.message === '-400') {
            setPayState(PaySystem.PayStatusConst.ERROR)
          }
        }
        else {
          setPayState(PaySystem.PayStatusConst.SUCCESS)
          clearPayTimer()
        }
      })
      .catch(_ => console.error(_))
  }

  function clearPayTimer() {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = undefined
    }
  }

  function setPayState(state: typeof PaySystem.PayStatusConst[keyof typeof PaySystem.PayStatusConst]) {
    if (currentPayState.value === state)
      return

    currentPayState.value = state
  }

  function terminationPolling() {
    clearPayTimer()
    setPayState(PaySystem.PayStatusConst.INIT)
    isStop.value = true
  }

  return {
    qrcodeKey,
    isGenerating,
    currentPayState,
    toggleItem,
    createOrder,
    pollOrderState,
    clearPayTimer,
    terminationPolling,
  }
}
