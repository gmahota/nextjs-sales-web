import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Customers = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/base/customers";

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

const get_Customer = async (id) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + `api/base/customers/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Customers_Options = async (type) => {
  let items = await get_Customers(type);

  items = items.map((item) => {
    return {
      value: item.code,
      label: item.name,
      ...item,
    };
  });

  items = [...[{ value: "", label: "" }, ...items]];

  return items;
};

export default { get_Customers, get_Customer, get_Customers_Options };
