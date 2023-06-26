"use client";

import  styles from '../styles/Graph.module.css'
import { useState, useEffect } from 'react';
import { Chart as ChartJS, DateAdapter, registerables } from 'chart.js';

import LineGraph from './LineGraph';
ChartJS.register(...registerables);
const Graph = (): JSX.Element => {
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
  const CO2 = data.map((item) => item.data.CO2);
  const VOC = data.map((item) => item.data.VOC);

  return(
  <>

  <div className={styles.row}>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={PM1} dp="0" unit=" ug/m3" label="PM1" />
    </div>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={PM25} dp="0" unit=" ppm" label="PM2.5" />
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={PM10} dp="0" unit=" ug/m3" label="PM10" />
    </div>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={CO2} dp="0" unit=" ppm" label="CO2" />
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.rowitem}>
      <LineGraph 
        time={time}
        data={VOC}
        dp="0"
        maxTicksLimit="1" 
        unit=" grade" 
        label="VOC" />
    </div>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={temp} dp="1" unit=" °C" label="Temperature" />
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={humd} dp="0" unit=" %" label="Humidity" />
    </div>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={CH2O} dp="3" unit=" mg/m3" label="CH2O" />
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={CO} dp="1" unit=" ppm" label="CO" />
    </div>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={O3} dp="2" unit=" ppm" label="O3" />
    </div>
  </div>
  <div className={styles.row}>
    <div className={styles.rowitem}>
      <LineGraph time={time} data={NO2} dp="2" unit=" ppm" label="NO2" />
    </div>
  </div>    
    

  </>
  );
  
};

export default Graph;
