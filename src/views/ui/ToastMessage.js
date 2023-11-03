import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { MAPPING_TOAST } from '../../utils/Constant';

export default function ToastMessage(props) {
  let [status, value] = ["error", "not found."]
  const mapToast = MAPPING_TOAST[props.data.key];
  if (mapToast && mapToast.length > 0) {
    status = mapToast[0];
    value = mapToast[1];
  }
  if (props.data.customMessage) {
    value = props.data.customMessage.value;
  }
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpen(false);
  };
  useEffect(() => {
    // Set state
    setIsOpen(props.data.isOpen)
  },[props])

  return (
    <Stack sx={{ zIndex: 9999, position: 'fixed', right: 0 }}>
      <Snackbar sx={{position: 'unset'}} open={isOpen} onClose={handleClose} autoHideDuration={2000} >
        <Alert severity={status}>{value}</Alert>
      </Snackbar>
    </Stack>
  );
}