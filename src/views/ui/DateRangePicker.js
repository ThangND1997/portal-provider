import {memo, useEffect, useState} from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as momentTz from 'moment-timezone';

const DateRangePickerPage = (props) => {
  const [value, setValue] = useState(momentTz().startOf("days"));
  useEffect(() => {
    props.dateRangePicker([value.clone().toISOString(), value.clone().add(23, "hours").toISOString()]);
  }, [value])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
          format="DD/MM/YYYY"
          label="Lọc theo ngày" 
          onChange={(e) => setValue(momentTz(e.$d))}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default memo(DateRangePickerPage)