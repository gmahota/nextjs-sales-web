import React, { useState } from "react";
import  { useRouter } from "next/router";
import getConfig from "next/config";
import { parseCookies } from "nookies";

import SectionTitle from "../../../components/elements/section-title";

import Widget from "../../../components/elements/widget";

import { Selects } from "../../../components/elements/forms/selects";


import Datetime from "react-datetime";
import formatDate from "../../../functions/datetime";
import moment from "moment";
import { FiSave } from "react-icons/fi";

import shiftService from "../../../services/shift";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

export default function Workschedules({ shift }) {
  const router = useRouter(); //vai buscar o router


  const [id, setId] = useState(shift.id);
  const [name, setName] = useState(shift.name);
  const [description, setDescription] = useState(shift.description);
  const [type, setType] = useState(shift.type);

  const [minTimeIn, setMinTimeIn] = useState(formatDate(shift.minTimeIn,"HH:mm") );
  const [timeIn, setTimeIn] = useState(formatDate(shift.timeIn,"HH:mm"));
  const [timeOut, setTimeOut] = useState(formatDate(shift.timeOut,"HH:mm"));

  const [maxTimeOut, setMaxTimeOut] = useState(formatDate(shift.maxTimeOut,"HH:mm"));
  const [gracePeriod, setGracePeriod] = useState(formatDate(shift.gracePeriod,"HH:mm"));

  const [dayOfWeek, setDayOfWeek] = useState(formatDate(shift.dayOfWeek,"HH:mm"));

  const [scheduleId, setScheduleId] = useState(shift.schedule?.id);

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  function handleDayOfWeekChange(value) {
    setDayOfWeek(value);
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

  function hanldeCancel() {
    router.push(`/workschedule/${scheduleId}`);
  }

  async function handleOnSubmit(){
    var item = {
      id,
      name,
      description,
      type,
      timeIn,
      timeOut,
      minTimeIn,
      maxTimeOut,
      gracePeriod,
      dayOfWeek,
      scheduleId
    };

    const url = publicRuntimeConfig.SERVER_URI + `api/attendance/shift/${id}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    router.push(`/workschedule/${scheduleId}`);
  }

  return (
    <>
      <SectionTitle title="Edit" subtitle={`Shift ${id} - ${shift.name}`} />
      <Widget title="" description="" right="">
        <form>
          <div className="form flex w-full">
            <div className="grid grid-cols-2 gap-4">
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

              <div className="form-element">
                <Selects
                  item={itemsDayOfWeek}
                  selected={dayOfWeek}
                  onSelectChange={handleDayOfWeekChange}
                />
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleOnSubmit()}
                  >

                    <FiSave/>
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => hanldeCancel()}

                  >
                    Cancel
                  </button>
                </div>
            </div>

          </div>


        </form>
      </Widget>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {

    const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

    const { id } = ctx.params;

    const shift = await shiftService.get_Shift(id[0]);

    return {
      props: {
        shift: shift,
      },
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        shift: null,
      },
    };
  }
};
