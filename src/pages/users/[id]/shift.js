import React from 'react';
import workService from "../../../services/workschedule"
import shiftService from "../../../services/workschedule"

export default function Index({workschedule,shift,allUsers}) {

  return(
    <>Ola Mundo</>
  )

}

export const getServerSideProps = async (context) => {
  const { id, shift } = context.params;

  const workschedule = await workService.get_Workschedule(id[0]);

  const shiftOld = await shiftService.get_Shift(shift[0]);

  return {
    props: {
      workschedule: workschedule,
      shift: shiftOld,
    },
  };
};
