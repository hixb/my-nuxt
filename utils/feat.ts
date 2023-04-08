function mathEaseout(
  A: number,
  B: number,
  rate: number,
  callback: (keepsake: number, boo: boolean) => void
) {
  if (A == B) return;

  B = B || 0;

  rate = rate || 2;

  const step = function() {
    A = A + (B - A) / rate;

    if (Math.abs(A - B) < 1) {
      callback(B, true);

      return;
    }

    callback(A, false);

    requestAnimationFrame(step);
  };

  step();
}

/**
 * 减速滚动
 * @param height 滚动高度
 */
export function scrollEaseOut(height: number) {
  const doc = document.body.scrollTop ? document.body : document.documentElement;

  mathEaseout(doc.scrollTop, height, 10, function(value: number) {
    doc.scrollTop = value;
  });
}
