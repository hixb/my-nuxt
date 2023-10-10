export function useAuthor() {
  // Author name
  const authorName = 'Xiaobing Zhu'
  // Website title
  const websiteTitle = 'Xiaobing\'s Blog'
  // Contact information
  const connectMe: { link: string; rel: Relation[] | string; icon: string; title?: string; target?: Target }[] = [
    {
      icon: 'crypto-company/twitter',
      link: 'https://twitter.com/DawnZhu',
      target: '_blank',
      rel: ['nofollow', 'noopener'].join(' '),
    },
    {
      icon: 'emails-message/sms',
      link: 'mailto:hixbing@gmail.com',
      target: '_blank',
      rel: ['nofollow', 'noopener'].join(' '),
    },
    {
      icon: 'crypto-company/telegram',
      link: 'https://t.me/dawnice',
      target: '_blank',
      rel: ['nofollow', 'noopener'].join(' '),
    },
    {
      icon: 'crypto-company/github',
      link: 'https://www.github.com/hixb',
      target: '_blank',
      rel: ['nofollow', 'noopener'].join(' '),
    },
  ]
  // Case number
  const filing = '粤公网安备 44156545号'

  return {
    authorName,
    websiteTitle,
    connectMe,
    filing,
  }
}
