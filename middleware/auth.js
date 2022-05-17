const limitRoutes = [
  'member'
];

function checkRoute (routeName) {
  let isLimit = limitRoutes.findIndex(item => routeName.includes(item));
  if (isLimit > -1) {
    throw new Error('Stop');
  }
}

export default function ({
  route,
  store,
  redirect,
  req
}) {
  if (process.server) {
    if (req && req.headers && req.headers.cookie) {
      if (req.headers.cookie.indexOf('is_login') > -1) {
      } else {
        try {
          checkRoute(route.name);
        } catch (e) {
          redirect('/'); // 跳去登录
        }
      }
    }
  } else {
    if (store.state.userInfo != '' && store.state.userInfo?.is_login == 0) {
      try {
        checkRoute(route.name);
      } catch (e) {
        // 跳去登录
        redirect('/');
      }
    }
  }
}
