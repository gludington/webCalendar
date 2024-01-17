import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogTitle, DialogContent, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function ConfirmDialog({ title, open, cancelLabel="Cancel", confirmLabel="Delete", onClose, onConfirm }) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>You cannot undo this action</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => onClose()}>
          {cancelLabel}
        </Button>
        <Button color="secondary" variant="contained" onClick={() => onConfirm()}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};