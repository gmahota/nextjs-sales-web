/* eslint-disable react/display-name */
import React from "react";
import { useRouter } from "next/router";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import { UnderlinedTabs } from "../../../components/elements/tabs";

import OrderResume from "../../../components/partials/sales-order/orderResume";
import OrderPedding from "../../../components/partials/sales-order/orderPedding";

//Services
import ordersService from "../../../services/sales";

export default function Order({ order }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  


  const tabs = [
    {
      index: 0,
      title: "Resumo",
      active: true,
      content: <OrderResume order={order} />,
    },
    {
      index: 1,
      title: "Aprovação",
      active: false,
      content: <OrderPedding order={order} />,
    },
    {
      index: 3,
      title: "Anexos",
      active: false,
      content: <div />,
    }
  ];



  return (
    <>
      <SectionTitle title={`Document - ${order.id}`} subtitle={order.document} />
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

  const { id } = ctx.params;

  const order = {
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
    "account": "611645",
    "account_description": "Demostração Custo",
    "business": "1143",
    "business_description": "Manutenção - FIPAG - Demostração",
    "required": "Guimarães Mahota",
    "buget": 1000,
    "expense": 4000,
    "items": [
      {
        "product": "CS0010",
        "description": "Madeira 1100x100x40 mm - Chanfuta",
        "unit": "UN",
        "quantity": 1,
        "price": 5000,
        "total": 5000,
        "account": "611645",
        "account_description": "Demostração Custo",
        "business": "1143",
        "business_description": "Manutenção - FIPAG - Demostração",
        "required": "Guimarães Mahota",
        "buget": 1000,
        "expense": 4000
      }
    ]
  };

  return {
    props: {
      order
    }
  };

};
