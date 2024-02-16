import { Box, Button, Dialog, DialogContent } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store/store';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
function DeleteContainer() {
  const { showDeleteAlert } = useSelector((state: RootState) => state.App);
  return (
    <Dialog open={showDeleteAlert} id="deleteDialog" maxWidth={'xl'}>
      <DialogContent>
        <Box>
          <div className=" flex flex-col gap-5 items-center justify-center">
            <img src="/deleteAlert.svg" alt="" className=" max-h-[100px]" />

            <span className=" text-xl text-center flex flex-col gap-1 items-center justify-center">
              <span>
                Sind Sie sicher, dass Sie diese Elemente löschen möchten?
              </span>
            </span>
            <div className=" flex items-center justify-center gap-3">
              <Button
                sx={{ minWidth: 90 }}
                startIcon={<CheckIcon />}
                id="deleteConfirm"
              >
                Ja
              </Button>
              <ErrorButton
                sx={{ minWidth: 90 }}
                startIcon={<CloseIcon />}
                id="deleteDecline"
              >
                NEIN
              </ErrorButton>
            </div>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteContainer;
