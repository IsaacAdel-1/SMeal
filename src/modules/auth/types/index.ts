export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export type ResetPasswordParams = {
  userId: string;
  token: string;
  newPassword: string;
};

export type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string | null;
  phoneNumber: string;
};

export type JwtResponse = {
  token: string;
  refreshToken: string;
  expiresAt: string;
  refreshTokenExpirationAt: string;
};

export type LoginResponse = {
  jwt: JwtResponse;
  user: User;
};
