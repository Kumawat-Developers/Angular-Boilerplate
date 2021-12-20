export class AuthData {
  user: User;
  tokens: Tokens;
}
export interface User {
  role: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  id: string;
}
export interface Tokens {
  access: AccessOrRefresh;
  refresh: AccessOrRefresh;
}
export interface AccessOrRefresh {
  token: string;
  expires: string;
}
