import { constats } from "@/assets/data/constants";

const { tempToken, token } = constats;

export const tokenCheck = (): string | undefined => {
  return localStorage.getItem(token) || localStorage.getItem(tempToken);
};
export const getToken = () => {
  return localStorage.getItem(token)
}
export const removeToken = () => {
  localStorage.removeItem(token)
  window.location.reload()
}