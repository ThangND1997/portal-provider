import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectItems(props) {
  console.log(props);
  const [age, setAge] = React.useState("revenue");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  props.reportType(age);
  return (
    <FormControl sx={{marginTop: 2, minWidth: 160 }} size="">
      <InputLabel id="demo-select-small-label">Kiểu báo cáo</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Kiểu-báo-cáo"
        onChange={handleChange}
      >
        <MenuItem value={"revenue"}>Theo doanh thu</MenuItem>
        <MenuItem value={"quantity"}>Theo số lượng</MenuItem>
      </Select>
    </FormControl>
  );
}