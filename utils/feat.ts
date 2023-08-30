function mathEaseout(A: number, B: number, rate: number, callback: (keepsake: number, boo: boolean) => void) {
  if (A === B)
    return

  B = B || 0
  rate = rate || 2

  const step = function () {
    A = A + (B - A) / rate

    if (Math.abs(A - B) < 1) {
      callback(B, true)
      // 启用滚轮滚动
      enableScroll()
      return
    }

    callback(A, false)
    requestAnimationFrame(step)
  }

  step()
  // 禁用滚轮滚动
  disableScroll()
}

/**
 * 减速滚动
 * @param height 滚动高度
 */
export function scrollEaseOut(height: number) {
  const doc = document.body.scrollTop ? document.body : document.documentElement

  // 在滚动开始时禁用滚轮滚动
  disableScroll()

  mathEaseout(doc.scrollTop, height, 10, (value: number, finished: boolean) => {
    doc.scrollTop = value

    if (finished)
      // 在滚动完成时启用滚轮滚动
      enableScroll()
  })
}

/**
 * 监听滚动事件并阻止默认行为
 * @param event
 */
function preventScroll(event: Event) {
  event.preventDefault()
}

/**
 * 添加事件监听器来阻止滚轮事件
 */
function disableScroll() {
  window.addEventListener('wheel', preventScroll, { passive: false })
}

/**
 * 移除事件监听器以允许滚轮事件
 */
function enableScroll() {
  window.removeEventListener('wheel', preventScroll)
}
