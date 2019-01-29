export enum ErrorCodes {
  // General
  unknown = "unknown-error",

  // Auth
  wrongParams = "auth/wrong-params",
  wrongSecret = "auth/wrong-secret",
  cannotSetCustomClaims = "auth/cannot-set-custom-claims",
  failReCaptcha = "auth/fail-recaptcha",
  failCreateUser = "auth/fail-create-user",
  failInitUserProfile = "auth/fail-init-user-profile",
  failListUsers = "auth/fail-list-users",
  noUserFound = "auth/no-user-found",
  notAuthorized = "auth/not-authorized"
}
