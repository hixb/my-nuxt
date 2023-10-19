export function useJoinToRead() {
  const { get } = useIdbStore()

  function setRead<T extends Record<string, any>>(value: T) {
    get(IndexedBDSpace.BDEnum.JOIN_TO_READ)
      .then(data => useLog('log', data))
  }

  return {
    setRead,
  }
}
