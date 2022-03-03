import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as Style from "./style";
import SignupForm from "./SignupForm";

const initialData = {
  firstName: "",
  lastName: "",
  dateBirth: "",
  password: "",
  email: "",
  street: "",
  zipCode: "",
  town: "",
  phone: "",
};

export default function ModalSignup({ onOpenSignup, openSignup }) {
  const [formData, setFormData] = useState(initialData);

  const { error, signup } = useSignup();

  const handleClose = () => onOpenSignup(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(formData);
    if (data.ok) {
      onOpenSignup(false);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openSignup}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={openSignup}>
        <Box sx={Style.ModalContent}>
          <Typography
            id="transition-modal-title"
            variant="h5"
            component="h2"
            marginBottom={4}
          >
            Signup to get special discounts and follow your orders
          </Typography>
          <SignupForm
            formData={formData}
            setFormData={setFormData}
            error={error}
            handleSubmit={handleSubmit}
          />
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            color="secondary"
            type="submit"
            form="signup-form"
          >
            Signup
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
