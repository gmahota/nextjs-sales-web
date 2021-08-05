import axios from "axios";
import { parseCookies } from "nookies";

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export function getAPIClient(ctx) {
  const { 'nextauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: publicRuntimeConfig
  })

  api.interceptors.request.use(config => {
    console.log(config);

    return config;
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}