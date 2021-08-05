/* eslint-disable react/display-name */
import React from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import userGroupService from "../../../services/userGroup";
import Datatable from "../../../components/elements/datatable";
import moment from "moment";

export default function Groups({ usergroup }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  function getDateTime(value) {
    var a = moment(value);
    console.log(a.format("HH:mm"));
    var d = new Date(value);
    var n = d.getMinutes();

    return a.format("HH:mm");
  }

  const Simple = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Code",
          accessor: "id",
          Cell: (props) => (
            <a href={`/workschedule/${props.value}`}>{props.value}</a>
          ),
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Type",
          accessor: "type",
        },
        {
          Header: "Time In",
          accessor: "timeIn",
          Cell: (props) => <span>{getDateTime(props.value)}</span>,
        },
        {
          Header: "Time Out",
          accessor: "timeOut",
          Cell: (props) => <span>{getDateTime(props.value)}</span>,
        },
        {
          Header: "Grace Period",
          accessor: "gracePeriod",
        },
        {
          Header: "Day Of Week",
          accessor: "dayOfWeek",
        },
      ],
      []
    );
    const data = React.useMemo(() => usergroup.Shifts, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle={`User Group - ${usergroup.id}`} />
      <Widget
        title="Details"
        description={
          <span>
            {usergroup.name} <code>&lt;Shifts, assign... /&gt;</code>
          </span>
        }
      >
        {/* <Simple /> */}
      </Widget>
    </>
  );
}



export const getServerSideProps = async (context) => {
  try {
    const { "attendance.token": token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //await apiClient.get('/users')

    const { id } = context.params;

    const usergroup = await userGroupService.get_UserGroup(id[0]);

    return {
      props: {
        usergroup: usergroup,
      },
      revalidate: 10,
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        usergroup: null,
      },
      revalidate: 10,
    };
  }
};
