export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach(() => {
    try {
      // eslint-disable-next-line n/prefer-global/process
      if (process.client) {
        // eslint-disable-next-line no-var
        var _hmt: any = _hmt || [];

        (function () {
          const hm = document.createElement('script')
          hm.src = 'https://hm.baidu.com/hm.js?4f956ba94760237122fde60885ee8d40'
          const s = document.getElementsByTagName('script')[0]
          s.parentNode!.insertBefore(hm, s)
        })()
      }
    }
    catch (e) {
      console.error(e)
    }
  })
})
