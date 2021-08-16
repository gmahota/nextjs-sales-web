import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Projects = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/base/projects";

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

const get_Project = async (id) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + `api/base/projects/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Projects_Options = async (type) => {
  let items = await get_Projects(type);

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

export default { get_Projects, get_Project, get_Projects_Options };
