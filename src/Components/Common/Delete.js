import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Slide } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { forwardRef } from "react";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DeleteModal({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion", 
  message = "Are you sure you want to delete this item?" 
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth 
      TransitionComponent={Transition}
      sx={{
        "& .MuiPaper-root": { 
          borderRadius: 3, 
          boxShadow: 10, 
          padding: 2 
        }
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "error.main" }}>
        <WarningAmberIcon fontSize="large" />
        {title}
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" py={2}>
          <Typography variant="body1" color="textSecondary">
            {message}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="primary" 
          sx={{ minWidth: 120, borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error" 
          sx={{ 
            minWidth: 120, 
            borderRadius: 2, 
            textTransform: "none", 
            fontWeight: "bold",
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#b71c1c" }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
