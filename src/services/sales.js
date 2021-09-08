import Repository, { baseUrl, serializeQuery } from "./repository";

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Documents = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/sales/documents";

    let res = [];

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    })
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
    console.log(url);
    const filter = { status: "pedding" };

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
