import { PERSISTANT_STORAGE_KEY_AUTH_TOKEN, PERSISTANT_STORAGE_KEY_MEDECO_TOKEN } from "../utils/constants";
import { jwtDecode } from "jwt-decode";

export function useLocalStorage(key) {
  const getValue = () => localStorage.getItem(key) == null ? null: JSON.parse(localStorage.getItem(key));
  const setValue = (value) => localStorage.setItem(key, JSON.stringify(value));

  return [getValue, setValue];
}

export function clearLocalStorage() {
  localStorage.clear();
}

export const getDecodedToken = () => {
  try {
    let raw = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
    if (!raw) return null;
    let token = null;
    try {
      token = JSON.parse(raw);
    } catch {
      token = raw;
    }
    if (typeof token !== "string") return null;
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

/**
 * Returns decoded Medeco token payload (persistant.storage.key.medeco-token).
 * Use when auth token has no result.user_id — e.g. use user.tpUserId or user.id as doctorId.
 */
export const getDecodedMedecoToken = () => {
  try {
    let raw = localStorage.getItem(PERSISTANT_STORAGE_KEY_MEDECO_TOKEN);
    if (!raw) return null;
    let token = null;
    try {
      token = JSON.parse(raw);
    } catch {
      token = raw;
    }
    if (typeof token === "string") return jwtDecode(token);
    if (token && typeof token === "object" && (token.user != null || token.result != null) && token.exp != null) return token;
    return null;
  } catch (e) {
    return null;
  }
};
