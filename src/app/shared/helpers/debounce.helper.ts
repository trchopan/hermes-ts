export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay = 50
): F {
  let timeoutId: number | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  } as any;
}
