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

    router.push("/sales")
  }

  let items = [
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code'
    },
    {
      label: 'Date',
      name: 'date',
      type: 'date',
      placeholder: 'Enter the code'
    },

    {
      label: 'Type',
      error: {required: 'Please enter your type - Now only FA'},
      name: 'description',
      type: 'text',
      placeholder: 'Enter the type - Now only FA'
    },
    {
      label: 'Serie',
      error: {required: 'Please enter your type - Now only 2021'},
      name: 'serie',
      type: 'text',
      placeholder: 'Enter the - Now only 2021'
    },
    {
      label: 'Name',
      error: {required: 'Please enter the name'},
      name: 'name',
      type: 'text',
      placeholder: 'Enter the name'
    },
    {
      label: 'Serie',
      error: {required: 'Please enter your type - Now only 2021'},
      name: 'serie',
      type: 'text',
      placeholder: 'Enter the - Now only 2021'
    },
    {
      label: 'Vat Total',
      name: 'vatTotal',
      type: 'number',
      placeholder: 'Enter the vat Total'
    },
    {
      label: 'Discount Total',
      name: 'discountTotal',
      type: 'number',
      placeholder: 'Enter the discount'
    },
    {
      label: 'Gross Total',
      name: 'grossTotal',
      type: 'number',
      placeholder: 'Enter the Gross Total'
    },
    {
      label: 'Total',
      name: 'total',
      type: 'number',
      placeholder: 'Enter the Total'
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: [
        {value: 'open', label: 'Open'},
        {value: 'toAproval', label: 'To Approval'}
      ]
    }
  ]

  return (
    <>
      <SectionTitle title="Create a New" subtitle="Sales Document" />

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
