/* eslint-disable react/display-name */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";

import { Selects } from "../../components/elements/forms/selects";

import Modal from "../../components/partials/modals/create-modal";
import userService from "../../services/user";
import groupService from "../../services/userGroup";
import workService from "../../services/workschedule";

import { FiUser } from "react-icons/fi";


export default function Workschedules({
  allGroups,
  allUsers,
  allWorkschedules,
}) {
  const router = useRouter();

  const [group, setGroup] = useState("");

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  let itemsGroup = {
    label: "User Group",
    name: "userGroup",
    type: "select",
    placeholder: "Group User",
    options: [{ key: "All", value: "", label: "All" }],
    onValueChange: handleGroupChange,
  };

  allGroups.forEach((item) => {
    itemsGroup.options.push({
      key: item.id,
      value: item.id,
      label: item.name,
    });
  });

  const Simple = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Code",
          accessor: "id",
          Cell: (props) => <a href={`/users/${props.value}`}>{props.value}</a>,
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "User Group",
          accessor: "userGroup",
          Cell: (props) => (
            <a href={`/groups/${props.value?.name}`}>{props.value?.name}</a>
          ),
        },
        {
          Header: "Schedule",
          accessor: "schedule",
          Cell: (props) => (
            <a href={`/workschedule/${props.value?.name}`}>
              {props.value?.name}
            </a>
          ),
        },
      ],
      []
    );
    const data = allUsers;
    return <Datatable columns={columns} data={data} link="/users" />;
  };

  function handleGroupChange(value) {
    setGroup(value);
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle="User's" />
      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Create New User"
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiUser size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <form>
                <div className="form flex flex-wrap w-full">
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Id</div>
                      <input
                        name="id"
                        type="number"
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                  </div>
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Name</div>
                      <input
                        name="id"
                        type="text"
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                  </div>

                  <div className="w-full  mb-4">
                    <Selects
                      item={itemsGroup}
                      selected={group}
                      onSelectChange={handleGroupChange}
                    />
                  </div>
                </div>
              </form>
            }
            buttonTitle="Save"
            buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"
          />
        }
      >
        <Simple />
      </Widget>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  const { ["attendance.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //await apiClient.get('/users')

  const allGroups = await groupService.get_UserGroups();
  const allUsers = await userService.get_Users();
  const allWorkschedules = await workService.get_Workschedules();

  return {
    props: {
      allGroups,
      allUsers,
      allWorkschedules,
    },
  };
};
