/* eslint-disable react/display-name */
import React, { useState } from "react";

import Datatable from "../../elements/datatable";

import {FiEye} from "react-icons/fi"

import moment from "moment";

export default function AttendancePunchLog ({ allPunchLog }) {

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell:(props) => <span>{moment(props.value).format('DD-MM-YYYY')}</span>
      },
      {
        Header: "Name",
        accessor: "userName",
      },
      {
        Header: "Group",
        accessor: "userGroup",
      },
      {
        Header: "Entrada Shift",
        accessor: "entradashift",
        Cell:(props) => <span>{moment(props.value).format('HH:mm:ss')}</span>
      },
      {
        Header: "Entrada",
        accessor: "entrada",
        Cell:(props) => <span>{moment(props.value).format('HH:mm:ss')}</span>
      },
      {
        Header: "Saida Shift",
        accessor: "saidashift",
        Cell:(props) => <span>{moment(props.value).format('HH:mm:ss')}</span>
      },
      {
        Header: "Saida",
        accessor: "saida",
        Cell:(props) => <span>{moment(props.value).format('HH:mm:ss')}</span>
      },
      {
        Header: "Total Delay",
        accessor: "totalDelay"
      },
      {
        Header: "",
        accessor: "id",
        Cell: (props) => <FiEye className="stroke-current mr-2" />,
      },
    ],
    []
  );
  const data = React.useMemo(() => allPunchLog, []);
  return <Datatable columns={columns} data={data} />;


}

