import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/DatePicker.module.css';
import dayjs from 'dayjs';
import Graph from './Graph';

export default function DateRangePicker() {
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [isLoading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState({});

  const handleFromDateChange = (date:any) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date:any) => {
    setSelectedToDate(date);
  };

  const shouldDisableToDate = (date:any) => {
    const today = dayjs().startOf('day');
    return date.isAfter(today, 'day') || date.isBefore(selectedFromDate, 'day');
  };

  const isSubmitDisabled = selectedToDate.isBefore(selectedFromDate, 'day');


  const handleSubmit = async (e:any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      fromDate: selectedFromDate.format('YYYY-MM-DD'),
      toDate: selectedToDate.format('YYYY-MM-DD'),
    };
  //http://localhost:3001/api/getdatedata
  //https://yxuanproject.com/api/getdatedata
    const response = await fetch('https://yxuanproject.com/api/getdatedata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const jsonResponse = await response.json();
    setJsonData(jsonResponse);
    setLoading(false);

  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.pickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <DatePicker
              label="From"
              value={selectedFromDate}
              onChange={handleFromDateChange}
              disableFuture
            />
          </div>
          <div>
            <DatePicker
              label="To"
              value={selectedToDate}
              onChange={handleToDateChange}
              disableFuture
              shouldDisableDate={shouldDisableToDate}
              
            />
          </div>
        </LocalizationProvider>
      </div>
      <div className={styles.submitButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={styles.submitButton}
          disabled={isSubmitDisabled}
          endIcon={
            isLoading ? (
              <div style={{ width: '20px', height: '20px' }}>
                <CircularProgress color="inherit" style={{ width: '100%', height: '100%', display: 'flex' }} />
              </div>
            ) : (
              <SendIcon />
            )
          }
          >
          Submit
        </Button>
      </div>
    </div>

    <Graph jsonData={jsonData}/>
    </>
  );
}
