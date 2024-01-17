import { forwardRef, useEffect, useState } from "react";
import { Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert"

const Alert = forwardRef((props, ref) => {
    return <MuiAlert ref={ref} variant="filled" {...props} />
})

export default function SnackbarAlert({ message, open, duration = 6000, elevation = 6, severity, onClose }) {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert severity={severity} elevation={elevation}>{message}</Alert>
        </Snackbar>
    )
}