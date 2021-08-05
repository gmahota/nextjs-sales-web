import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import Title from './title'
import Item from './item'
import Logo from './logo'

const LeftSidebar = () => {
  const {navigation} = useSelector(
    state => ({
      navigation: state.navigation
    }),
    shallowEqual
  )
  return (
    <div className="left-sidebar left-sidebar-1">
      <Logo />
      {navigation.map((menu, i) => (
        <React.Fragment key={i}>
          <Title>{menu.title}</Title>
          <ul>
            {menu.items.map((l0, a) => (
              <li key={a} className="l0">
                <Item {...l0} />
                <ul>
                  {l0.items.map((l1, b) => (
                    <li key={b} className="l1">
                      <Item {...l1} />
                      <ul>
                        {l1.items.map((l2, c) => (
                          <li key={c} className="l2">
                            <Item {...l2} />
                            <ul>
                              {l2.items.map((l3, d) => (
                                <li key={d} className="l3">
                                  <Item {...l3} />
                                  <ul>
                                    {l3.items.map((l4, e) => (
                                      <li key={e} className="l4">
                                        <Item {...l4} />
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
  )
}

export default LeftSidebar
