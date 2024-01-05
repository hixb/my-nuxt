export function useJoinToRead() {
  const { get } = useIdbStore()
  const { log } = useLog()

  function setRead<T extends Record<string, any>>(value: T) {
    get(IndexedBDSpace.BDEnum.JOIN_TO_READ)
      .then(data => log(data))
  }

  return {
    setRead,
  }
}
