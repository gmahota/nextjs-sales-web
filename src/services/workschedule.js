import getConfig from "next/config";
import CalculateDate from "../functions/calculateDate";
// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const get_Workschedules = async (filter) => {
  try {
    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/workschedules";

    let res = [];

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    })
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Workschedule = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI + `api/attendance/workschedule/${id}`;

    let res = {};

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Workschedule_Users = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI +
      `api/attendance/workschedule/${id}/users`;

    let res = [];

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Workschedule_Groups = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI +
      `api/attendance/workschedule/${id}/groups`;

    let res = [];

    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Workschedule_Shifts = async (id) => {
  try {
    const url =
      publicRuntimeConfig.SERVER_URI +
      `api/attendance/workschedule/${id}/shifts`;

    let res = [];
    let data = [];
    await fetch(url)
      .then((response) => response.json())
      .then((data) => (res = data));

    res.forEach((shift) => {
      let dates =  CalculateDate.getEventsFormShift(
        shift.dateBegin,
        shift.dateEnd,
        shift.dayOfWeek
      )
      
      data.push({
        ...shift,
        shiftEvents:dates.map(d=>{
          return {
            title:shift.description,
            start:CalculateDate.sumDateAndTime(d,shift.timeIn),
            end:CalculateDate.sumDateAndTime(d,shift.timeOut),
            className: 'bg-success'
          }
        })
      });
    });

    return data;
  } catch (e) {
    console.error(e);
  }
};

const get_DateCalendatFromShift = async(shifts)=>{
  const calendar = [];

  shifts.forEach((shift)=>{
    calendar.push(...shift.shiftEvents)
  })
  return calendar
}

export default {
  get_Workschedules,
  get_Workschedule,
  get_Workschedule_Groups,
  get_Workschedule_Users,
  get_Workschedule_Shifts,
  get_DateCalendatFromShift
};
