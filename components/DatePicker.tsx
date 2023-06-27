import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/DatePicker.module.css';
import dayjs from 'dayjs';
import Graph from './Graph';

export default function DateRangePicker() {
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [jsonData, setJsonData] = useState<any | null>(null);

  const handleFromDateChange = (date:any) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date:any) => {
    setSelectedToDate(date);
  };

  const shouldDisableFromDate = (date:any) => {
    const today = dayjs().startOf('day');
    return date.isAfter(today, 'day');
  };

  const shouldDisableToDate = (date:any) => {
    const today = dayjs().startOf('day');
    return date.isAfter(today, 'day') || date.isBefore(selectedFromDate, 'day');
  };

  const isSubmitDisabled = selectedToDate.isBefore(selectedFromDate, 'day');


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('clicked');
    const data = {
      fromDate: selectedFromDate.format('YYYY-MM-DD'),
      toDate: selectedToDate.format('YYYY-MM-DD'),
    };
  
    const response = await fetch('http://localhost:3001/api/getdatedata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const jsonResponse = await response.json();
    setJsonData(jsonResponse);

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
          size="large"
          className={styles.submitButton}
          disabled={isSubmitDisabled}
          endIcon={<SendIcon />
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
