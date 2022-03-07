import { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../features/api/apiSlice";
import { LoginRequest } from "../../features/api/apiSliceTypes";
import { setCredentials } from "../../features/auth/authSlice";

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

type ModalLoginProps = {
  openLogin: boolean;
  onOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalLogin(props: ModalLoginProps) {
  const { openLogin, onOpenLogin } = props;
  const [error, setError] = useState<string | undefined>("");
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // Login with email and password
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData).unwrap();
      console.log(user);
      dispatch(setCredentials(user));
    } catch (error) {
      setError(error.data.errorMessage);
    }
  };

  // Google access
  const googleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    let user;
    let token;
    if ("profileObj" && "tokenId" in response) {
      user = response.profileObj;
      token = response.tokenId;
    }
    try {
      dispatch({ type: "AUTH", data: { user, token } });
      onOpenLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error: GoogleLoginResponse) => {
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
