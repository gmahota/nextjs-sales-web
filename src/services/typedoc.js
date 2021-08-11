import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_TypeDocs = async (type) => {
  try {
    let url = publicRuntimeConfig.SERVER_URI + "api/sales/typedoc";

    if (!!type) {
      url += `?type=${type}`;
    }

    let res = [];

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_TypeDoc = async (id) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + `api/sales/typedoc/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_TypeDocs_Options = async (type) => {
  let items = await get_TypeDocs(type);

  items = items.map((item) => {
    return {
      value: item.code,
      label: item.description,
    };
  });

  return items;
};
export default { get_TypeDocs, get_TypeDoc, get_TypeDocs_Options };
