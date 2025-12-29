import axios from "axios";
import Cookie from "cookie-universal";
import { baseUrl } from "./api";

const cookie = Cookie();
const token = cookie.get("mo");

export const Axios = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${token}` },
});
