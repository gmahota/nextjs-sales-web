import getConfig from "next/config";
import { v4 as uuid } from "uuid";
import axios from "axios";

const delay = (amount = 758) =>
  new Promise((resolve, reject) => setTimeout(resolve, amount));

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export async function signInRequest({username,password}) {


  const url = `${publicRuntimeConfig.SERVER_URI}api/auth/login`

  let res = {
    token:"AAAAA",
    user:{
      email: "turaymelo@gmail.com",
      avatar_url: "images/faces/profileIcon.png",
    }
  }

  return res

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username,password}),
  }).then((response) => response.json())
  .then((data) => (res = data));

  return res


}

export async function recoverUserInformation() {

  ///https://github.com/turaymelo.png
  return {
    user: {
      email: "turaymelo@gmail.com",
      avatar_url: "images/faces/profileIcon.png",
    },
  };
}
