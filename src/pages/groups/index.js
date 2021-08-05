/* eslint-disable react/display-name */
import React from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import moment from "moment";
import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";
import userGroupService from "../../services/userGroup";
import {FiPlus} from 'react-icons/fi'

export default function Groups({ allUserGroup }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  function handlerEdit(id){
    router.push(`groups/${id}/edit`)

  }



  const Simple = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Code",
          accessor: "id",
          Cell: (props) => <a href={`/groups/${props.value}`}>{props.value}</a> ,
        },
        {
          Header: "Name",
          accessor: "name",
        },
        ,
        {
          Header: "Created Att",
          accessor: "createdAt",
          Cell:(props) => <span>{moment(props.value).format('DD-MM-YYYY HH:mm:ss')}</span>
        },
        {
          Header: "Update Att",
          accessor: "updatedAt",
          Cell:(props) => <span>{moment(props.value).format('DD-MM-YYYY HH:mm:ss')}</span>
        },
        {
          Header: "Parent Id",
          accessor: "parent_id",
          Cell: (props) => (
            <a href={`/usersDepartments/${props.value}`}>{props.value}</a>
          ),
        }
      ],
      []
    );
    const data = allUserGroup;
    return <Datatable columns={columns} data={data} link="/groups" canEdit={true} canView={true} handlerEdit={handlerEdit} />;
  };

  return (
    <>
      <SectionTitle title="List Of" subtitle="User Groups" />
      <Widget
        title=""
        description=""
        right={
          <button className="btn btn-default btn-rounded btn-icon bg-blue-500 hover:bg-blue-600 text-white space-x-1">
            <FiPlus className="stroke-current text-white" size={16} />
            <span>Add New</span>
          </button>
        }
      >
        <Simple />
      </Widget>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //await apiClient.get('/users')

  const allUserGroup = await userGroupService.get_UserGroups();

  return {
    props: {
      allUserGroup,
    },
  };
};
