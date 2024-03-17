export interface RegistrationUser {
  name: string;
  login: string;
  email: string;
  password: string;
}

export interface AuthenticationUser {
  email: string;
  password: string;
}
