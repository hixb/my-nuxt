export function useLog(mode: 'log' | 'warn' | 'error' | 'info', message: any) {
  // eslint-disable-next-line n/prefer-global/process
  if (mode === 'log' && process.env.NODE_ENV !== 'production')
    // eslint-disable-next-line no-console
    console[mode](message)
  else
    // eslint-disable-next-line no-console
    console[mode](message)
}
