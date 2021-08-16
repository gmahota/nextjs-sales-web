/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';

import Modal from "../../components/partials/modals/create-modal";
import Datatable from "../../components/elements/datatable/ActionsTable";
import { UnderlinedTabs } from "../../components/elements/tabs";

import { FiClipboard } from 'react-icons/fi';

import typedocService from "../../services/typedoc";
import customerService from "../../services/customers";
import productService from "../../services/products";
import projectService from "../../services/projects";
import * as Math from "../../functions/numbers";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Documents({
  customerOptions,
  typeOptions,
  productOptions,
  projectOptions
}) {

  const router = useRouter(); //vai buscar o router

  const [items, setItems] = useState([])



  const onSubmit = async (data) => {

    const url = publicRuntimeConfig.SERVER_URI + `api/sales/document`;

    data.items = items;

    console.log(data)

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    router.push("/orders")
  }

  const onSubmitAddLines = async (data) => {

    const list = [...items]

    list.push({ id: 0, grossTotal: data.total, ...data })

    setItems(list);
  }

  let itemsForm = [
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code'
    },
    {
      label: 'Date',
      name: 'date',
      type: 'date',
      placeholder: 'Enter the code'
    },
    {
      label: 'Type',
      error: { required: 'Please enter your type' },
      name: 'type',
      type: 'select',
      options: typeOptions
    },
    {
      label: 'Serie',
      error: { required: 'Please enter your type - Now only 2021' },
      name: 'serie',
      type: 'text',
      placeholder: 'Enter the - Now only 2021'
    },
    {
      label: 'Customer',
      name: 'customer',
      type: 'select',
      options: customerOptions
    },
    {
      label: 'Name',
      error: { required: 'Please enter the name' },
      name: 'name',
      type: 'text',
      placeholder: 'Enter the name'
    },
    {
      label: 'Vat Total',
      name: 'vatTotal',
      type: 'number',
      placeholder: 'Enter the vat Total'
    },
    {
      label: 'Discount Total',
      name: 'discountTotal',
      type: 'number',
      placeholder: 'Enter the discount'
    },
    {
      label: 'Gross Total',
      name: 'grossTotal',
      type: 'number',
      placeholder: 'Enter the Gross Total'
    },
    {
      label: 'Total',
      name: 'total',
      type: 'number',
      placeholder: 'Enter the Total'
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'toAproval', label: 'To Approval' }
      ]
    }
  ]

  const handlerLineCodeChange = async (e, setValue) => {
    const code = e.target.value;

    const product = productOptions.find(item => item.value === code);

    if (product.label === "") {
      setValue("description", "")
      setValue("unity", product.unity || "UN")
      setValue("quantity", 1)
      setValue("price", 0)
      setValue("vatTotal", 0)
      setValue("total", 0)
    } else {
      setValue("description", product.description)
      setValue("unity", product.unity || "UN")
      setValue("quantity", 1)
      setValue("price", Math.rounded(product.price))
      setValue("vatTotal", Math.rounded(product.price * 0.17))
      setValue("total", Math.rounded((product.price * 0.17 + product.price)))
    }
  }

  const handlerLineQuantityChange = async (e, setValue, getValues) => {
    const product = productOptions.find(item => item.value === getValues("code"));

    const quantity = e.target.value;
    const price = Number(getValues("price"));
    const vatTotal = Number(Math.rounded(price * quantity * 0.17));
    const total = (price * Number(quantity)) + vatTotal;

    setValue("vatTotal", vatTotal);
    setValue("total", Math.rounded(total))
  }

  const handlerLinePriceChange = async (e, setValue, getValues) => {
    const product = productOptions.find(item => item.value === getValues("code"));

    const price = Number(e.target.value);
    const quantity = Number(getValues("quantity"));
    const vatTotal = Number(Math.rounded(price * 0.17));
    const total = (price * Number(quantity)) + vatTotal

    setValue("vatTotal", vatTotal);
    setValue("total", total);
  }

  let itemsLines = [
    {
      label: 'Code',
      name: 'code',
      error: { required: 'Please select the Product' },
      type: 'select',
      options: productOptions,
      onChange: handlerLineCodeChange
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      placeholder: 'Enter the Description'
    },

    {
      label: 'ItemUnity',
      name: 'unity',
      type: 'select',
      options: [{ label: "Unity", value: "UN" }]
    },
    {
      label: 'Quantity',
      error: { required: 'Please enter your type - Now only 2021' },
      name: 'quantity',
      type: 'number',
      placeholder: 'Enter the - Now only 2021',
      onChange: handlerLineQuantityChange
    },
    {
      label: 'Price',
      error: { required: 'Please enter the name' },
      name: 'price',
      type: 'number',
      placeholder: 'Enter the name',
      onChange: handlerLinePriceChange
    },
    {
      label: 'Vat',
      error: { required: 'Please enter the name' },
      name: 'vatTotal',
      type: 'number',
      placeholder: 'Enter the name',
      readOnly: true
    },
    {
      label: 'Total',
      name: 'total',
      type: 'number',
      placeholder: 'Enter the vat Total',
      readOnly: true
    },
    {
      label: 'Project',
      name: 'project',
      type: 'select',
      options: projectOptions
    }
  ]

  const handleCancel = () => {
    router.push('/order')
  }

  const handleItemAdd = async () => {
    const vatT =
      Number.parseFloat(itemTotal.toString()) * Number.parseFloat('0.17')
    const tot = Number.parseFloat(itemTotal.toString()) + vatT

    const item = {
      id: items.length + 1,
      code: itemCode,
      description: itemDescription,
      project: itemProject,
      unity: itemUnity,
      quantity: itemQuantity,
      price: itemPrice,
      grossTotal: itemTotal,
      vatTotal: vatT,
      total: tot,
      status: 'pedding'
    }

    setGrossTotal(itemTotal)

    setVatTotal(vatT)

    setTotal(tot)

    const list = [...items]

    list.push(item)

    setItems(list)

    setOpen(false)
  }

  const LineItems = () => {
    const columns = React.useMemo(
      () => [

        {
          Header: "Id",
          accessor: "id"
        },
        {
          Header: "Code",
          accessor: "code"
        },
        {
          Header: 'Description',
          accessor: 'description'
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

  const tabs = [
    {
      index: 0,
      title: "Resume",
      active: false,
      content: <div> Ola Mundo </div>,
    },
    {
      index: 1,
      title: "General",
      active: true,
      content: <FormValidation items={itemsForm} onSubmit={onSubmit} />,
    },
    {
      index: 2,
      title: "Lines",
      active: false,
      content: <LineItems />,
    },

  ];

  return (
    <>
      <SectionTitle title="Create a New" subtitle="Sales Document" />

      <Widget
        title=""
        description=""
        right={
          <Modal
            title="Add new Item."
            icon={
              <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                <FiClipboard size={18} className="stroke-current text-red-500" />
              </span>
            }
            body={
              <FormValidation items={itemsLines} onSubmit={onSubmitAddLines} />
            }
            buttonTitle="Save"
            buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"

          />
        }
      >
        <UnderlinedTabs tabs={tabs} />
      </Widget>


    </>)
}

export const getServerSideProps = async (ctx) => {
  const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const typeOptions = await typedocService.get_TypeDocs_Options('COT')

  const customerOptions = await customerService.get_Customers_Options()

  const projectOptions = await projectService.get_Projects_Options()

  const productOptions = await productService.get_Products_Options();

  return {
    props: {
      typeOptions,
      customerOptions,
      productOptions,
      projectOptions
    },
  };
};
