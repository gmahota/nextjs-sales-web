/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";

import { DocumentReportIcon } from "@heroicons/react/solid";
import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import FilterReport from "../../components/partials/attendance-reports/filter-report";
import groupService from "../../services/userGroup";
import userService from "../../services/user";

import { parseCookies } from 'nookies'

export default function ReportIndividual({
  allGroups,
  allUsers,
  allUserDepartments,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <SectionTitle title="Report's" subtitle="Attendance Repots" />

      <Widget title="Filter" description={<span>Filter Conditions</span>}>
        <div className="w-full flex">
          <div className="w-full lg:w-1/2">
            <FilterReport
              allGroups={allGroups}
              allUsers={allUsers}
              allUserDepartments={allUserDepartments}
            />
          </div>
        </div>
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

  const allGroups = await groupService.get_UserGroups();
  const allUsers = await userService.get_Users();

  return {
    props: {
      allGroups,
      allUsers
    },
  };
}
