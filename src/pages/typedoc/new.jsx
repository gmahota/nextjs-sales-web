/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from '../../components/elements/forms/validation';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();


export default function Schools() {

  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {

    const url = publicRuntimeConfig.SERVER_URI + `api/sales/typedoc`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    router.push("/typedoc")
  }

  let items = [
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter the Code'
    },
    {
      label: 'Description',
      error: { required: 'Please enter your name' },
      name: 'description',
      type: 'text',
      placeholder: 'Enter the name'
    },
    {
      label: 'Type',
      name: 'type',
      type: 'text',
      placeholder: 'Enter the Email'
    }]

  return (
    <>
      <SectionTitle title="Create a New" subtitle="Type Document" />

      <Widget
        title=""
        description=""
        right=""
      >
        <FormValidation items={items} onSubmit={onSubmit} />
      </Widget>


    </>)
}

export const getServerSideProps = async (ctx) => {
  const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //await apiClient.get('/users')



  return {
    props: {

    },
  };
};
