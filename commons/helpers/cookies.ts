import Cookies from "js-cookie";

export const get = (name: string) => {
  return Cookies.get(name);
};

export function set(name: string, value: string) {
  return Cookies.set(name, value);
}

export const remove = (name: string) => {
  return Cookies.remove(name);
};
