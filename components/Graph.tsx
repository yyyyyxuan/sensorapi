"use client";
import  styles from '../styles/Graph.module.css'
import { useState, useEffect } from 'react';
import { Chart as ChartJS, DateAdapter, registerables } from 'chart.js';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import LineGraph from './LineGraph';

interface GraphProps {
  jsonData: any;
}


ChartJS.register(...registerables);
const Graph: React.FC<GraphProps> = ({ jsonData }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState<any[]>([]);
//http://localhost:3001/api/getalotsensordata
//https://yxuanproject.com/api/getalotsensordata
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/api/getalotsensordata')
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


  useEffect(() => {
    setUpdatedData(jsonData);
    if (updatedData !== null) {
      setData(jsonData);
    }
  }, [jsonData]);


  if (isLoading) {
    return (
      <div className={styles.loadingDiv}>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <b>Loading</b>
          <CircularProgress
            color="inherit"
            style={{
              padding: "10px",
              width: "20px",
              height: "20px"
            }}
          />
        </Typography>
      </div>
    );
  }

  ;
  if (data.length === 0) return <div className={styles.loadingDiv}><p><b>No data available</b></p></div>;

  
  const temp = data.map((item) => item.data.temp);
  const time = data.map((item) => {
    const dateTime = dayjs(item.time).format('DD/MM/YYYY, h:mm:ss A');
    return dateTime;
  });
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
            <LineGraph  time={time} data={PM1} dp="0" unit=" ug/m3" label="PM1" options={{ maintainAspectRatio: false }} />
            </div>
            <div className={styles.rowitem}>
            <LineGraph time={time} data={PM25} dp="0" unit=" ppm" label="PM2.5" options={{ maintainAspectRatio: false }} />
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
  )
  
};

export default Graph;
