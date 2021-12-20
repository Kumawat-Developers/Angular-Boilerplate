export class GlobalVariables {
  public static tempDeleteId = '0';
  public static COOKIE_USERS = 'COOKIE_USERS';
  public static COOKIE_USERS_PASSWORD = 'COOKIE_USERS_PASSWORD';
  public static COOKIE_TOKEN = 'COOKIE_TOKEN';
  public static COOKIE_PERMISSION = 'COOKIE_PERMISSION';
  public static ADMIN_ROLE = 'ADMIN_USER';
  public static VENDOR_ROLE = 'VENDOR_USER';
  public static ADMIN_EMAIL = 'ADMIN_EMAIL';
  public static COOKIE_MENU = 'COOKIE_MENU';
  public static COOKIE_ADMIN_MENU = 'COOKIE_ADMIN_MENU';
  public static USERLOGOUT_URL = '/';
  public static HOMEPAGE_URL = '/home';
  public static AUTH_LS="FCMPusher"

  //Auth
  public static AUTH_URL = 'auth';

  public static REGISTER_URL = GlobalVariables.AUTH_URL+'/register';
  public static LOGIN_URL = GlobalVariables.AUTH_URL+'/login';
  public static LOGOUT_URL = GlobalVariables.AUTH_URL+'/logout';
  public static REFRESH_TOKEN_URL= GlobalVariables.AUTH_URL+'/refresh-tokens';
  public static FORGOT_PASSWORD_URL= GlobalVariables.AUTH_URL+'/forgot-password';
  public static RESET_PASSWORD_URL= GlobalVariables.AUTH_URL+'/reset-password';
  public static SEND_VERIFICATION_EMAIL_URL= GlobalVariables.AUTH_URL+'/send-verification-email';
  public static VERIFY_EMAIL_URL= GlobalVariables.AUTH_URL+'/verify-email';










}
