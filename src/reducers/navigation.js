import React from "react";
import {
  FiSettings,
  FiShoppingBag,
  FiToggleLeft,
  FiList,
  FiActivity,
  FiCalendar,
  FiStar,
  FiDroplet,
  FiGrid,
  FiClock,
  FiCopy,
  FiUser,
  FiPieChart,
  FiCompass,
  FiHelpCircle,
  FiShoppingCart,
  FiHome,
} from "react-icons/fi";

const initialState = [
  {
    title: "Sales - System",
    items: [
      {
        url: "/",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/",
        icon: <FiActivity size={20} />,
        title: "Reports",
        items: [
          {
            url: "/",
            title: "General",
            items: [],
          },
          {
            url: "/",
            title: "History",
            items: [],
          },
          {
            url: "/",
            title: "Pedding",
            items: [],
          },
          {
            url: "/",
            title: "Statement",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiShoppingBag size={20} />,
        title: "Sales",
        items: [
          {
            url: "/orders",
            title: "Order's",
            items: [],
          },
          {
            url: "/gr",
            title: "GR's",
            items: [],
          },
          {
            url: "/sales",
            title: "Invoice",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiSettings size={20} />,
        title: "Settings",
        badge: {
          color: "bg-indigo-500 text-white",
          text: 6,
        },
        items: [
          {
            url: "/products",
            title: "Products",
            items: [],
          },
          {
            url: "/customers",
            title: "Customer's",
            items: [],
          },
          {
            url: "/projects",
            title: "Project's",
            items: [],
          },
          {
            url: "/companies",
            title: "Companies",
            items: [],
          },
          {
            url: "/typedoc",
            title: "Type Document",
            items: [],
          },
        ],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
