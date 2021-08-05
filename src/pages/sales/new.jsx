/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Schools() {
  
  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {
    
    const url = publicRuntimeConfig.SERVER_URI + `api/sales/documents`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(data),
      }
    );

    router.push("/classes")
  }

  let items = [
    {
      label: 'Code',
      error: {required: 'Please enter your code'},
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code'
    },
    {
      label: 'Year',
      error: {required: 'Please enter your year'},
      name: 'year',
      type: 'number',
      placeholder: 'Enter the code'
    },
    {
      label: 'Description',
      error: {required: 'Please enter your description'},
      name: 'description',
      type: 'text',
      placeholder: 'Enter the description'
    },
    {
      label: 'Limit',
      name: 'limit',
      type: 'number',
      placeholder: 'Enter the Limit'
    },
    {
      label: 'Active',
      name: 'active',
      type: 'radio',
      options: [
        {value: '1', label: 'Yes'},
        {value: '0', label: 'No'}
      ]
    }
  ]

  return (
    <>
      <SectionTitle title="Create a New" subtitle="Class" />

      <Widget
        title=""
        description=""
        right=""
      >
      <FormValidation items={items} onSubmit={onSubmit}/>
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
