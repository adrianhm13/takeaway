import { useEffect, useState } from "react";

import { Backdrop, Box, Modal, Fade, Typography, Button } from "@mui/material";
import * as Styled from "./style";
import LoginForm from "./LoginForm";
import { useLogin } from "../../hooks/useLogin";

export default function ModalLogin(props) {
  const { openLogin, onOpenLogin } = props;

  const [formData, setFormData] = useState({ username: "", password: "" });

  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.ok) {
      onOpenLogin(false);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openLogin}
      onClose={() => onOpenLogin(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={openLogin}>
        <Box sx={Styled.ModalLoginContent}>
          <Typography
            id="transition-modal-title"
            variant="h5"
            component="h2"
            marginBottom={4}
          >
            Welcome back
          </Typography>
          <LoginForm
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
            form="login-form"
          >
            LOGIN
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
