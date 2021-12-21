import React, { useState } from "react";
import StarRating from "../../elements/star-rating";
import * as numbers from "../../../functions/numbers";
import { FiGrid, FiMenu } from "react-icons/fi";
import Items from "./items";

const Products = ({ items }) => {
  const [grid, setGrid] = useState(false);
  return (
    <>
      <div className="flex flex-row w-full items-center justify-between h-16 mb-4">
        <div className="font-normal">{items.length} product(s)</div>

        <div className="flex flex-row items-center justify-center space-x-1">
          <button
            className="btn btn-circle bg-transparent text-gray-500"
            onClick={() => setGrid(true)}
          >
            <FiGrid className="stroke-current" size={20} />
          </button>
          <button
            className="btn btn-circle bg-transparent text-gray-500"
            onClick={() => setGrid(false)}
          >
            <FiMenu className="stroke-current" size={20} />
          </button>
        </div>

        <div className="form-element form-element-inline">
          <div className="form-label">Sort by</div>
          <select className="form-select">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most popular</option>
            <option>Best sellers</option>
          </select>
        </div>
      </div>
      <div className={`${grid ? "w-full flex flex-row flex-wrap" : "hidden"}`}>
        {items?.map((item, i) => (
          <div className="w-1/4 p-2" key={i}>
            <div className="w-full flex flex-col items-start justify-around space-y-2">
              <div className="text-sm font-bold">{`${item.type.code} - ${item.code}/${item.serie.code}`}</div>
              <div className="text-sm ">{`Code: ${item.code}`}</div>
              <div className="text-xl font-bold">
                {numbers.formatNumber(item.total)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${!grid ? "w-full flex flex-col" : "hidden"}`}>
        {items?.map((item, i) => (
          <div
            className="flex items-center justify-start p-2 space-x-4 truncate"
            key={i}
          >
            {/* <div className="flex flex-col w-full min-w-0">
              <div className="text-sm font-bold">{`${item.type.code} - ${item.code}/${item.serie.code}`}</div>
            </div>
            <div className="flex-shrink-0">
              <div className="text-xl font-bold">
                {numbers.formatNumber(item.total)}
              </div>
            </div> */}

            <div className="flex flex-col w-full min-w-0">
              <Items
                header={
                  <>
                    <div className="flex flex-col w-full min-w-0">
                      <div className="text-sm font-bold">{`${item.type.code} - ${item.code}/${item.serie.code}`}</div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-sm font-bold">
                        {numbers.formatNumber(item.total)}
                      </div>
                    </div>
                  </>
                }
                items={item.itemsVariants}

              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
