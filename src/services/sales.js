import Repository, { baseUrl, serializeQuery } from "./repository";

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Documents = async ({ type, customer, status }) => {
  try {
    let url = publicRuntimeConfig.SERVER_URI + "api/sales/documents";
    let query = "";

    if (!!type && type.length > 0) {
      query += `?type=${type}`;
    }

    if (!!customer && customer.length > 0) {
      query += (query.length === 0 ? "?" : "&") + `customer=${customer}`;
    }

    if (!!status && status.length > 0) {
      query += (query.length === 0 ? "?" : "&") + `status=${status}`;
    }

    if (query.length > 0) {
      url += query;
    }

    let res = [];

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Document = async (id) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + `api/sales/documents/${id}`;

    let res = {};

    console.log(url);

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_PeddingItems = async (id) => {
  try {
    // const url =
    //   publicRuntimeConfig.SERVER_URI + `api/sales/documents/${id}/itemsVariant`;

    const url = `${baseUrl}api/sales/documents/${id}/itemsVariant`;

    const filter = { status: "pedding" };

    let res = {};

    await Repository.get(url, {
      data: filter,
    }).then((response) => (res = response.data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_ItemsToApproval = async (id) => {
  try {
    // const url =
    //   publicRuntimeConfig.SERVER_URI + `api/sales/documents/${id}/itemsVariant`;

    const url = `${baseUrl}api/sales/documents/${id}/itemsVariant`;
    console.log(url);
    const filter = { status: "to approval" };

    let res = {};

    await Repository.get(url, {
      data: filter,
    }).then((response) => (res = response.data));

    console.log(res);

    return res;
  } catch (e) {
    console.error(e);
  }
};
export default {
  get_Documents,
  get_Document,
  get_PeddingItems,
  get_ItemsToApproval,
};
