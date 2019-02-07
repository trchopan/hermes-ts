export const DEFAULT_LOGGER_FORMAT =
  "padding: 0 0.3rem;background: #333333; color: white;";
export const MANUAL_LOGGER_FORMAT =
  "padding: 0 0.3rem;background: {color}; color: white;";

export const logger = (className: string, color?: string) => (
  ...objects: any[]
) => {
  if (process.env.NODE_ENV === "development") {
    // tslint:disable-next-line:no-console
    console.log(
      `%c${className}`,
      color
        ? MANUAL_LOGGER_FORMAT.replace("{color}", color)
        : DEFAULT_LOGGER_FORMAT,
      ...objects
    );
  }
};
