import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const baseDomain = publicRuntimeConfig.SERVER_URI; // API for products
export const basePostUrl = publicRuntimeConfig.SERVER_URI; // API for post
export const baseStoreURL = publicRuntimeConfig.SERVER_URI; // API for vendor(store)

export const customHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${publicRuntimeConfig.Auth}`,
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
  baseUrl,
  headers: customHeaders,
});

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
