export function useLog() {
  return {
    log: (message: any) => {
      // eslint-disable-next-line n/prefer-global/process
      if (process.env.NODE_ENV !== 'production')
        // eslint-disable-next-line no-console
        console.log(message)
    },
    warn: (message: any) => {
      console.warn(message)
    },
    error: (message: any) => {
      console.error(message)
    },
    info: (message: any) => {
      // eslint-disable-next-line n/prefer-global/process
      if (process.env.NODE_ENV !== 'production')
      // eslint-disable-next-line no-console
        console.info(message)
    },
  }
}
