/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../components/elements/datatable";
import SectionTitle from "../../../components/elements/section-title";
import Widget from "../../../components/elements/widget";

//Services
import typedocService from "../../../services/typedoc";

export default function Workschedules({ typedoc }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const items = [
    { title: 'Code', element: <text>{typedoc.code}</text> },
    { title: 'Name', element: <text>{typedoc.description}</text> },
    { title: 'Status', element: <text>{typedoc.type}</text> }
  ]

  return (
    <>
      <SectionTitle title="Tables" subtitle={`Type Doc - ${typedoc.code}`} />
      <Widget
        title="Details"
        description={
          <span>
            {typedoc.description}
          </span>
        }
      >
        <div className="table table-auto w-full">
          <div className="table-row-group">
            {items.map((item, i) => (
              <div className="table-row" key={i}>
                <div className="table-cell whitespace-nowrap px-2 text-sm">
                  {item.title}
                </div>
                <div className="table-cell px-2 whitespace-normal">
                  {item.element}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Widget>
    </>
  );
}


export const getServerSideProps = async (ctx) => {

  const { 'attendance.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { id } = ctx.params;

  const typedoc = await typedocService.get_TypeDoc(id);

  return {
    props: {
      typedoc
    }
  };

};
