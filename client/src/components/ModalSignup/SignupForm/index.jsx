import { TextField, Stack } from "@mui/material";


export default function SignupForm(props) {
  return (
    <form
      autoComplete="off"
      id="login-form"
      onSubmit={(e) => props.handleSubmit(e)}
    >
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
          id="outlined-name"
          label="Name"
          value={props.name}
          type="text"
          required
          color="secondary"
          variant="outlined"
          onChange={(e) => props.setName(e.target.value)}
        />
        <TextField
          id="outlined-password"
          label="Password"
          value={props.password}
          required
          helperText={props.error}
          type="password"
          color="secondary"
          variant="outlined"
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </Stack>
    </form>
  );
}
