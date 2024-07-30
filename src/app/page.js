'use client'

import Card from "../components/card";
import { useEffect, useState } from "react";
import BarChartCard from "../components/bar-chart-card";


export default function Home() {
  const [data, setData] = useState({})

  useEffect(() => {
    async function fetchData() {
        try {
            const resp = await fetch('/api/data');
            const data = await resp.json();
            console.log(data)
            console.log(data?.age)
            setData(data)
        } catch (e) {
            console.log(e);
        }
    }
    fetchData();
}, [])

  return (
    <main className="flex flex-col items-center justify-center h-min-screen">
      <div className="mt-8 w-3/4">
        <Card 
          title={'Welcome to the Secure Census System!'}
          subtitle={`This website aims to implement an online census system with a focus on cybersecurity. 
                    Featuring things such as data encryption, audit logging, access control policies, and more. 
                    Below are a few examples of the statistics derived from the response data, aggregated for anonymity and confidentiality. `}
          body={null}
        />
      </div>
      <div className="flex w-3/4">
        <Card 
          title={'Number of Submissions'}
          subtitle={''}
          body={<h1 className="text-blue-400 text-2xl">{data?.submissions || 0}</h1>}
        />
        <Card 
          title={''}
          subtitle={''}
          body={null}
        />
      </div>
      <div className="flex w-3/4 justify-center flex-">
        <BarChartCard 
          title={'Age'}
          subtitle={'Breakdown of different ages declared in all responses'}
          labels={data?.age ? Object.keys(data?.age) : undefined}
          data={data?.age ? Object.values(data?.age) : undefined}
          datasetLabel={'Percentage of respondents'}
        />
        <BarChartCard 
          title={'Gender'}
          subtitle={'Breakdown of different genders declared in all responses'}
          labels={data?.gender ? Object.keys(data?.gender) : undefined}
          data={data?.gender ? Object.values(data?.gender) : undefined}
          datasetLabel={'Percentage of respondents'}
        />
      </div>
      <div className="mb-8 w-3/4">
        <BarChartCard 
            title={'Ethnicity'}
            subtitle={'Breakdown of different ethnicities declared in all responses'}
            labels={data?.ethnicity ? Object.keys(data?.ethnicity) : undefined}
            data={data?.ethnicity ? Object.values(data?.ethnicity) : undefined}
            datasetLabel={'Percentage of respondents'}
        />
      </div>
    </main>
  );
}
