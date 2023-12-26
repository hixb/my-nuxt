const { apiService } = useApiService()

export namespace RandomImage {
  export interface Request {
    hello: string
  }

  export interface Response {
    message: string
    status: string
  }
}

const FetchData = {
  /**
   * 获取狗狗图片
   * @param {RandomImage.Request} params Request Parameters
   */
  getDogImages(params: RandomImage.Request) {
    return apiService.get<RandomImage.Response>('https://dog.ceo/api/breeds/image/random', params)
  },
}

export default FetchData
