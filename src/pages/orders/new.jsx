/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Quagga from 'quagga';

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';
import FormOrder from './../../components/elements/forms/validation';

import Modal from "../../components/partials/modals/create-modal";
import Datatable from "../../components/elements/datatable/ActionsTable";
import { UnderlinedTabs } from "../../components/elements/tabs";

import { FiSave, FiClipboard } from 'react-icons/fi';

import typedocService from "../../services/typedoc";
import customerService from "../../services/customers";
import productService from "../../services/products";
import projectService from "../../services/projects";
import * as Math from "../../functions/numbers";
import Dates from "../../functions/datetime";

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
  const [vatTotal, setVatTotal] = useState(0)
  const [grossTotal, setGrossTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [discountTotal, setDiscountTotal] = useState(0)

  const [code, setCode] = useState("")
  const [date, setDate] = useState(new Date())
  const [type, setType] = useState("COT")
  const [serie, setSerie] = useState("")
  const [customer, setCustomer] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState("open")

  const firstUpdate = useRef(true);
  const [isStart, setIsStart] = useState(false);
  const [barcode1, setBarcode1] = useState('');
  const [barcode2, setBarcode2] = useState('');

  useEffect(() => {
    return () => {
      if (isStart) stopScanner();
    };
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (isStart) startScanner();
    else stopScanner();
  }, [isStart]);

  const _onDetected = res => {
    // stopScanner();
    if (barcode1.length === 0) {
      setBarcode1(res.codeResult.code);
    } else {
      setBarcode2(res.codeResult.code);
      stopScanner();
    }

  };

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            facingMode: 'environment' // or user
          }
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: 'large', // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false
            }
          }
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
            'i2of5_reader',
            '2of5_reader',
            'code_93_reader'
          ]
        }
      },
      err => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    Quagga.onProcessed(result => {
      let drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width')),
            parseInt(drawingCanvas.getAttribute('height'))
          );
          result.boxes.filter(box => box !== result.box).forEach(box => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'green',
              lineWidth: 2
            });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#00F', lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });
  };

  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  const itemsTotal = [
    { title: 'Total Vat', element: <text>{vatTotal}</text> },
    { title: 'Gross Total', element: <text>{grossTotal}</text> },
    { title: 'Total Discount', element: <text>{discountTotal}</text> },
    { title: 'Total', element: <text>{total}</text> },
  ]

  const itemsResume = [
    { title: 'Date', element: <text>{Dates.formatDate(date, "yyyy-MM-DD")}</text> },
    { title: 'Type', element: <text>{type}</text> },
    { title: 'Customer', element: <text>{customer}</text> },
    { title: 'Name', element: <text>{name}</text> },
  ]

  const ResumeDiv = () => {
    return (<>
      <div className="table table-auto w-full">
        <div className="table-row-group">
          {itemsResume.map((item, i) => (
            <div className="table-row" key={i}>
              <div className="table-cell whitespace-nowrap px-2 text-sm">
                {item.title}
              </div>
              <div className="table-cell px-2 whitespace-normal">
                {item.element}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    );
  }

  const TotalDiv = () => {
    return (<>
      <div className="table table-auto w-full">
        <div className="table-row-group">
          {itemsTotal.map((item, i) => (
            <div className="table-row" key={i}>
              <div className="table-cell whitespace-nowrap px-2 text-sm">
                {item.title}
              </div>
              <div className="table-cell px-2 whitespace-normal">
                {item.element}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    );
  }

  const onSubmit = async (data) => {

    setCode(data.code)

    setDate(data.date)

    setType(data.type)

    setSerie(data.serie)

    setCustomer(data.customer)

    setName(data.name)

    setDiscountTotal(data.totalDiscount)
  }

  const handleSave = async () => {

    const url = publicRuntimeConfig.SERVER_URI + `api/sales/documents`;

    let data = {
      code,
      date,
      type,
      customer,
      name,
      serie,
      discountTotal,
      grossTotal,
      vatTotal,
      total,
      status,
      items
    }

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

  const handlerCode = async (e, setValue) => {
    const code = e.target.value;

    setCode(code)
  }

  const handlerDate = async (e, setValue) => {
    const code = e.target.value;

    setDate(code)
  }

  const handlerType = async (e, setValue) => {
    const code = e.target.value;

    setType(code)
  }

  const handlerSerie = async (e, setValue) => {
    const code = e.target.value;

    setSerie(code)
  }

  const handlerCustomer = async (e, setValue) => {
    const code = e.target.value;

    const customer = customerOptions.find(item => item.value.toString() === code.toString());

    setValue("name", customer.label)

    setCustomer(code)
    setName(customer.label)
  }

  const handlerName = async (e, setValue) => {
    const code = e.target.value;

    setName(code)
  }

  const handlerDiscount = async (e, setValue) => {
    const code = e.target.value;

    setDiscountTotal(code)
  }

  const handlerStatus = async (e, setValue) => {
    const code = e.target.value;

    setStatus(code)
  }

  let itemsForm = [
    {
      label: 'Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code',
      onChange: handlerCode
    },
    {
      label: 'Date',
      name: 'date',
      type: 'date',
      placeholder: 'Enter the code',
      onChange: handlerDate
    },
    {
      label: 'Type',
      error: { required: 'Please enter your type' },
      name: 'type',
      type: 'select',
      options: typeOptions,
      onChange: handlerType
    },
    {
      label: 'Serie',
      error: { required: 'Please enter your type - Now only 2021' },
      name: 'serie',
      type: 'text',
      placeholder: 'Enter the - Now only 2021',
      onChange: handlerSerie
    },
    {
      label: 'Customer',
      name: 'customer',
      type: 'select',
      options: customerOptions,
      onChange: handlerCustomer
    },
    {
      label: 'Name',
      error: { required: 'Please enter the name' },
      name: 'name',
      type: 'text',
      placeholder: 'Enter the name',
      onChange: handlerName
    },
    {
      label: 'Discount Total',
      name: 'discountTotal',
      type: 'number',
      placeholder: 'Enter the discount',
      onChange: handlerDiscount
    },
    {
      label: 'Status',
      name: 'status',
      type: 'select',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'toAproval', label: 'To Approval' }
      ],
      onChange: handlerStatus
    }
  ]

  const onSubmitAddLines = async (data) => {

    const list = [...items]

    list.push({ id: 0, grossTotal: data.total, json: { barcode1, barcode2 }, ...data })

    //setVatTotal(list.reduce((acc, line) => acc + Number(line.vatTotal), 0))
    setGrossTotal(list.reduce((acc, line) => acc + Number(line.price * line.quantity), 0))
    setTotal(list.reduce((acc, line) => acc + Number(line.total), 0) - Number(discountTotal))

    setItems(list);
  }

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
      label: 'Total',
      name: 'total',
      type: 'number',
      placeholder: 'Enter the vat Total',
      readOnly: true
    }
  ]

  const handleCancel = () => {
    router.push('/order')
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
        },
        {
          Header: "Serie 1",
          accessor: "json.barcode1"
        },
        {
          Header: "Serie 2",
          accessor: "json.barcode2"
        },
      ],
      []
    );

    return (<Datatable columns={columns} data={items} link="/product"
      canView={false} canEdit={false} />);
  };

  const tabs = [
    {
      index: 0,
      title: "General",
      active: true,
      content: <FormOrder items={itemsForm} onSubmit={onSubmit} />,
    },
    {
      index: 1,
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

          <div>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handleSave}>

              <FiSave className="stroke-current text-white" size={18} />
              <span>Save</span>
            </button>

            <Modal
              title="Add new Item."
              icon={
                <span className="h-10 w-10 bg-red-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                  <FiClipboard size={18} className="stroke-current text-red-500" />
                </span>
              }
              body={
                <div class="grid grid-cols-2 gap-4" >
                  <div>
                    <FormValidation items={itemsLines} onSubmit={onSubmitAddLines} />
                  </div>
                  <div>
                    <button onClick={() => setIsStart(prevStart => !prevStart)} style={{ marginBottom: 20 }}>{isStart ? 'Stop' : 'Start'}</button>
                    {isStart && <React.Fragment>
                      <div id="scanner-container" />

                      <span>Barcode 1: {barcode1}</span>
                      <br />
                      <span>Barcode 2: {barcode2}</span>
                    </React.Fragment>}
                  </div>
                </div>
              }
              buttonTitle="Save"
              buttonClassName="btn btn-default btn-rounded bg-green-500 hover:bg-red-600 text-white"

            />

          </div>
        }
      >
        <fieldset>
          <legend>Resume</legend>

          <div class="grid grid-cols-2 gap-4">
            <div><ResumeDiv /> </div>
            <div><TotalDiv /></div>
          </div>
        </fieldset>

        <UnderlinedTabs tabs={tabs} />
      </Widget >


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
