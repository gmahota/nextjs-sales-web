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

import { FiSave, FiClipboard } from 'react-icons/fi';

//Services
import ordersService from "../../../services/sales";

export default function Order({ order, peddingItems, itemsToApproval }) {
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
      title: "Invoices",
      active: false,
      content: <div />,
    },
    {
      index: 2,
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
  const peddingItems = await ordersService.get_PeddingItems(id)
  const itemsToApproval = await ordersService.get_ItemsToApproval(id)
  return {
    props: {
      order,
      peddingItems,
      itemsToApproval
    }
  };

};
