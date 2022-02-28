import { TextField, Stack } from "@mui/material";

export default function LoginForm(props) {
  return (
    <form id="login-form" onSubmit={(e) => props.handleSubmit(e)}>
      <Stack spacing={3}>
        <TextField
          id="outlined-email"
          label="Email"
          value={props.email}
          required
          type="email"
          color="secondary"
          variant="outlined"
          onChange={(e) => props.setEmail(e.target.value)}
        />
        <TextField
          id="outlined-password"
          label="Password"
          value={props.password}
          required
          type="password"
          color="secondary"
          variant="outlined"
          helperText={props.error}
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </Stack>
    </form>
  );
}
