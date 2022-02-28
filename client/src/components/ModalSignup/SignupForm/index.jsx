import { TextField, Stack } from "@mui/material";

export default function SignupForm({
  error,
  handleSubmit,
  formData,
  setFormData
}) {
  return (
    <form
      autoComplete="off"
      id="signup-form"
      onSubmit={(e) => handleSubmit(e)}
      method="POST"
    >
      <Stack spacing={3}>
        <TextField
          id="outlined-email"
          label="Email"
          name="email"
          value={formData.email}
          required
          type="email"
          color="secondary"
          variant="outlined"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          value={formData.name}
          type="text"
          required
          color="secondary"
          variant="outlined"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <TextField
          id="outlined-password"
          label="Password"
          name="password"
          value={formData.password}
          required
          helperText={error}
          type="password"
          color="secondary"
          variant="outlined"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
      </Stack>
    </form>
  );
}
