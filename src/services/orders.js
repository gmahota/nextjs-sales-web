import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Orders = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/sales/orders";

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

const get_Order = async (id) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + `api/sales/orders/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_PeddingItems = (order) => {
  const items =
    order.items?.filter((item) => !item.status || item.status === "pedding") ||
    [];

  return items;
};
export default { get_Orders, get_Order, get_PeddingItems };
