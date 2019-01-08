import { logger, LOGGER_FORMAT } from "./logger.helper";

test("[helpers]logger", () => {
  const className = "Class Name";
  const log = logger(className);
  const message = "Log message";
  const obj1 = null;
  const obj2 = undefined;
  const obj3 = "string";
  const mockConsoleLog = jest.fn();
  // tslint:disable-next-line:no-console
  console.log = mockConsoleLog;
  process.env.NODE_ENV = "development";
  log(message, obj1, obj2, obj3);
  expect(mockConsoleLog).toBeCalled();
  expect(mockConsoleLog).toBeCalledWith(
    "%c" + className,
    LOGGER_FORMAT,
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
