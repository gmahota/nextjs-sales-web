import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import Datetime from "react-datetime";
import moment from "moment";
import getConfig from "next/config";

import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

import { Selects } from "../../../components/elements/forms/selects";

import workService from "../../../services/workschedule";
import shiftService from "../../../services/shift";
import DateFunction from "../../../functions/datetime";

import { FiClock,FiSave } from "react-icons/fi";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Clone({ workschedule, shift }) {
  const router = useRouter();

  const [name, setName] = useState(shift.name);
  const [description, setDescription] = useState(shift.description);
  const [type, setType] = useState(shift.type);

  const [minTimeIn, setMinTimeIn] = useState(
    moment(shift.minTimeIn).format("HH:mm")
  );
  const [timeIn, setTimeIn] = useState(moment(shift.timeIn).format("HH:mm"));
  const [timeOut, setTimeOut] = useState(moment(shift.timeOut).format("HH:mm"));

  const [maxTimeOut, setMaxTimeOut] = useState(
    moment(shift.maxTimeOut).format("HH:mm")
  );
  const [gracePeriod, setGracePeriod] = useState(
    moment(shift.gracePeriod).format("HH:mm")
  );

  const [dayOfWeek, setDayOfWeek] = useState(shift.dayOfWeek);

  const [scheduleId, setScheduleId] = useState(workschedule.id);

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

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

    const m = DateFunction.getDateMonth(value);

    let item = itemsDayOfWeek.options.find(
      (pp) => pp.value.toString() === value.toString()
    );

    setName("Shift " + m);
    setDescription("Shift " + m);
  }

  function handleOnCancel() {
    router.push(`/workschedule/${workschedule.id}`)
  }

  async function handleOnSave(){

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
      scheduleId:workschedule.id,
    };

    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/shift";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    console.log(response)

    router.push(`/workschedule/${workschedule.id}`)
  }
  return (
    <>
      <SectionTitle title="Clone" subtitle="Shift" />
      <Widget
        title=""
        description=""
        right={
          <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
            <button
              className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
              type="button"
              onClick={handleOnCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"
              type="button"
              onClick={handleOnSave}>
              Clone
            </button>
          </div>
        }
      >
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
      </Widget>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const {workschedule } = context.query;

  const scheduler = await workService.get_Workschedule(workschedule);

  const shiftOld = await shiftService.get_Shift(id[0]);

  return {
    props: {
      workschedule: scheduler,
      shift: shiftOld,
    },
  };
};
