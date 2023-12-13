import { getItem } from "src/utility/localStorageControl";

export const auth_endpoint = process.env.REACT_APP_API_AUTH_ENDPOINT;

export const authHeader = () => ({
  Authorization: `Bearer ${getItem("access_token")}`,
  account: process.env.REACT_APP_ACCOUNT,
});

export const admin_endpoint = process.env.REACT_APP_API_ADMIN_ENDPOINT;

export const adminHeader = () => ({
  Authorization: `Bearer ${getItem("access_token")}`,
  account: process.env.REACT_APP_ACCOUNT,
});