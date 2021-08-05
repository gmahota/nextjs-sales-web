/* eslint-disable react/display-name */
import React, { useState, useEffect , useRef} from "react";
import Router, { useRouter } from "next/router";
import {useSelector, shallowEqual} from 'react-redux'
import Datetime from "react-datetime";
import moment from "moment";
import getConfig from "next/config";
import { FiWatch } from "react-icons/fi";
import { FiPlus } from 'react-icons/fi';


import Modal from "../../partials/modals/create-modal";
import DateFunction from "../../../functions/datetime"


import Datatable from "../../elements/datatable/ActionsTable";
import { Selects } from "../../elements/forms/selects";
import Widget from "../../elements/widget";

import workService from "../../../services/workschedule";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();



const ShiftsNormal = ({ workscheduleId, Shifts }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const [minTimeIn, setMinTimeIn] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");

  const [maxTimeOut, setMaxTimeOut] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");

  const [dayOfWeek, setDayOfWeek] = useState(2);

  const [scheduleId, setScheduleId] = useState(workscheduleId);

  const [shifts, setShifts] = useState(Shifts);

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
      scheduleId,
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

  function handlerEdit(id) {
    router.push(`/shift/${id}/edit`);

    // const item = workschedule.Shifts.find(p=> p.id === id)

    // if(!item){
    //   setId(id)
    //   setName(item.name);
    //   setDescription(item.description);
    //   setType(item.type);

    //   setTimeIn(item.timeIn)
    //   setTimeOut(item.timeOut)
    //   setMinTimeIn(item.minTimeIn)
    //   setMaxTimeOut(item.maxTimeOut)
    //   setGracePeriod(item.gracePeriod)
    //   setDayOfWeek(item.dayOfWeek)
    // }
  }

  function handlerDuplicate(id){

    router.push(`/shift/${id}/clone/?workschedule=${workscheduleId}`)
  }

  function handlerShowUsers(id){

    router.push(`/userschedule/?workschedule=${workscheduleId}&shift=${id}`)
  }

  function handleClear() {
    setType("Normal");
    setName("");
  }

  function handleDayOfWeekChange(value) {
    setDayOfWeek(value);

    const m = DateFunction.getDateMonth(value)

    let item = itemsDayOfWeek.options.find(pp=> pp.value.toString() === value.toString())

    setName("Shift "+ m)
    setDescription("Shift "+ m)
  }


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
        Cell: (props) => <span>{DateFunction.formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Time Out",
        accessor: "timeOut",
        Cell: (props) => <span>{DateFunction.formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Min Time In",
        accessor: "minTimeIn",
        Cell: (props) => <span>{DateFunction.formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Max Time Out",
        accessor: "maxTimeOut",
        Cell: (props) => <span>{DateFunction.formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Grace Period",
        accessor: "gracePeriod",
        Cell: (props) => <span>{DateFunction.formatDate(props.value, "HH:mm")}</span>,
      },
      {
        Header: "Day Of Week",
        accessor: "dayOfWeek",
      },
    ],
    []
  );

  const data = shifts;

  return (
    <>
      <Widget
        title=""
        description=""
        right=""
      >
        {data.length > 0 ? (<Datatable
          columns={columns}
          data={data}
          canView={false}
          canEdit={true}
          canDeleted={true}
          canDuplicate={true}
          showUsers={true}
          handlerEdit={handlerEdit}
          handlerDuplicate={handlerDuplicate}
          handlerShowUsers={handlerShowUsers}
        />):(<></>)

        }

      </Widget>
    </>
  );
};

export default ShiftsNormal;
