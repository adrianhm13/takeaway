import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useLogin } from "../../hooks/useLogin";

import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import * as Styled from "./style";
import LoginForm from "./LoginForm";
import Icon from "./icon";

export default function ModalLogin({ openLogin, onOpenLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, error } = useLogin();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  // Google access
  const googleSuccess = async (res) => {
    const user = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { user, token } });
      onOpenLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
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
          <Stack>
            <Button
              sx={{ marginTop: 1 }}
              variant="contained"
              color="secondary"
              type="submit"
              form="login-form"
            >
              LOGIN
            </Button>
            <GoogleLogin
              clientId="464067187874-g5r9mtjq5fbjlku5ubassc3snbe15koh.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  sx={{ marginTop: 1 }}
                  variant="contained"
                  color="secondary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                >
                  GOOGLE SIGN IN
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
