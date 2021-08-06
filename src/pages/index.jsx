
import React  from 'react'
import SectionTitle from "../components/elements/section-title";
import { parseCookies } from 'nookies'

const Index = () => {
  return (
    <>
      <SectionTitle title="Overview" subtitle="Dashboard" />

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
