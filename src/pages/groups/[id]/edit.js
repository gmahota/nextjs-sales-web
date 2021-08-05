/* eslint-disable react/display-name */
import React,{useState} from "react";
import getConfig from "next/config";
import  { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import userGroupService from "../../../services/userGroup";
import scheduleService from "../../../services/workschedule";
import Datatable from "../../../components/elements/datatable";
import {Selects} from "../../../components/elements/forms/selects";

import DateFunction from "../../../functions/datetime"
import {FiSave} from 'react-icons/fi'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Groups({ usergroup, allSchedules }) {

  console.log("Vamos imprimir o usergroup")

  console.log(usergroup)
  const [name, setName] = useState(usergroup.name);


  const [schedule, setSchedule] = useState(usergroup.schedule?.id);

  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  let itemsSchedule = {
    label: "Group Schedule",
    name: "schedule",
    type: "select",
    placeholder: "Group Schedule",
    selected: schedule,
    options: [],
    onValueChange: handleScheduleChange,
  };

  allSchedules.forEach((item) => {
    itemsSchedule.options.push({
      key: item.id,
      value: item.id,
      label: item.name,
    });
  });

  function handleScheduleChange(value) {
    setSchedule(value);
  }

  async function  handleSave(){

    var item = {id: usergroup.id,name,schedule}
    console.log(item)


    const url = publicRuntimeConfig.SERVER_URI + `api/attendance/usergroup/${item.id}`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    router.push('/groups');
  }

  const Simple = () => {
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
          Cell: (props) => <span>{DateFunction.getDateTime(props.value,"HH:mm")}</span>,
        },
        {
          Header: "Time Out",
          accessor: "timeOut",
          Cell: (props) => <span>{DateFunction.getDateTime(props.value,"HH:mm")}</span>,
        },
        {
          Header: "Grace Period",
          accessor: "gracePeriod",
        },
        {
          Header: "Day Of Week",
          accessor: "dayOfWeek",
        },
      ],
      []
    );
    const data = React.useMemo(() => usergroup.Shifts, []);
    return <Datatable columns={columns} data={data} />;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle={`User Group - ${usergroup.id}`} />
      <Widget
        title="Details"
        description={
          <span>
            {usergroup.name} <code>&lt;Shifts, assign... /&gt;</code>
          </span>
        }
      >

<div>
                <div className="form flex flex-wrap w-full">
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Code</div>
                      <p>ID:{usergroup.id}</p>

                    </div>
                  </div>
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Name</div>
                      <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
                      />
                    </div>
                    <div className="w-full lg:w-1/4">
            <Selects
              item={itemsSchedule}
              selected={schedule}
              onSelectChange={handleScheduleChange}
            />
          </div>


                  </div>
                  <div className="space-x-2">
              <button
                className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded"
                onClick={handleSave}
              >
                <FiSave className="stroke-current mr-2" />
                <span>Save</span>
              </button>
            </div>

                  </div>
                  </div>
        {/* <Simple /> */}
      </Widget>
    </>
  );
}

/*export const getStaticPaths = async (req) => {
  try {
    const usergroup = await userGroupService.get_UserGroups();


    const paths = usergroup?.map((item) => {
      return { params: { id: item.id.toString() } };
    });

    return {
      paths,
      fallback: true

    };
  } catch (e) {
    console.log(e);

    return {
      paths: [],
      fallback: true,
    };
  }
};*/

export const getServerSideProps = async (context) => {

    try {
      const { "attendance.token": token } = parseCookies(context);

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const { id } = context.params;


    const usergroup = await userGroupService.get_UserGroup(id);

    const allSchedules = await scheduleService.get_Workschedules();



    return {
      props: {
        usergroup: usergroup,
        allSchedules: allSchedules
      },

    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        usergroup: null,
      },

    };
  }
};
