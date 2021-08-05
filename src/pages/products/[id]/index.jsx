/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import productsService from "../../../services/products";

export default function Workschedules({ category }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle={`Category - ${category.description}`} />
      <Widget
        title="Details"
        description={
          <span>
            {category.description} <code>&lt;Shifts, assign... /&gt;</code>
          </span>
        }
      >
        {/* <Simple /> */}
      </Widget>
    </>
  );
}


export const getServerSideProps = async (ctx) => {
  try {
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

    const product = await productsService.get_Product(id);

    return {
      props: {
        product
      }
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        category: null,
      }
    };
  }
};
