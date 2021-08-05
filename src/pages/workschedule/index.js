/* eslint-disable react/display-name */
import React,{useState} from "react";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";
import SectionTitle from "../../components/elements/section-title";
import Widget from "../../components/elements/widget";
import Datatable from "../../components/elements/datatable/ActionsTable";
import { Radios } from "../../components/elements/forms/radios";
import Modal from "../../components/partials/modals/create-modal";
import workService from "../../services/workschedule";
import { parseCookies } from 'nookies'

import {FiClock} from 'react-icons/fi'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Workschedules({ allWorkschedules }) {
  const router = useRouter();

  const [type, setType] = useState("Regular");
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  let itemsReport = {
    label: "Type",
    name: "type",
    type: "radio",
    placeholder: "Scheduler Type",
    options: [
      { value: "Regular", name: "Regular", label: "Regular" },
      { value: "Seasonal", name: "Seasonal", label: "Seasonal" },
      { value: "Countdown", name: "Countdown", label: "Countdown" },
    ],
    onValueChange: handleWorkschedulesType,
  };

  function handleWorkschedulesType(value) {
    setType(value);
  }

  function handlerEdit(id){
    router.push(`workschedule/${id}/edit`)
  }
  async function  handleSave(){

    var item = {id,name,type}

    const url = publicRuntimeConfig.SERVER_URI + "api/attendance/workschedule";

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    handleClear()

    router.reload()
  }

  function handleClear(){
    setType("Regular")
    setId("")

    setName("")
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
      ],
      []
    );
    const data = allWorkschedules;
    return <Datatable
      columns={columns} data={data} link="/workschedule"
       canView={true} canEdit={true}
       handlerEdit={handlerEdit}/>;
  };

  return (
    <>
      <SectionTitle title="Tables" subtitle="Workschedules" />
      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Create New Work Schedule"
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiClock size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <form>
                <div className="form flex flex-wrap w-full">
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Code</div>
                      <input
                        name="id"
                        type="text"
                        value={id}
                        onChange={event => setId(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
                      />
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
                  </div>

                  <div className="w-full  mb-4">
                    <Radios item={itemsReport} selected={type} />
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
        <Simple />
      </Widget>
    </>
  );
}

export const getServerSideProps= async (ctx) => {
  const { ['attendance.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const allWorkschedules = await workService.get_Workschedules();

  return {
    props: {
      allWorkschedules,
    },
  };
}
