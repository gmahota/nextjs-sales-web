/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import schoolService from "../../../services/schools";

export default function Workschedules({ school }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle={`User - ${school.name}`} />
      <Widget
        title="Details"
        description={
          <span>
            {school.name} <code>&lt;Shifts, assign... /&gt;</code>
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

    const school = await schoolService.get_School(id[0]);

    return {
      props: {
        school:school,
      }
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        school: null,
      }
    };
  }
};
