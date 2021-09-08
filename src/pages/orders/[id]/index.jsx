/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import { UnderlinedTabs } from "../../../components/elements/tabs";

import OrderResume from "../../../components/partials/sales-order/orderResume";
import OrderPedding from "../../../components/partials/sales-order/orderPedding";

import { FiSave, FiClipboard } from 'react-icons/fi';

//Services
import ordersService from "../../../services/sales";

export default function Order({ order, peddingItems }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const tabs = [
    {
      index: 0,
      title: "Qoute Resume",
      active: true,
      content: <OrderResume order={order} />,
    },
    {
      index: 1,
      title: "Pending Qoute",
      active: false,
      content: <OrderPedding order={order} peddingItems={peddingItems} />,
    },
    {
      index: 2,
      title: "Approval",
      active: false,
      content: <div />,
    },
    {
      index: 3,
      title: "GR",
      active: false,
      content: <div />,
    },
    {
      index: 4,
      title: "Invoices",
      active: false,
      content: <div />,
    },
    {
      index: 5,
      title: "Other's",
      active: false,
      content: <div />,
    },
  ];



  return (
    <>
      <SectionTitle title={`Document - ${order.id}`} subtitle={`${order.type.description} - ${order.serie.code}/${order.code}`} />
      <Widget
        title="Details"
        description=""

      >
        <UnderlinedTabs tabs={tabs} />
      </Widget>
    </>
  );
}


export const getServerSideProps = async (ctx) => {

  const { 'attendance.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { id } = ctx.params;

  const order = await ordersService.get_Document(id);
  const peddingItems = ordersService.get_PeddingItems(order)

  return {
    props: {
      order,
      peddingItems
    }
  };

};
