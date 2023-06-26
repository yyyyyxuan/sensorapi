import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Button } from '@mui/material';
import dayjs from 'dayjs';

export default function DateRangePicker() {
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };

  const shouldDisableDate = (date) => {
    if (selectedFromDate) {
      // Disable dates before the selected "From" date and dates after the selected "From" date
      return date.isBefore(selectedFromDate, 'day') || date.isAfter(selectedFromDate, 'day');
    }
    return false;
  };

  const handleSubmit = () => {
    const data = {
      fromDate: selectedFromDate.format('YYYY-MM-DD'),
      toDate: selectedToDate.format('YYYY-MM-DD'),
    };
    console.log(data); // You can replace this with your API call to post the JSON data
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <DatePicker
            label="From"
            value={selectedFromDate}
            onChange={handleFromDateChange}
          />
        </Grid>
        <Grid item xs={1}>
          <DatePicker
            label="To"
            value={selectedToDate}
            onChange={handleToDateChange}
            shouldDisableDate={shouldDisableDate}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
