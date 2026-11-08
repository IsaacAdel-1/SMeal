import Cookies from "js-cookie";
import type { LoginResponse, User } from "../types";

const TOKEN = "token";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";
const REMEMBER_KEY = "rememberMe";

/** Fired on `window` when the session can no longer be refreshed. */
export const SESSION_EXPIRED_EVENT = "auth:session-expired";

function readRemember() {
  try {
    return localStorage.getItem(REMEMBER_KEY) !== "0";
  } catch {
    return true;
  }
}

function writeRemember(remember: boolean) {
  try {
    localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0");
  } catch {
    // Storage can be unavailable (private mode); the default is to remember.
  }
}

const toDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

/**
 * Stores the tokens and the user. When "remember me" is off the refresh token
 * and the user are kept in session cookies, so closing the browser signs out.
 */
export function saveSession({ jwt, user }: LoginResponse, remember?: boolean) {
  if (remember !== undefined) writeRemember(remember);
  const persist = readRemember();
  const refreshExpires = persist ? toDate(jwt.refreshTokenExpirationAt) : undefined;

  Cookies.set(TOKEN, jwt.token, { sameSite: "strict", expires: toDate(jwt.expiresAt) });
  Cookies.set(REFRESH_TOKEN, jwt.refreshToken, { sameSite: "strict", expires: refreshExpires });
  if (user) Cookies.set(USER, JSON.stringify(user), { sameSite: "strict", expires: refreshExpires });
}

export function clearSession() {
  Cookies.remove(TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  Cookies.remove(USER);
}

export const getToken = () => Cookies.get(TOKEN);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN);
export const hasSession = () => !!(getToken() || getRefreshToken());

export function getStoredUser(): User | null {
  const raw = Cookies.get(USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
