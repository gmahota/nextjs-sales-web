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
    title: "Sistema de Cabimentação",
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
        title: "Compras",
        items: [
          {
            url: "/buget",
            title: "Por Aprovar",
            items: [],
          }
        ],
      }
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
