/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";


import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import ordersService from "../../services/sales";

import { FiPlus } from 'react-icons/fi';

import * as Math from "../../functions/numbers";
import Dates from "../../functions/datetime";

export default function Orders({
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
          Header: "Date",
          accessor: "date",
          Cell: (props) => <span>{Dates.formatDate(props.value, "yyyy-MM-DD")}</span>
        },
        {
          Header: "Customer",
          accessor: "customer",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Orçamentado",
          accessor: "orc",
          Cell: (props) => <span>{Math.formatNumber(props.value)}</span>
        },
        {
          Header: "Pendente",
          accessor: "pend",
          Cell: (props) => <span>{Math.formatNumber(props.value)}</span>
        },
        {
          Header: "Total",
          accessor: "total",
          Cell: (props) => <span>{Math.formatNumber(props.value)}</span>
        },
        {
          Header: "Status",
          accessor: "status"
        },

      ],
      []
    );
    const data = allOrders;

    return <Datatable columns={columns} data={data} link="/buget"
      canView={true} canEdit={true}
      handlerEdit={handlerEdit} />;
  };

  function handlerEdit(id) {
    router.push(`buget/${id}/edit`)
  }

  function handlerAddNew() {
    router.push("buget/new")
  }

  return (
    <>
      <SectionTitle title="Documentos Pendentes" subtitle="Para Aprovação" />
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

  //await apiClient.get('/users')

  const allOrders = [
    {
      "id": 1001,
      "document": "COT 2022/1",
      "date": "2020-05-20",
      "customer": "FastTech",
      "name": "FastTech",
      "product": "CS0010",
      "description": "Madeira 1100x100x40 mm - Chanfuta",
      "unit": "UN",
      "quantity": 1,
      "price": 5000,
      "total": 5000,
      "orc":1000,
      "pend":4000,
      "account": "611645",
      "account_description": "Demostração Custo",
      "business": "1143",
      "business_description": "Manutenção - FIPAG - Demostração",
      "required": "Guimarães Mahota",
      "buget": 1000,
      "expense": 4000,
      "status":"Pendente"
    },
    {
      "id": 1002,
      "document": "REQ 2022/101",
      "date": "2020-05-20",
      "customer": "FastTech",
      "name": "FastTech",
      "product": "CS0010",
      "description": "Software de Cabmentação",
      "unit": "UN",
      "quantity": 1,
      "orc":40000,
      "pend":10000,
      "price": 50000,
      "total": 50000,
      "account": "611645",
      "account_description": "Demostração Custo",
      "business": "1143",
      "business_description": "Manutenção - FIPAG - Demostração",
      "required": "Guimarães Mahota",
      "buget": 1000,
      "expense": 4000,
      "status":"Pendente"
    }
  ];

  return {
    props: {
      allOrders
    },
  };
};
