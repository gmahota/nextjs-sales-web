import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Products = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/base/products";

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

const get_Product = async (id) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + `api/base/products/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Products_Options = async (type) => {
  let items = await get_Products(type);

  items = items.map((item) => {
    return {
      value: item.code,
      label: item.description,
      ...item,
    };
  });

  items = [...[{ value: "", label: "" }, ...items]];

  return items;
};
export default { get_Products, get_Product, get_Products_Options };
