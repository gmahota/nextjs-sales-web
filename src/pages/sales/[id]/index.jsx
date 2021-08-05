/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import classService from "../../../services/classes";

export default function Workschedules({ e_class }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle={`Category - ${e_class.description}`} />
      <Widget
        title="Details"
        description={
          <span>
            {e_class.description} <code>&lt;Shifts, assign... /&gt;</code>
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

    const e_class = await classService.get_Class(id);

    return {
      props: {
        e_class:e_class,
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
