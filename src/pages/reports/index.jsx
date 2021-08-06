/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";


import { parseCookies } from 'nookies'

export default function ReportIndividual() {

  return (
    <>
      <SectionTitle title="Report's" subtitle="Attendance Repots" />

      <Widget title="Filter" description={<span>Filter Conditions</span>}>

      </Widget>
    </>
  );
}

export const getServerSideProps= async (ctx) => {
  const { 'attendance.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  //await apiClient.get('/users')



  return {
    props: {

    },
  };
}
