export function useAuthor() {
  const authorName = 'Xiaobing Zhu'
  const websiteTitle = 'Xiaobing\'s Blog'
  const connectMe: { link: string; rel: Relation[]; icon: string; title?: string }[] = [
    { icon: 'crypto-company/twitch', link: '/', rel: ['nofollow', 'noopener'] },
    { icon: 'crypto-company/facebook', link: '/', rel: ['nofollow', 'noopener'] },
    { icon: 'crypto-company/whatsapp', link: '/', rel: ['nofollow', 'noopener'] },
    { icon: 'crypto-company/google', link: '/', rel: ['nofollow', 'noopener'] },
  ]

  return {
    authorName,
    websiteTitle,
    connectMe,
  }
}
