/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";
import moment from "moment"
import Datetime from "react-datetime";
import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import UsersGroupForm from "../../components/partials/attendance-userschedule/usersGroup";
import UsersGroupSelectedForm from "../../components/partials/attendance-userschedule/usersGroupSelected";

import { Selects } from "../../components/elements/forms/selects";

import Navigation from "../../components/partials/attendance-userschedule/navigation";
import workService from "../../services/workschedule";
import userGroupService from "../../services/userGroup";
import { parseCookies } from "nookies";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function UserSchedules({ allWorkschedules, allUserGroup }) {
  const router = useRouter();

  const [rule, setRule] = useState("");
  const [scheduleTemplate, setScheduleTemplate] = useState("");
  const [holiday, setHoliday] = useState("");
  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  let itemsRule = {
    label: "Rule",
    name: "rule",
    type: "select",
    placeholder: "Rule",
    options: [{ value: "", name: "None", label: "None" }],
    onValueChange: handleRuleChange,
  };

  let itemsGroup = [];

  allUserGroup.forEach((item) => {
    itemsGroup.push({
      key: item.id,
      value: item.id,
      title: item.name,
      total: item.totalUsers,
    });
  });

  function handleRuleChange(value) {
    setRule(value);
  }

  function handleOnClick(value) {
    setAllUsers(value);
  }

  // function handleSelectRows(data) {

  //   if (data.length > 0) {
  //     setSelectedUsers(data);
  //   }
  // }

  function handleAllUsersAddOnClick(data) {

    const listUsers = data.filter((item) => !users.includes(item));

    setUsers(listUsers.concat(users))

  }

  function handleAllUsersRemoveOnClick(value) {
    const listUsers = users.filter((item) => !value.includes(item));

    setUsers(listUsers)
  }

  function handleUsersRemoveOnClick(value) {
    const listUsers = users.filter((item) => !value.includes(item));

    setUsers(listUsers)
  }

  let itemsHoliday = {
    label: "Holiday",
    name: "holiday",
    type: "select",
    placeholder: "Holiday",
    options: [{ value: "", name: "None", label: "None" }],
    onValueChange: handleHolidayChange,
  };

  function handleHolidayChange(value) {
    setHoliday(value);
  }

  return (
    <>
      <SectionTitle title="Create" subtitle="User Schedule" />
      <Widget>
        <div className="container mx-auto">
          <div className="block">
            <div className="form flex flex-wrap w-full">
              <div className="w-full  mb-4">
                <div className="form-element">
                  <div className="form-label">Schedule Template</div>
                  <input
                    name="name"
                    type="text"
                    value={scheduleTemplate}
                    onChange={(event) =>
                      setScheduleTemplate(event.target.value)
                    }
                    className="form-input"
                    placeholder="Enter The Name..."
                  />
                </div>
              </div>
              <div className="w-full  mb-4">
                <div className="form-element-inline">
                  <Selects
                    item={itemsRule}
                    selected={rule}
                    onSelectChange={handleRuleChange}
                  />
                </div>
              </div>
              <div className="w-full  mb-4">
                <div className="form-element-inline">
                  <Selects
                    item={itemsHoliday}
                    selected={holiday}
                    onSelectChange={handleHolidayChange}
                  />
                </div>
              </div>

              <div className="w-full  mb-4">
                <div className="form-element-inline">
                  <div className="inline-grid grid-cols-3 gap-x-4">
                    <div className="form-label">Period</div>

                    <Datetime
                      defaultValue={new Date()}
                      dateFormat={"yyyy-MM-DD"}
                      timeFormat={false}
                      input={true}
                      inputProps={{
                        className: "form-input",
                        placeholder: "Select date",
                      }}
                      value={dateBegin}
                      onChange={(value) => {
                        const dateV = moment(value).toDate();
                        setDateBegin(dateV);
                      }}
                    />

                    <Datetime
                      defaultValue={new Date()}
                      dateFormat={"yyyy-MM-DD"}
                      timeFormat={false}
                      input={true}
                      inputProps={{
                        className: "form-input",
                        placeholder: "Select date",
                      }}
                      value={dateEnd}
                      onChange={(value) => {
                        const dateV = moment(value).toDate();
                        setDateEnd(dateV);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Widget title="User Group">
                <Navigation
                  items={allUserGroup}
                  handleOnClick={handleOnClick}
                />
              </Widget>
            </div>
            <div className="flex-1">
                <UsersGroupForm data={allUsers}
                  handleAdd={handleAllUsersAddOnClick}
                  handleRemove={handleAllUsersRemoveOnClick}/>
            </div>
            <div className="flex-1">

              <UsersGroupSelectedForm data={users}
                  handleRemove={handleUsersRemoveOnClick}/>
            </div>
          </div>
        </div>
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

  const { id } = ctx.params;

  const workschedule = await workService.get_Workschedule(id[0]);

  const allUserGroup = await userGroupService.get_UserGroupsWithChildren();
  console.log(allUserGroup);
  return {
    props: {
      workschedule,
      allUserGroup,
    },
  };
};
