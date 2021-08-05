/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import moment from "moment";
import Datetime from "react-datetime";
import { FiPlus, FiWatch } from "react-icons/fi";

import WorkscheduleForm from "../../../components/partials/attendance-workschedule";
import SimpleShifts from "../../../components/partials/attendance-shifts";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

import Datatable from "../../../components/elements/datatable/ActionsTable";
import { UnderlinedTabs } from "../../../components/elements/tabs";
import { Selects } from "../../../components/elements/forms/selects";

import Modal from "../../../components/partials/modals/create-modal";
import Calendar from "../../../components/partials/attendance-workschedule/calendar";

import DateFunction from "../../../functions/datetime";

import workService from "../../../services/workschedule";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();


export default function Workschedules({
  allShifts,
  workschedule,
  allUsers,
  allGroups,
  calendarEvents,
}) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [name, setName] = useState("Shift Monday");
  const [description, setDescription] = useState("Shift Monday");
  const [type, setType] = useState("");

  const [minTimeIn, setMinTimeIn] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const [maxTimeOut, setMaxTimeOut] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(2);

  let itemsDayOfWeek = {
    label: "Day Off Week",
    name: "type",
    type: "select",
    placeholder: "Day Off Week",
    options: [
      { value: "2", name: "Monday", label: "Monday" },
      { value: "3", name: "Tuesday", label: "Tuesday" },
      { value: "4", name: "Wednesday", label: "Wednesday" },
      { value: "5", name: "Thursday", label: "Thursday" },
      { value: "6", name: "Friday", label: "Friday" },
      { value: "7", name: "Saturday", label: "Saturday" },
      { value: "1", name: "Sunday", label: "Sunday" },
    ],
    onValueChange: handleDayOfWeekChange,
  };

  function handleDayOfWeekChange(value) {
    setDayOfWeek(value);

    console.log(value);

    const m = DateFunction.getDateMonth(value);

    let item = itemsDayOfWeek.options.find(
      (pp) => pp.value.toString() === value.toString()
    );

    setName("Shift " + m);
    setDescription("Shift " + m);
  }

  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  function handleCreate() {
    router.push(`/workschedule/${workschedule.id}/userschedule/create`);
  }

  async function handleSave() {
    var item = {
      name,
      description,
      type,
      timeIn,
      timeOut,
      minTimeIn,
      maxTimeOut,
      gracePeriod,
      dayOfWeek,
      scheduleId: workschedule.id,
    };

    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/shift";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    handleClear();

    router.reload();
  }

  function handleClear() {
    setType("Normal");
    setName("");
  }

  const TabGeneral = () => <WorkscheduleForm workschedule={workschedule} />;

  const TabShifts = () => (
    <SimpleShifts workscheduleId={workschedule.id} Shifts={allShifts} />
  );

  //const TabUsers = ({ allUsers }) => <SimpleUsers allUsers={allUsers} />;

  // const TabGroupUsers = ({ allGroups }) => (
  //   <SimpleTabGroupUsers allGroups={allGroups} />
  // );

  const tabs = [
    {
      index: 0,
      title: "General",
      active: true,
      content: <TabGeneral schedule={workschedule} />,
    },
    {
      index: 1,
      title: "Shifts",
      active: false,
      content: <TabShifts schedule={workschedule} />,
    }
  ];

  return (
    <>
      <SectionTitle
        title="Tables"
        subtitle={`Workschedule - ${workschedule.id}.${workschedule.name}.${workschedule.type}`}
      />
      <Widget
        title=""
        description=""
        right={
          <Modal
            openD={open}
            title="Create New Time Shifts"
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiWatch size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <form>
                <div className="form flex w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-element">
                      <Selects
                        item={itemsDayOfWeek}
                        selected={dayOfWeek}
                        onSelectChange={handleDayOfWeekChange}
                      />
                    </div>
                    <div className="form-element">
                      <div className="form-label">Name</div>
                      <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="form-input"
                        placeholder="Enter The Name..."
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">Description</div>
                      <input
                        name="description"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="form-input"
                        placeholder="Enter Description..."
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">Type</div>
                      <input
                        name="type"
                        type="text"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">minTimeIn</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={minTimeIn}
                        onChange={(value) => {
                          const dateV = moment(value).toDate();
                          setMinTimeIn(dateV);
                        }}
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">timeIn</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={timeIn}
                        onChange={(value) => {
                          const dateV = moment(value).toDate();
                          setTimeIn(dateV);
                        }}
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">timeOut</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={timeOut}
                        onChange={(value) => {
                          const dateV = moment(value).toDate();
                          setTimeOut(dateV);
                        }}
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">maxTimeOut</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={maxTimeOut}
                        onChange={(value) => {
                          const dateV = moment(value).toDate();
                          setMaxTimeOut(dateV);
                        }}
                      />
                    </div>

                    <div className="form-element">
                      <div className="form-label">gracePeriod</div>

                      <Datetime
                        defaultValue={new Date()}
                        dateFormat={false}
                        timeFormat={"HH:mm"}
                        input={true}
                        inputProps={{
                          className: "form-input",
                          placeholder: "Select date",
                        }}
                        value={gracePeriod}
                        onChange={(value) => {
                          const dateV = moment(value).toDate();
                          setGracePeriod(dateV);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            }
            buttonTitle="Save"
            buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"
            handleSave={handleSave}
            handleClear={handleClear}
          />
        }
      >
        <div className="flex flex-wrap">
          <div className="w-full">
          <UnderlinedTabs tabs={tabs} />

            {calendarEvents.length > 0 ? (
              <Calendar initialEvents={calendarEvents} />
            ) : (
              <></>
            )}


          </div>
        </div>
      </Widget>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const workschedule = await workService.get_Workschedule(id[0]);

  const shifts = await workService.get_Workschedule_Shifts(id[0]);

  const calendarEvents = await workService.get_DateCalendatFromShift(shifts);

  return {
    props: {
      workschedule: workschedule,
      //allUsers: users || [],
      //allGroups: groups || [],
      allShifts: shifts || [],
      calendarEvents: calendarEvents || [],
    },
  };
};
