/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import salesService from "../../services/sales";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allDocuments,
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
    const data = allDocuments;
    return <Datatable columns={columns} data={data} link="/sales"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id) {
    router.push(`sales/${id}/edit`)
  }

  function handlerAddNew() {
    router.push("sales/new")
  }
  return (
    <>
      <SectionTitle title="Sales Tables" subtitle="Document's" />
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

  const allDocuments = await salesService.get_Documents({ type: "Invoice" });

  return {
    props: {
      allDocuments
    },
  };
};
