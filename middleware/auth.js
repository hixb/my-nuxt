const limitRoutes = [
  'member'
]
export default function ({
  route,
  store,
  redirect,
  req
}) {
  if (req && req.headers && req.headers.cookie) {
    if (!req.headers.cookie.includes('is_login')) {
      try {
        limitRoutes.forEach((item) => {
          if (route.name.includes(item)) {
            redirect('/')
          }
        })
      } catch (e) {
        redirect('/')
      }
    }
  }
}
