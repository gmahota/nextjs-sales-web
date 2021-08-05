import React from "react";
import Item from "./item";

const LeftSidebar = ({items,handleOnClick}) => {
  return (
    <div className="left-sidebar left-sidebar-1">
      {items?.map((item, i) => (
        <React.Fragment key={i}>
          <ul>
            <Item item={item} handleOnClick={handleOnClick} />
            {item.children?.map((l0, a) => (
              <li key={a} className="l0">
                <Item item={l0} handleOnClick={handleOnClick}/>
                <ul>
                  {l0.children?.map((l1, b) => (
                    <li key={b} className="l1">
                      <Item item={l1} handleOnClick={handleOnClick} />
                      <ul>
                        {l1.children?.map((l2, c) => (
                          <li key={c} className="l2">
                            <Item item={l2} handleOnClick={handleOnClick}/>
                            <ul>
                              {l2.children?.map((l3, d) => (
                                <li key={d} className="l3">
                                  <Item item={l3} handleOnClick={handleOnClick}/>
                                  <ul>
                                    {l3.children?.map((l4, e) => (
                                      <li key={e} className="l4">
                                        <Item item={l4} handleOnClick={handleOnClick}/>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LeftSidebar;
