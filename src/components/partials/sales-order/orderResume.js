import React from "react";
import { FiBox } from "react-icons/fi";
import Widget from "../../elements/widget";
import { formatCurrency,formatNumber } from "../../../functions/numbers";

const Index = ({ order }) => {
  const items = order.items;
  const account = {
    orcamento: 1000,
    saldo: 1000,
    total: 5000,
    sugeito:4000
  };

  return (
    <>
      <Widget>
        <div className="p-4">
          <div className="flex flex-row items-center justify-between mb-16">
            <div className="flex flex-col">
              <span className="text-blue-500 text-4xl uppercase font-bold">
                Aprovação de Pedidos
              </span>
              <span className="text-gray-500"> {order.document}</span>
            </div>
            <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start whitespace-nowrap">
              <div className="flex flex-row items-center justify-start space-x-2 text-blue-500">

                <span></span>
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
              <span className="text-gray-500">Mai 25, 2022</span>
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
              {items?.map((item, i) => (
                <tr key={i}>
                  <td className="pr-3 py-2 whitespace-nowrap font-bold">
                    {item.description}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.unit}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.price}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.quantity}
                  </td>

                  <td className="pl-3 py-2 whitespace-nowrap text-right">
                    {formatNumber(item.vatTotal)}
                  </td>
                  <td className="pl-3 py-2 whitespace-nowrap text-right">
                    {formatNumber(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row w-full mb-16">
            <div className="flex flex-col w-1/2">
              <div className="font-bold mb-2">Resumo Aprovação</div>
              <table className="w-full table-auto text-left">
                <tbody>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Orçamento Actual
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.orcamento}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Saldo
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.saldo}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Total do Documento
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.total}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-3 py-2 text-gray-500 text-xs leading-4 font-medium uppercase tracking-wider">
                      Sugeito a Aprovação
                    </td>
                    <td className="pl-3 py-2 whitespace-nowrap">
                      {account.sugeito}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col w-1/2 self-center text-right">
              <span className="font-bold">Total amount</span>
              <span className="text-4xl font-bold text-blue-500">
                {formatNumber(order.total)}
              </span>
              <span className="text-gray-500">
                VAT - {formatNumber(order.vatTotal)}
              </span>
            </div>
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
