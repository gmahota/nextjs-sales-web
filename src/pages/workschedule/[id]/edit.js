import React,{useState} from "react";
import getConfig from "next/config";

import Router, { useRouter } from "next/router";

import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";
import Datatable from "../../../components/elements/datatable/ActionsTable";
import { TextInput } from "../../../components/elements/forms/text-inputs";
import { Selects } from "../../../components/elements/forms/selects";
import { Radios } from "../../../components/elements/forms/radios";
import Modal from "../../../components/partials/modals/create-modal";

import { parseCookies } from 'nookies'

import {FiClock} from 'react-icons/fi'
import {FiSave} from 'react-icons/fi'


import workService from "../../../services/workschedule";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Workschedules({ workschedule }) {

  const router = useRouter(); //vai buscar o router
  
  const [type, setType] = useState(workschedule.type);
  const [id, setId] = useState(workschedule.id);
  const [name, setName] = useState(workschedule.name);

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

  async function  handleSave(){

    var item = {id,name,type}

    const url = publicRuntimeConfig.SERVER_URI + `api/attendance/workschedule/${id}`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    router.push('/workschedule');
  }

  function handleClear(){
    setType("Regular")
    setId("")

    setName("")
  }

  return (
    <>
      <SectionTitle title="Tables" subtitle="Workschedules" />
      <Widget
        title=""
        description=""
        right=""        
      >
        <div>
                <div className="form flex flex-wrap w-full">
                  <div className="w-full  mb-4">
                    <div className="form-element-inline">
                      <div className="form-label">Code</div>
                      <p>ID:{workschedule.id}</p>
                      {/* <input
                        name="id"
                        type="text"
                        value={id}
                        onChange={event => setId(event.target.value)}
                        className="form-input"
                        placeholder="Enter something..."
                      /> */}
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
                <div className="w-full flex flex-row">
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
        
      </Widget>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.params;

    const workschedule = await workService.get_Workschedule(id[0]);

    return {
      props: {
        workschedule: workschedule,
      }
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        workschedule: null,
      }
    };
  }
};
