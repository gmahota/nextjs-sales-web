import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_UserGroups = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/usergroups";

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

const get_UserGroupsWithChildren = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/usergroups/?seeUsers=true";

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

const get_UserGroup = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI + `api/attendance/usergroup/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};
export default { get_UserGroups, get_UserGroup,get_UserGroupsWithChildren };
