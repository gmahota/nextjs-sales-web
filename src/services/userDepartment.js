import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_UserDepartments = async (filter) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI + "api/attendance/userDepartments";

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

const get_UserDepartment = async (id) => {
  try {

    const url =
      publicRuntimeConfig.SERVER_URI + `api/attendance/userDepartment/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }

  return {};
};
export default { get_UserDepartments, get_UserDepartment };
