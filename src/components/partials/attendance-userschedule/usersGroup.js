/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import Widget from "../../elements/widget";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import { PageWithText } from "../../elements/pagination";
import {
  FiClock,
  FiPlus,
  FiMinus,
  FiDelete,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const UsersGroupForm = ({ data, handleAdd, handleRemove }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Code",
        accessor: "id",
        Cell: (props) => <a href={`/users/${props.value}`}>{props.value}</a>,
      },
      {
        Header: "Name",
        accessor: "name",
      },
    ],
    []
  );

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
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </>
          ),
        },
        ...columns
      ]);
    }
  );

  function getSelected() {
    //callback goes here to get selected row ids
    const items = data.filter((item, index) =>
      Object.keys(selectedRowIds)
        .map((i) => parseInt(i, 10))
        .includes(index)
    );

    handleAdd(items)
  }

  function getSelectedToRemove() {
    //callback goes here to get selected row ids
    const items = data.filter((item, index) =>
      Object.keys(selectedRowIds)
        .map((i) => parseInt(i, 10))
        .includes(index)
    );

    handleRemove(items)
  }

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="form-checkbox h-4 w-4"
        />
      );
    }
  );
 
  return (
    <Widget
      title="User in Group"
      right={
        <>
          <button
            className="btn btn-circle bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised"
            onClick={() => getSelected()}
          >
            <FiPlus className="stroke-current" />
          </button>
          <button className="btn btn-circle bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 btn-raised">
            <FiMinus className="stroke-current" onClick={() => getSelectedToRemove()}/>
          </button>
        </>
      }
    >
      
      <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={i}
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
                  {row.cells.map((cell) => {
                    return (
                      <td key={i} {...cell.getCellProps()}>
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
              <PageWithText onClick={() => previousPage()}>
                Previous
              </PageWithText>
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

    </Widget>
  );
};

export default UsersGroupForm;
