/* eslint-disable react/display-name */
import React from "react";
import Datatable from "../../elements/datatable/ActionsTable";
import moment from "moment";

const SimpleTabGroupUsers = ({ allUsersGroups }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Code",
        accessor: "id",
        Cell: (props) => <a href={`/groups/${props.value}`}>{props.value}</a>,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      ,
      {
        Header: "Created Att",
        accessor: "createdAt",
        Cell: (props) => (
          <span>{moment(props.value).format("DD-MM-YYYY HH:mm:ss")}</span>
        ),
      },
      {
        Header: "Update Att",
        accessor: "updatedAt",
        Cell: (props) => (
          <span>{moment(props.value).format("DD-MM-YYYY HH:mm:ss")}</span>
        ),
      },
      {
        Header: "Parent Id",
        accessor: "parent_id",
        Cell: (props) => (
          <a href={`/usersDepartments/${props.value}`}>{props.value}</a>
        ),
      },
    ],
    []
  );
  const data = React.useMemo(() => allUsersGroups, []);
  return <Datatable columns={columns} data={data} />;
};

export default SimpleTabGroupUsers
