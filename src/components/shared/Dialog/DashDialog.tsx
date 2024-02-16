import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
function DashDialog({
  open,
  handleClose,
  title,
  body,
}: {
  body: JSX.Element;
  open: boolean;
  handleClose: () => any;
  title: string | JSX.Element;
}) {
  return (
    <Dialog maxWidth={'md'} fullWidth open={open} component={'div'}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box>
          <div className=" mt-3">{body}</div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DashDialog;
