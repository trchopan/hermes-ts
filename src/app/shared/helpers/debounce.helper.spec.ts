import { debounce } from "./debounce.helper";

test("[helpers]debounce", (done) => {
  let debounceVariable = false;
  const debounceTime = 500;
  const debouncedFunction = jest.fn(() => {
    debounceVariable = true;
  });
  const debounceTest = debounce(debouncedFunction, debounceTime);
  debounceTest();
  expect(debouncedFunction).not.toBeCalled();
  setTimeout(() => {
    expect(debouncedFunction).toBeCalled();
    expect(debounceVariable).toBe(true);
    done();
  }, debounceTime);
});
