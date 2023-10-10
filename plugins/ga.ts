export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach(() => {
    try {
      // eslint-disable-next-line n/prefer-global/process
      if (process.client) {
        // eslint-disable-next-line no-var
        var _hmt: any = _hmt || [];

        (function () {
          // Baidu Statistics
          const hm = document.createElement('script')
          hm.src = 'https://hm.baidu.com/hm.js?4f956ba94760237122fde60885ee8d40'
          const s = document.getElementsByTagName('script')[0]
          s.parentNode!.insertBefore(hm, s)

          const MANAGEMENT_ID = 'GTM-MK4BFZWS'
          // Google Tag Manager
          const track = document.createElement('script')
          track.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${MANAGEMENT_ID}');
          `
          const pushTo = document.getElementsByTagName('meta')[0]
          pushTo.parentNode?.insertBefore(track, pushTo)

          // Google Tag Manager (noscript)
          const noscript = document.createElement('noscript')
          noscript.innerHTML = `
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=${MANAGEMENT_ID}"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        `
          document.body.insertBefore(noscript, document.body.firstChild)
        })()
      }
    }
    catch (e) {
      console.error(e)
    }
  })
})
