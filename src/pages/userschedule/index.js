/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";
import { parseCookies } from "nookies";
import Datetime from "react-datetime";
import { FiSave, FiSkipBack } from "react-icons/fi";

import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import { Selects } from "../../components/elements/forms/selects";

import UsersGroupForm from "../../components/partials/attendance-userschedule/usersGroup";
import UsersGroupSelectedForm from "../../components/partials/attendance-userschedule/usersGroupSelected";

import Navigation from "../../components/partials/attendance-userschedule/navigation";

import Calendar from "../../components/partials/attendance-workschedule/calendar";

//Serviços
import workService from "../../services/workschedule";
import userGroupService from "../../services/userGroup";
import shiftService from "../../services/shift";
import DateFunction from "../../functions/datetime";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Index({
  workschedule,
  shift,
  allUserGroup,
  userShifts,
  calendarEvents,
}) {
  const router = useRouter();

  const [rule, setRule] = useState("");
  const [scheduleTemplate, setScheduleTemplate] = useState("");
  const [holiday, setHoliday] = useState("");
  const [dateBegin, setDateBegin] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [users, setUsers] = useState(userShifts);
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

  function handleAllUsersAddOnClick(data) {
    const listUsers = data.filter((item) => !users.includes(item));

    setUsers(listUsers.concat(users));
  }

  function handleAllUsersRemoveOnClick(value) {
    const listUsers = users.filter((item) => !value.includes(item));

    setUsers(listUsers);
  }

  function handleUsersRemoveOnClick(value) {
    const listUsers = users.filter((item) => !value.includes(item));

    setUsers(listUsers);
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

  function handleOnCancel() {
    router.push(`/workschedule/${workschedule.id}`);
  }

  async function handleOnSave() {
    const url =
      publicRuntimeConfig.SERVER_URI +
      `api/attendance/shift/${shift.id}/userShifts`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: users }),
    });

    console.log(response);
    console.log(users);
    router.push(`/workschedule/${workschedule.id}`);
  }

  return (
    <>
      <SectionTitle title="Create" subtitle="User Schedule" />
      <Widget
        title={`User's From Shift - ${workschedule.name} , ${shift.name}`}
        description=""
        right={
          <div className="flex items-center justify-end p-4 space-x-2">
            <button
              className="btn btn-default btn-rounded bg-red-500 hover:bg-red-100 text-white"
              type="button"
              onClick={handleOnCancel}
            >
              <FiSkipBack className="stroke-current mr-2" />
              <span>Cancel</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handleOnSave}
            >
              <FiSave className="stroke-current mr-2" />
              <span>Save</span>
            </button>
          </div>
        }
      >
        <div className="flex flex-wrap">
          <div className="w-full">
            <Calendar initialEvents={calendarEvents} />
          </div>
        </div>

        <div className="container mx-auto">
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
              <UsersGroupForm
                data={allUsers}
                handleAdd={handleAllUsersAddOnClick}
                handleRemove={handleAllUsersRemoveOnClick}
              />
            </div>
            <div className="flex-1">
              <UsersGroupSelectedForm
                data={users}
                handleRemove={handleUsersRemoveOnClick}
              />
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { workschedule, shift } = context.query;

  const scheduler = await workService.get_Workschedule(workschedule);

  const shiftObj = await shiftService.get_Shift(shift);

  const allUserGroup = await userGroupService.get_UserGroupsWithChildren();
  
  const userShifts = shiftObj.userShifts.map((item) => {
    return {
      id: item.user.id,
      name: item.user.name,
    };
  });

  const shifts = []

  shifts.push(shiftObj)

  const calendarEvents = await workService.get_DateCalendatFromShift(shifts);

  return {
    props: {
      workschedule: scheduler,
      shift: shiftObj,
      allUserGroup,
      userShifts,
      calendarEvents,
    },
  };
};
