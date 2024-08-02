import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import ActivityChart from './ActivityChart';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

interface TotalActivityData {
  label: string;
  count: number;
  fillColor: string;
}

interface DayWiseActivityData {
  date: string;
  label: string;
  count: number;
}

interface TransformDataResult {
  totalActivityData: { [key: string]: TotalActivityData[] };
  dayWiseActivityData: DayWiseActivityData[];
  userNames: string[];
}

const transformData = (data: any): TransformDataResult => {
  const totalActivityData: { [key: string]: TotalActivityData[] } = {};
  const dayWiseActivityData: DayWiseActivityData[] = [];
  const userNames: string[] = [];

  data.data.AuthorWorklog.rows.forEach((row: any) => {
    userNames.push(row.name);

    totalActivityData[row.name] = row.totalActivity.map((activity: any) => ({
      label: activity.name,
      count: Number(activity.value),
      fillColor: data.data.AuthorWorklog.activityMeta.find((meta: any) => meta.label === activity.name).fillColor,
    }));

    row.dayWiseActivity.forEach((day: any) => {
      day.items.children.forEach((activity: any) => {
        dayWiseActivityData.push({
          date: day.date,
          label: activity.label,
          count: Number(activity.count),
        });
      });
    });
  });

  return { totalActivityData, dayWiseActivityData, userNames };
};

const Dashboard: React.FC = () => {
  const [totalActivityData, setTotalActivityData] = useState<{ [key: string]: TotalActivityData[] }>({});
  const [dayWiseActivityData, setDayWiseActivityData] = useState<DayWiseActivityData[]>([]);
  const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        const transformedData = transformData(fetchedData);
        setTotalActivityData(transformedData.totalActivityData);
        setDayWiseActivityData(transformedData.dayWiseActivityData);
        setUserNames(transformedData.userNames);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, []);

  return (
    <DashboardContainer>
      <ActivityChart
        totalActivityData={totalActivityData}
        dayWiseActivityData={dayWiseActivityData}
        userNames={userNames}
      />
    </DashboardContainer>
  );
};

export default Dashboard;



