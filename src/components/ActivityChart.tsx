import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController
);

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

interface Props {
  totalActivityData: { [key: string]: TotalActivityData[] };
  dayWiseActivityData: DayWiseActivityData[];
  userNames: string[];
}

const ActivityChart: React.FC<Props> = ({ totalActivityData, dayWiseActivityData, userNames }) => {
  const [selectedUser, setSelectedUser] = useState<string>(userNames[0] || '');

  useEffect(() => {
    if (userNames.length > 0) {
      setSelectedUser(userNames[0]);
    }
  }, [userNames]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  if (!userNames.length) {
    return <p>No users available.</p>;
  }


  const aggregateTotals = userNames.reduce((acc, userName) => {
    const userData = totalActivityData[userName] || [];
    userData.forEach(item => {
      if (acc[item.label]) {
        acc[item.label] += item.count;
      } else {
        acc[item.label] = item.count;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const userTotalActivityData = totalActivityData[selectedUser] || [];

  
  const barChartData: ChartData<'bar'> = {
    labels: userTotalActivityData.map(item => item.label),
    datasets: [{
      label: 'Total Activities',
      data: userTotalActivityData.map(item => item.count),
      backgroundColor: userTotalActivityData.map(item => item.fillColor),
      borderColor: userTotalActivityData.map(() => '#000000'),
      borderWidth: 1,
    }],
  };

  
  const lineChartData: ChartData<'line'> = {
    labels: Array.from(new Set(dayWiseActivityData.map(item => item.date))),
    datasets: Array.from(new Set(dayWiseActivityData.map(item => item.label))).map((activityLabel, index) => {
      const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
      return {
        label: activityLabel,
        data: dayWiseActivityData
          .filter(item => item.label === activityLabel)
          .map(item => item.count),
        fill: false,
        borderColor: colors[index % colors.length],
      };
    }),
  };

  const barOptions: ChartOptions<'bar'> = {
    indexAxis: 'x',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Activity',
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
  };

  const lineOptions: ChartOptions<'line'> = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 style={{ color: '#433D8B',fontFamily: 'Inter', marginTop: '-3px' }}>Activities Highlights</h2>
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          gap: '10px',
          justifyContent: 'center',
        }}>
          {Object.entries(aggregateTotals).map(([label, count]) => (
            <div key={label} style={{
              border: '1px solid #ddd',
              borderRadius: '6px',
              padding: '5px',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
              flex: '0 1 200px',
              textAlign: 'left',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              fontFamily: 'Inter',
              height: 70
            }}>
              <h3 style={{marginLeft: '0.5rem',fontSize:'13px', color: '#433D8B',fontWeight: '500', marginBottom: '-5px'}}>{`Total ${label}`}</h3>
              <p style={{ marginLeft: '1rem', fontSize:'20px',  fontWeight: 'bolder' }}>{count}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 style={{ color: '#433D8B',fontFamily: 'Inter', marginTop: '2rem' }}>Developer Activities Logs</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ marginRight: '10px', fontSize: '16px',fontFamily: 'Inter' }}>User :</span>
        <select onChange={handleUserChange} value={selectedUser} style={{ padding: '5px', fontSize: '16px', borderRadius: '8px', borderColor:'#433D8B' }}>
          {userNames.map(userName => (
            <option key={userName} value={userName}>
              {userName}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div style={{ flex: 1, position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset', backgroundColor: '#fff', borderRadius: '6px', padding: '15px' }}>
          <h2 style={{ marginLeft: '1rem', color: '#433D8B',fontFamily: 'Inter' }}>Activities</h2>
          <Bar data={barChartData} options={barOptions} />
        </div>
        <div style={{ flex: 1, position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset', backgroundColor: '#fff', borderRadius: '6px', padding: '15px' }}>
          <h2 style={{ marginLeft: '1rem', color: '#433D8B',fontFamily: 'Inter' }}>Activity Duration over Time</h2>
          <Line data={lineChartData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
















