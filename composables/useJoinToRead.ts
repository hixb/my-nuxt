export function useJoinToRead() {
  const { get, set } = useIdbStore()

  function setRead<T extends Record<string, any>>(value: T) {
    get(IndexedBDSpace.BDEnum.JOIN_TO_READ)
      .then((data) => {
        console.log(data)
      })
  }

  return {
    setRead,
  }
}
