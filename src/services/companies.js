import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Companies = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/base/companies";

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

const get_Company= async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI + `api/base/companies/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};
export default { get_Companies, get_Company };
