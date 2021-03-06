// tslint:disable:max-line-length
import { ILanguageMap } from "@/store/root.models";

export const AUTH_ROUTE = "/auth";
export const AUTH_SIGN_UP_EMAIL_ROUTE = "/sign-up-email";
export const AUTH_SIGN_IN_EMAIL_ROUTE = "/sign-in-email";
export const AUTH_SIGN_IN_PHONE_ROUTE = "/sign-in-phone";
export const AUTH_SIGN_OUT_ROUTE = "/sign-out";

export const AUTH_LANGUAGES: ILanguageMap = {
  auth: {
    vi: "Hệ thống xác thực tài khoản",
    en: "Authentication system"
  },
  introduciton: {
    vi:
      "Sau khi bạn đăng ký và đăng nhập, bạn có thể tham gia vào các phòng chat. Hân hạnh làm quen :)",
    en: "After sign up and login, you can join chats. Nice to meet you :)"
  },
  phoneNumber: {
    vi: "Số điện thoại",
    en: "Phone number"
  },
  phoneDescription: {
    vi:
      "Sau khi nhập số điện thoại bạn sẽ nhận một tin nhắn xác nhận từ Google. Vui lòng điền mã số xác nhận vào ô tiếp theo.",
    en:
      "After submit a phone number you will receive a message from Google. Please enter the verification code into the next field."
  },
  sendCode: {
    vi: "Gởi tin nhắn",
    en: "Send code"
  },
  sendingVerificationCode: {
    vi: "Đang gởi mã xác nhận",
    en: "Sending verification code"
  },
  unableSendVerificationCode: {
    vi: "Khổng thể gởi mã xác nhận",
    en: "Unable to send verification code"
  },
  resendCode: {
    vi: "Gởi lại mã",
    en: "Resend code"
  },
  invalidPhone: {
    vi: "Số điện thoại phải có 9 hoặc 10 chữ số",
    en: "Phone number must have 9 or 10 numbers"
  },
  confirmCode: {
    vi: "Mã xác nhận",
    en: "Confirmation code"
  },
  confirmCodeDescription: {
    vi:
      "Mã xác nhận đã được gởi đến số điện thoại bên dưới. Bạn vui lòng kiểm tra tin nhắn điện thoại và nhập mã vào ô bên dưới.",
    en:
      "Confirmation code has been sent to the phone number below. Please check your phone message and enter the code below."
  },
  confirmingVerfificationCode: {
    vi: "Đang xác nhận mã",
    en: "Confirming verification code"
  },
  enterConfirmationCode: {
    vi: "Vui lòng nhập mã xác nhận",
    en: "Please enter the confirmation code"
  },
  invalidVerificationCode: {
    vi: "Mã xác nhận không chính xác",
    en: "Invalid verification code"
  },
  unableVerifyCode: {
    vi: "Không thể xác nhận mã",
    en: "Unable to verify code"
  },
  signInEmail: {
    vi: "Đăng nhập bằng Email",
    en: "Sign in with Email"
  },
  signInPhone: {
    vi: "Đăng nhập bằng Điện thoại",
    en: "Sign in with Phone"
  },
  signUpEmail: {
    vi: "Đăng ký bằng Email",
    en: "Sign up with Email"
  },
  signOut: {
    vi: "Đăng xuất",
    en: "Sign out"
  },
  signingOut: {
    vi: "Đăng xuất...",
    en: "Signing out..."
  },
  signOutError: {
    vi: "Lỗi đăng xuất. Vui lòng tải lại trang.",
    en: "Error signing out. Please refesh the page."
  },
  joinChat: {
    vi: "Tham gia chat",
    en: "Join chat"
  },
  hasAccount: {
    vi: "Bạn đã có tài khoản?",
    en: "Already has an account?"
  },
  goBack: {
    vi: "Quay lại",
    en: "Go back"
  },
  signIn: {
    vi: "Đăng nhập",
    en: "Sign In"
  },
  signingIn: {
    vi: "Đăng nhập...",
    en: "Sign In..."
  },
  signInError: {
    vi: "Lỗi đăng nhập. Vui lòng tải lại trang.",
    en: "Error signing in. Please refesh the page."
  },
  signUp: {
    vi: "Đăng ký",
    en: "Sign Up"
  },
  signingUp: {
    vi: "Đăng ký...",
    en: "Sign Up..."
  },
  signUpForm: {
    vi: "Mẫu đăng ký",
    en: "Sign up form"
  },
  unableSignUp: {
    vi: "Không thể đăng ký. Vui lòng tải lại trang.",
    en: "Unable to sign up. Please refesh the page."
  },
  password: {
    vi: "Mật khẩu",
    en: "Password"
  },
  reconfirmPassword: {
    vi: "Xác nhận lại mật khẩu",
    en: "Reconfirm password"
  },
  invalidEmail: {
    vi: "Email không hợp lệ",
    en: "Invalid email"
  },
  invalidPassword: {
    vi: "Mật khẩu phải nhiều hơn 3 ký tự",
    en: "Password must be longer than 3 characters"
  },
  invalidRepassword: {
    vi: "Mật khẩu không khớp",
    en: "Password is not match"
  },
  passwordMustNotEmpty: {
    vi: "Mật khẩu không được trống",
    en: "Password must not be empty"
  },
  verifyRecaptcha: {
    vi: "Đang xác lập Recaptcha...",
    en: "Verifying Recaptcha..."
  },
  errorRegisterCaptcha: {
    vi: "Không thể xác lập Recaptcha",
    en: "Unable to verify Recaptcha"
  }
};

export const PHONE_COUNTRY_CODE = "+84";
