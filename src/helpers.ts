export const logger = (className: string) => (
  message: string,
  ...objects: any[]
) => {
  if (process.env.NODE_ENV === "development") {
    // tslint:disable-next-line:no-console
    console.log(
      `%c${className}`,
      "padding: 0 0.3rem;background: #333333; color: white;",
      message,
      ...objects
    );
  }
};

export function validateEmail(email: string): boolean {
  // tslint:disable-next-line:max-line-length
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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

export function shuffle(array: any[]): any[] {
  let currentIndex: number = array.length;
  let randomIndex: number;
  let temporaryValue: any;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
