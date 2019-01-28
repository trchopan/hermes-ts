export const LOGGER_FORMAT =
  "padding: 0 0.3rem;background: #333333; color: white;";
export const ERROR_FORMAT = "padding: 0 0.3rem;background: red; color: white;";

export const logger = (className: string, error?: boolean) => (
  message: string,
  ...objects: any[]
) => {
  if (process.env.NODE_ENV === "development") {
    // tslint:disable-next-line:no-console
    console.log(
      `%c${className}`,
      error ? ERROR_FORMAT : LOGGER_FORMAT,
      message,
      ...objects
    );
  }
};
