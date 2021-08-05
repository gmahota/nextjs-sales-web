import React from 'react';
import { parseCookies } from "nookies";
import ShiftService from "../../../services/shift"

export default function Shifts({ shift }) {
    return (<div>
        </div>);
}

export const getServerSideProps = async (ctx) => {
  try {

    const { "attendance.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

    const { id } = ctx.params;

    const shift = await ShiftService.get_Shift(id[0]);

    return {
      props: {
        shift: shift,
      },
    };
  } catch (e) {
    console.log(e);

    return {
      props: {
        shift: null,
      },
    };
  }
};
