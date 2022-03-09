// Components
import { TextField, Stack } from "@mui/material";

// Types
import { LoginRequest } from "../../../features/api/apiSlice.types";

type LoginFormProps = {
  formData: LoginRequest;
  setFormData: React.Dispatch<React.SetStateAction<LoginRequest>>;
  error: string | undefined;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function LoginForm({
  formData,
  setFormData,
  error,
  handleSubmit,
}: LoginFormProps) {
  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          id="outlined-email"
          label="Email"
          value={formData.email}
          required
          type="email"
          color="secondary"
          variant="outlined"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          id="outlined-password"
          label="Password"
          value={formData.password}
          required
          type="password"
          color="secondary"
          helperText={error}
          variant="outlined"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </Stack>
    </form>
  );
}
