/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

import Datatable from "../../../components/elements/datatable";
import userService from "../../../services/user";
import DateFunction from "../../../functions/datetime"

export default function Workschedules({ user }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }


  return (
    <>
      <SectionTitle title="Tables" subtitle={`User - ${user.name}`} />
      <Widget
        title="Details"
        description={
          <span>
            {user.name} <code>&lt;Shifts, assign... /&gt;</code>
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

    const user = await userService.get_User(id[0]);

    return {
      props: {
        user: user,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        user: null,
      },
      revalidate: 10,
    };
  }
};
