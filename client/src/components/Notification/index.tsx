import { useState } from "react";

// Components
import Snackbar from "@mui/material/Snackbar";

export default function Notification({
  message,
}: {
  message: string | undefined;
}) {
  const [open, setOpen] = useState(true);

  const handleClose = (event: Event | React.SyntheticEvent<any, Event>) => {
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={message}
        onClose={handleClose}
      />
    </div>
  );
}
