import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";

//Icons
import {
  FiEdit,
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiDelete,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";


import { PageWithText } from "../pagination";

const Datatable = ({
  columns,
  data,
  handlerAddRow,
  handlerRemoveRow,
  open = false,
  canAdd = false,
  canRemove = false,
}) => {
  const router = useRouter();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...columns,
        {
          accessor: "actions",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: "",
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox

          Cell: ({ row }) => (
            <>
              {canAdd === true ? (
                <button
                  key={row.values.id || row.values.code}
                  onClick={() =>
                    handlerAddRow(row.values.id || row.values.code)
                  }
                >
                  <FiChevronRight className="stroke-current mr-2" />
                </button>
              ) : (
                <></>
              )}

              {canRemove === true ? (
                <button
                  key={row.values.id || row.values.code}
                  onClick={() =>
                    handlerRemoveRow(row.values.id || row.values.code)
                  }
                >
                  <FiChevronLeft className="stroke-current mr-2" />
                </button>
              ) : (
                <></>
              )}
            </>
          ),
        },
      ]);
    }
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <tr key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={key}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex flex-row items-center justify-start">
                    <span>{column.render("Header")}</span>
                    {/* Add a sort direction indicator */}
                    <span className="ml-auto">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown className="stroke-current text-2xs" />
                        ) : (
                          <FiChevronUp className="stroke-current text-2xs" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return (
                    <td key={j} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex flex-row items-center justify-between my-4">
        <div className="flex flex-wrap items-center justify-start space-x-2 pagination">
          {pageIndex !== 0 && (
            <PageWithText onClick={() => gotoPage(0)}>First</PageWithText>
          )}
          {canPreviousPage && (
            <PageWithText onClick={() => previousPage()}>Previous</PageWithText>
          )}
          {canNextPage && (
            <PageWithText onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </PageWithText>
          )}
          {pageIndex !== pageCount - 1 && (
            <PageWithText
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              Last
            </PageWithText>
          )}
        </div>

        <span>
          Page{" "}
          <b>
            {pageIndex + 1} of {pageOptions.length}
          </b>{" "}
        </span>

        <select
          className="form-select text-sm bg-white dark:bg-gray-800 dark:border-gray-800 outline-none shadow-none focus:shadow-none"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Datatable;
