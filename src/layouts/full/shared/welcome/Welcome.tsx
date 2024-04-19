// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const Welcome = (props:any) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  React.useEffect(() => {
    // Update the document title using the browser API
    const timer = setTimeout(() => {
      handleClick();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={props.type}
          variant="filled" 
          sx={{ width: '100%', color: props.color }}
        >
          <AlertTitle>{props.title}</AlertTitle>
          {props.subtitle}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Welcome;
