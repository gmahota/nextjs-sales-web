import React, { useState } from "react";
import Router, { useRouter } from "next/router";

import { FiBox } from "react-icons/fi";
import SectionTitle from "../../elements/section-title";
import Widget from "../../elements/widget";

import Datatable from "../../elements/datatable/PeddingTable";
import { formatCurrency } from "../../../functions/numbers";

const Index = ({ order, peddingItems = [] }) => {
  // Pedding
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState([]);

  const handlerAddRow = (id) => {
    const item = order.items.find((i) => i.id === id);

    let tempItem = items;

    tempItem.push(item);

    setSelectedItem(item);

    setSelectedRow(id);

    setOpenDialog(true);
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
      <Datatable columns={columns} data={data} handlerAddRow={handlerAddRow} />
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
    const data = items;

    return (
      <Datatable columns={columns} data={data} canView={true} canEdit={true} />
    );
  };

  return (
    <>
      <SectionTitle title="Peding List" />
      <Widget>
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
