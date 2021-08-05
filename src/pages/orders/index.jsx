/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";


import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";


import ordersService from "../../services/orders";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allOrders,
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
          Header: "Date",
          accessor: "date",
        },
        {
          Header: "Gross Total",
          accessor: "grossTotal"
        },
        {
          Header: "Total Disc.",
          accessor: "discountTotal"
        },
        {
          Header: "Vat Total",
          accessor: "vatTotal"
        },
        {
          Header: "Total",
          accessor: "total"
        },
        {
          Header: "Status",
          accessor: "status"
        },

      ],
        []
    );
    const data = allOrders;
    return <Datatable columns={columns} data={data} link="/orders"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id) {
    router.push(`orders/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("orders/new")
  }

  return (
    <>
      <SectionTitle title="Sales Tables" subtitle="Order's" />
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

  const allOrders = await ordersService.get_Orders();

  return {
    props: {
      allOrders
    },
  };
};
