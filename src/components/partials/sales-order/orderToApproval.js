import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import getConfig from "next/config";

import { FiBox } from "react-icons/fi";
import SectionTitle from "../../elements/section-title";
import Widget from "../../elements/widget";

import Datatable from "../../elements/datatable/PeddingTable";
import { formatCurrency } from "../../../functions/numbers";
import { FiSave } from "react-icons/fi";

import ordersService from "../../../services/sales";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const Index = ({ order, peddingItems = [] }) => {
  const router = useRouter();

  // Pedding
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsAproval, setItemsAproval] = useState([]);

  useEffect(() => {
    setTotalAmount(
      // sum total itemsAproval
      itemsAproval.reduce((acc, item) => {
        return acc + item.total;
      }, 0)
    );
  }, [itemsAproval]);

  const handlerAddRow = (id) => {
    setSelectedRow(id);

    const item = order.items.find((i) => i.id === id);

    let tempItem = itemsAproval;

    tempItem.push(item);

    setItemsAproval(tempItem);

    setTotalAmount(
      // sum total itemsAproval
      itemsAproval.reduce((acc, item) => {
        return acc + item.total;
      }, 0)
    );

    //setOpenDialog(true);
  };

  const handlerRemoveRow = (id) => {
    setItemsAproval(itemsAproval.filter((i) => i.id !== id));

    //setOpenDialog(true);
  };

  const PeddingList = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Quantity",
          accessor: "quantity",
        },
        {
          Header: "Price",
          accessor: "price",
        },
        {
          Header: "Gross Total",
          accessor: "grossTotal",
        },
        {
          Header: "Vat Total",
          accessor: "vatTotal",
        },

        {
          Header: "Total",
          accessor: "total",
        },
        {
          Header: "Status",
          accessor: "status",
        },
      ],
      []
    );
    const data = peddingItems;

    return (
      <Datatable
        columns={columns}
        data={data}
        handlerAddRow={handlerAddRow}
        canAdd={true}
      />
    );
  };

  const ItemsToAproval = () => {
    const columns = React.useMemo(
      () => [
        {
          Header: "Id",
          accessor: "id",
        },
        {
          Header: "Quantity",
          accessor: "quantity",
        },
        {
          Header: "Price",
          accessor: "price",
        },
        {
          Header: "Gross Total",
          accessor: "grossTotal",
        },
        {
          Header: "Vat Total",
          accessor: "vatTotal",
        },

        {
          Header: "Total",
          accessor: "total",
        },
        {
          Header: "Status",
          accessor: "status",
        },
      ],
      []
    );

    return (
      <Datatable
        columns={columns}
        data={itemsAproval}
        canRemove={true}
        handlerRemoveRow={handlerRemoveRow}
      />
    );
  };

  const handlePeddingSave = async () => {
    try {
      const docItemsVariant = itemsAproval?.map((item) => {
        return {
          id: 0,
          quantity: item.quantity,
          price: item.price,
          grossTotal: item.grossTotal,
          vatTotal: item.vatTotal,
          vatCode: item.vatCode,
          total: item.total,
          status: "to approval",
          documentItemId: item.id,
        };
      });

      console.log(itemsAproval);
      const url =
        publicRuntimeConfig.SERVER_URI +
        `api/sales/documents/${order.id}/itemsVariant`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docItemsVariant: docItemsVariant }),
      });

      if (res.status === 200) {
        router.reload();
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error(e);
      // setErrorMessage(e.message)
    }
  };

  return (
    <>
      <SectionTitle title="Peding List" />

      <Widget
        right={
          <div>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button"
              onClick={handlePeddingSave}
            >
              <FiSave className="stroke-current text-white" size={18} />
              <span>Save</span>
            </button>
          </div>
        }
      >
        <div>
          <div className="form-element">
            <div className="form-label">Total Amount</div>
            <input
              name={totalAmount}
              value={totalAmount}
              type="text"
              className="form-input"
              placeholder="Total Amount"
              disabled={true}
            />
          </div>
        </div>
        <PeddingList />
      </Widget>

      <SectionTitle title="Items to Aproval" />
      <Widget>
        <ItemsToAproval />
      </Widget>
    </>
  );
};
export default Index;
