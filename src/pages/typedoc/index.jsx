/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import typedocService from "../../services/typedoc";

import { FiPlus } from 'react-icons/fi';

export default function TypeDoc({
  allTypes,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const Simple = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Code",
          accessor: "code"
        },
        {
          Header: "Description",
          accessor: "description"
        },
        {
          Header: "Type",
          accessor: "type",
        }
      ],
      []
    );
    const data = allTypes;
    return <Datatable columns={columns} data={data} link="/typedoc"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id) {
    router.push(`typedoc/${id}/edit`)
  }

  function handlerAddNew() {
    router.push("typedoc/new")
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

  const allTypes = await typedocService.get_TypeDocs();

  return {
    props: {
      allTypes
    },
  };
};
