/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import { Selects } from "../../components/elements/forms/selects";

import Modal from "../../components/partials/modals/create-modal";
import productsService from "../../services/products";

import { FiPlus } from 'react-icons/fi';

export default function Schools({
  allProducts,
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
          accessor: "code"
        },
        {
          Header: "Description",
          accessor: "description"
        },
        {
          Header: "Price",
          accessor: "price",
        }
      ],
      []
    );
    const data = allProducts;
    return <Datatable columns={columns} data={data} link="/products"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id){
    router.push(`products/${id}/edit`)
  }

  function handlerAddNew(){
    router.push("products/new")
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle="Product's" />
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

  const allProducts = await productsService.get_Products();

  return {
    props: {
      allProducts
    },
  };
};
