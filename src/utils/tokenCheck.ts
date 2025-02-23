import CryptoJS from "crypto-js";
import { constats } from "@/assets/data/constants";
import { generateSecretKey } from "./generateSecretKey";

const { tempToken, token } = constats;

const SECRET_KEY = generateSecretKey();

export const setToken = (id: string, token: string) => {
  try {    
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    console.log(SECRET_KEY, encryptedToken, token);
    localStorage.setItem(id, encryptedToken);
  } catch (error) {
    console.error("error token - ", error);
  }
};

export const getToken = (tokenKey = token): string | undefined => {
  try {
    const encryptedToken = localStorage.getItem(tokenKey);
    if (!encryptedToken) return undefined;

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return decryptedToken || undefined;
  } catch (error) {
    console.error("error token - ", error);
    return undefined;
  }
};

export const tokenCheck = (): string | undefined => {
  return getToken(token) || getToken(tempToken);
};

export const removeToken = () => {
  localStorage.removeItem(token)
  window.location.reload()
}