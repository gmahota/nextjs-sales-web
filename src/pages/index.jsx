
import React  from 'react'
import SectionTitle from "../components/elements/section-title";
import Widget1 from "../components/elements/dashboard/widget-1";
import Section from "../components/elements/dashboard/section";
import { FiActivity, FiUsers, FiExternalLink, FiClock } from "react-icons/fi";
import { Bar1 } from "../components/elements/dashboard/bar-chart";
import { Donut1 } from "../components/elements/dashboard/donut-chart";
import { Line1 } from "../components/elements/dashboard/line-chart";
import Dropdown1 from "../components/elements/widgets/dropdown-1";
import Markets from "../components/elements/dashboard/markets";
import { List } from "../components/elements/dashboard/list";
import Tasks from "../components/elements/tasks";
import { Timeline1 } from "../components/elements/timelines";
import Notification from "../components/elements/dashboard/notification";
import { parseCookies } from 'nookies'

const Index = () => {
  return (
    <>
      <Notification />
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Aprovações"
            description={"6 M"}
            right={
              <FiUsers size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Desvios"
            description={"8 M"}
            right={
              <FiActivity size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Perentagem de Desvio"
            description="15.0%"
            right={
              <FiExternalLink
                size={24}
                className="stroke-current text-gray-500"
              />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Orçamentado Pendente"
            description="20 M"
            right={
              <FiClock size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <div className="w-full lg:w-2/3">
          <Section
            title="Aprovações"
            description={<span>2020</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Bar1 />
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/3">
          <Section
            title="Desvios"
            description={<span>Por Tipo</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Donut1 />
            </div>
          </Section>
        </div>
      </div>

      <div className="w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        <Section
          title="Orçamento Usado"
          description={"Por Centro de Custo"}
        >
          <div className="flex flex-col w-full">
            <div className="overflow-x-scroll lg:overflow-hidden">
              <Markets />
            </div>
          </div>
        </Section>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

        <div className="w-full">
          <Section
            title="Compras"
            description={<span>This month</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Line1 />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps= async (ctx) => {
  const { 'attendance.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  //await apiClient.get('/users')

  return {
    props: {}
  }
}

export default Index;
