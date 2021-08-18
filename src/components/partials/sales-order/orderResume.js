import React from "react";
import { FiBox } from "react-icons/fi";
import SectionTitle from "../../elements/section-title";
import Widget from "../../elements/widget";
import { formatCurrency } from "../../../functions/numbers";

const Index = ({ order }) => {
  const items = order.items;
  const account = {
    bank: "Barclays UK",
    account: "#13244657",
    date: "Jan 17, 2021",
  };

  return (
    <>
      <Widget>
        <div className="p-4">
          <div className="flex flex-row items-center justify-between mb-16">
            <div className="flex flex-col">
              <span className="text-blue-500 text-4xl uppercase font-bold">
                {order.type.description}
              </span>
              <span className="text-gray-500">{`#${order.type.code} - ${order.serie.code}/${order.code}`}</span>
            </div>
            <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start whitespace-nowrap">
              <div className="flex flex-row items-center justify-start space-x-2 text-blue-500">
                <FiBox size={28} className="stroke-current text-blue-500" />
                <span>Company logo</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between mb-16">
            <div className="flex flex-col">
              <span className="font-bold">Document to:</span>
              <span className="text-gray-500">
                {`${order.customer} - ${order.name}`}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Date:</span>
              <span className="text-gray-500">Dec 17, 2020</span>
            </div>
          </div>
          <table className="w-full table-auto mb-16 text-left">
            <thead>
              <tr>
                <th className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Unity
                </th>
                <th className="px-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                  Qnt.
                </th>

                <th className="pl-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider text-right">
                  Vat
                </th>
                <th className="pl-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="pr-3 py-2 whitespace-nowrap font-bold">
                    {item.description}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.unity}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.price}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.quantity}
                  </td>

                  <td className="pl-3 py-2 whitespace-nowrap text-right">
                    {formatCurrency(item.vatTotal)}
                  </td>
                  <td className="pl-3 py-2 whitespace-nowrap text-right">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row w-full mb-16">
            <div className="flex flex-col w-1/2">
              <div className="font-bold mb-2">Payment details</div>
              <table className="w-full table-auto text-left">
                <tbody>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Bank
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.bank}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Account
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.account}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Due date
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.date}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col w-1/2 self-center text-right">
              <span className="font-bold">Total amount</span>
              <span className="text-4xl font-bold text-blue-500">
                {formatCurrency(order.total)}
              </span>
              <span className="text-gray-500">
                VAT - {formatCurrency(order.vatTotal)}
              </span>
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
