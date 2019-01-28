import { logger, DEFAULT_LOGGER_FORMAT } from "./logger.helper";

describe("[helpers]logger", () => {
  const className = "Class Name";
  const manualColor = "#ff3333";
  const expectManualFormat =
    "padding: 0 0.3rem;background: #ff3333; color: white;";
  const message = "Log message";
  const obj1 = null;
  const obj2 = undefined;
  const obj3 = "string";
  const mockConsoleLog = jest.fn();
  // tslint:disable-next-line:no-console
  console.log = mockConsoleLog;

  it("log only in development", () => {
    const log = logger(className);
    process.env.NODE_ENV = "development";
    log(message, obj1, obj2, obj3);
    expect(mockConsoleLog).toBeCalled();
    expect(mockConsoleLog).toBeCalledWith(
      "%c" + className,
      DEFAULT_LOGGER_FORMAT,
      message,
      obj1,
      obj2,
      obj3
    );
    mockConsoleLog.mockReset();
    process.env.NODE_ENV = "production";
    log(message, obj1, obj2, obj3);
    expect(mockConsoleLog).not.toBeCalled();
  });

  it("log customed format", () => {
    const log = logger(className, manualColor);
    process.env.NODE_ENV = "development";
    log(message, obj1, obj2, obj3);
    expect(mockConsoleLog).toBeCalled();
    expect(mockConsoleLog).toBeCalledWith(
      "%c" + className,
      expectManualFormat,
      message,
      obj1,
      obj2,
      obj3
    );
  });
});
