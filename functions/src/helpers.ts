export const logger = (className: string) => (
  message: string,
  ...objects: any[]
) => console.log(className, message, ...objects);
