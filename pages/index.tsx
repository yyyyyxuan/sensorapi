"use client";
import { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import LineGraph from '../components/LineGraph';
ChartJS.register(...registerables);
const Home = (): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://yxuanproject.com/api/getalotsensordata')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (data.length === 0) return <p>No data available</p>;

  const temp = data.map((item) => item.data.temp);
  const time = data.map((item) => new Date(item.time).toLocaleString());
  const PM1 = data.map((item) => item.data.PM1);
  const PM25 = data.map((item) => item.data.PM25);
  const PM10 = data.map((item) => item.data.PM10);
  const humd = data.map((item) => item.data.humd);
  const CH2O = data.map((item) => item.data.CH2O);
  const CO = data.map((item) => item.data.CO);
  const O3 = data.map((item) => item.data.O3);
  const NO2 = data.map((item) => item.data.NO2);

  return(
  <>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={temp} label="Temperature"/>
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={PM1} label="PM1" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={PM25} label="PM25" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={PM10} label="PM10" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={humd} label="Humidity" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={PM1} label="CH2O" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={CO} label="CO" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={O3} label="O3" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={CH2O} label="CH2O" />
    </div>
    <div style={{ width: '800px', height: '400px' }}>
      <LineGraph time={time} data={NO2} label="NO2" />
    </div>
    
    

  </>
  );
  
};

export default Home;
