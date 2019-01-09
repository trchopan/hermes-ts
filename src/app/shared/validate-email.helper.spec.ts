import { validateEmail } from "./validate-email.helper";

test("[helpers]validateEmail", () => {
  const validEmail = "test@example.com";
  const invalidEmail1 = "abc";
  const invalidEmail2 = "@def";
  const invalidEmail3 = ".com";
  const invalidEmail4 = "a@b.c";
  const invalidEmail5 = "";
  expect(validateEmail(validEmail)).toBe(true);
  expect(validateEmail(invalidEmail1)).toBe(false);
  expect(validateEmail(invalidEmail2)).toBe(false);
  expect(validateEmail(invalidEmail3)).toBe(false);
  expect(validateEmail(invalidEmail4)).toBe(false);
  expect(validateEmail(invalidEmail5)).toBe(false);
});
