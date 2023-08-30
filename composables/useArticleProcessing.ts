interface ArticleProcessing {
  /**
   * 目录数组
   */
  directoryArray: {
    /**
     * 未处理特殊字符的锚点ID
     */
    id: string
    /**
     * 内容
     */
    content: string
    /**
     * 已处理处理特殊字符的锚点ID
     */
    processedID: string
  }[]
  /**
   * 标签带有锚点定位的内容
   */
  withAnchor: string
  /**
   * 预计阅读时间(单位：分钟)
   */
  readingTimeMinutes: number
  /**
   * 将pre内容处理为字符串(过滤标签及转义特殊字符)
   */
  toString: string
}

export function useArticleProcessing(content: globalThis.Ref<string> | string): ArticleProcessing {
  const assignmentContent = typeof content === 'string' ? content : content.value

  const regex = /<h2>(.*?)<\/h2>/g
  const matches = [...assignmentContent.matchAll(regex)]

  // 去除标签，只保留内容
  const contentOnly = assignmentContent.replace(/<[^>]+>/g, '')
  const textLen = contentOnly.length
  const worksPerMinute = 200
  // 预计阅读时间(单位：分钟)
  const readingTimeMinutes = Math.ceil(textLen / worksPerMinute)

  let withAnchor = assignmentContent

  const directoryArray = matches.map((match) => {
    const id = match[1]
    const processedID = id.replace(/[^a-zA-Z\u4E00-\u9FA5]/gis, '_')
    const assignmentContent = match[0]
    const newContent = assignmentContent.replace('<h2>', `<h2 id="${processedID}">`)

    withAnchor = withAnchor.replace(assignmentContent, newContent)
    return { id, content: newContent, processedID }
  })

  const match = assignmentContent.match(/<code[^>]*>([\s\S]*?)<\/code>/i)
  const toString = match && match[1] ? match[1].replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&') : ''

  return {
    directoryArray,
    withAnchor,
    readingTimeMinutes,
    toString,
  }
}
