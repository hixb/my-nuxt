export default function({
  $axios,
  app
}) {
  //每次请求获取cooike
  $axios.onRequest(async config => {
    //获取cookie放在头部传到后端
    return config;
  });

  $axios.onResponse(response => {
    return Promise.resolve(response.data);
  });

  $axios.onError(error => {
    return Promise.reject(error);
  });
}
