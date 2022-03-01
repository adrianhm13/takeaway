import { TextField, Stack } from "@mui/material";

export default function LoginForm({
  formData,
  setFormData,
  error,
  handleSubmit,
}) {
  return (
    <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
      <Stack spacing={3}>
        <TextField
          id="outlined-email"
          label="Email"
          value={formData.username}
          required
          type="email"
          color="secondary"
          variant="outlined"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <TextField
          id="outlined-password"
          label="Password"
          value={formData.password}
          required
          type="password"
          color="secondary"
          variant="outlined"
          helperText={error}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </Stack>
    </form>
  );
}
