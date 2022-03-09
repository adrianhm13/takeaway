import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useRegisterUserMutation } from "../../features/api/apiSlice";
import {
  saveProfileLocal,
  setCredentials,
} from "../../features/auth/authSlice";

// Types
import { RegisterRequest } from "../../features/api/apiSlice.types";

// Components
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SignupForm from "./SignupForm";

// Styles
import * as Style from "./style";

const initialData: RegisterRequest = {
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

type ModalSignupProps = {
  onOpenSignup: React.Dispatch<React.SetStateAction<boolean>>;
  openSignup: boolean;
};

export default function ModalSignup({
  onOpenSignup,
  openSignup,
}: ModalSignupProps) {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState<string | null>(null);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await registerUser(formData).unwrap();
      dispatch(setCredentials(user));
      dispatch(saveProfileLocal(user));
    } catch (error) {
      setError(error.data.errorMessage);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openSignup}
      onClose={() => onOpenSignup(false)}
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
            {isLoading ? "Registering..." : "Signup"}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
