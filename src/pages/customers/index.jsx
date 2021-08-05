/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import { Selects } from "../../components/elements/forms/selects";

import Modal from "../../components/partials/modals/create-modal";
import customersService from "../../services/customers";

import { FiPlus } from 'react-icons/fi';

export default function Customers({
  allCustomers,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const Simple = () => {
    const columns = React.useMemo(    
      () => [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Code",
          accessor: "code"
        },
        {
          Header: "Name",
          accessor: "name"
        },
        {
          Header: "Address",
          accessor: "address",
        },
        {
          Header: "PhoneNumber",
          accessor: "phoneNumber",
        },
        {
          Header: "Cellphone",
          accessor: "cellphone",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        
      ],
      []
    );
    const data = allCustomers;
    return <Datatable columns={columns} data={data} link="/customers"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id){
    router.push(`customers/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("customers/new")
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle="Customer's" />
      <Widget
        title=""
        description=""
        right={
          <button
            className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
            type="button"
            onClick={handlerAddNew}>

            <FiPlus className="stroke-current text-white" size={18} />
            <span>Add New</span>
          </button>
        }
      >
        <Simple />
      </Widget>
    </>
  );
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

  const allCustomers = await customersService.get_Customers();

  return {
    props: {
      allCustomers
    },
  };
};
