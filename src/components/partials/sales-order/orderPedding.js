import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getConfig from "next/config";

import { FiBox } from "react-icons/fi";
import SectionTitle from "../../elements/section-title";
import Widget from "../../elements/widget";

import Modal from "../../../components/partials/modals/create-modal";
import FormValidation from '../../../components/elements/forms/validation';

import Datatable from "../../elements/datatable/PeddingTable";

import { FiSave,FiChevronRight, FiClipboard } from 'react-icons/fi';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

const Index = ({ order, peddingItems = [] }) => {
  const router = useRouter();

  const [items, setItems] = useState([])

  const handleSave = async () => {

    router.push("/orders")
  }

  const onSubmitAddLines = async (data) => {


    let item = {
      id: "P1001",
      ccusto1: "Departamento IT",
      ccusto2: "Departamento Manutenção",
      unity: "UN",
      quantity: "1",
      price: 4000,
      total: 4000
    }

    const list = [...items]

    list.push(item)

    setItems(list);
  }

  let itemsLines = [
    {
      label: 'Produto',
      name: 'item',
      error: { required: 'Selecione o Produto' },
      type: 'select',
      options: [{
        label: 'P001',
        value: 'Madeira 1100x100x40 mm - Chanfuta'
      }]
    },
    {
      label: 'Custo',
      name: 'custo',
      type: 'text',
      value: "Fipag Sul - Departamento IT",
      readOnly: true
    },
    {
      label: 'Pendente',
      name: 'pendente',
      type: 'number',
      value: 4000,
      readOnly: true
    }
  ]

  const LineItems = () => {
    const columns = React.useMemo(
      () => [

        {
          Header: "item",
          accessor: "id"
        },
        {
          Header: "Custo Antigo",
          accessor: "ccusto1"
        },
        {
          Header: 'Custo Novo',
          accessor: 'ccusto2'
        },
        {
          Header: "Unity",
          accessor: "unity"
        },
        {
          Header: "Qnt.",
          accessor: "quantity"
        },
        {
          Header: "Price",
          accessor: "price"
        },
        {
          Header: "Total",
          accessor: "total"
        }
      ],
      []
    );

    return (<Datatable columns={columns} data={items} link="/product"
      canView={false} canEdit={false} />);
  };

  const SimpleTable = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Descrição",
          accessor: "desc"
        },
        {
          Header: "Orçamento",
          accessor: "orc",
        },
        {
          Header: "Usado",
          accessor: "usado",
        },
        {
          Header: "Disponivel",
          accessor: "disp"
        },
        {
          Header: "Acção",
          accessor: "status",

          Cell: (props) => <FiChevronRight/>
        },

      ],
      []
    );
    const data = [
      {
        id: "1001",
        desc: "Departamento Manutenção",
        orc: 200000,
        usado: 200000,
        disp: 180000,
        status: ""
      },
      {
        id: "1001",
        desc: "Departamento Procrument",
        orc: 100000,
        usado: 80000,
        disp: 20000,
        status: ""
      }
    ];

    return <Datatable columns={columns} data={data} link="/buget"
      canView={true} canEdit={true} />;
  };

  return (
    <>
      <SectionTitle title="Pedding List" />

      <Widget
        right={
          <div>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handleSave}>

              <FiSave className="stroke-current text-white" size={18} />
              <span>Save</span>
            </button>

            <Modal
              title="Realocação de Orçamento"
              icon={
                <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <FiClipboard size={18} className="stroke-current text-red-500" />
                </span>
              }
              body={
                <div>
                  <FormValidation items={itemsLines} onSubmit={onSubmitAddLines} />

                  <SimpleTable />
                </div>


              }
              buttonTitle="Save"
              buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"

            />
          </div>
        }
      >

        <LineItems />
      </Widget>

    </>
  );
};
export default Index;
