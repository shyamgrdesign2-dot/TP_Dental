import {PERSISTANT_STORAGE_KEY_AUTH_TOKEN} from "../utils/constants";
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
