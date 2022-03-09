// Types
import { RegisterRequest } from "../../../features/api/apiSlice.types";

// Components
import { TextField, Grid } from "@mui/material";



type SignupFormProps = {
  error: string | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData: RegisterRequest
  setFormData: React.Dispatch<React.SetStateAction<RegisterRequest>>;
};

export default function SignupForm({
  error,
  handleSubmit,
  formData,
  setFormData,
}: SignupFormProps) {
  return (
    <form
      autoComplete="off"
      id="signup-form"
      onSubmit={(e) => handleSubmit(e)}
      method="POST"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="outlined-firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            type="text"
            required
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            type="text"
            required
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-dateBirth"
            label="Date of birth"
            name="dateBirth"
            value={formData.dateBirth}
            InputLabelProps={{ shrink: true }}
            required
            type="date"
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, dateBirth: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="outlined-phone"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            required
            type="tel"
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-street"
            label="Street"
            name="street"
            value={formData.street}
            required
            type="text"
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoComplete="off"
            fullWidth
            id="outlined-town"
            label="Town"
            name="town"
            value={formData.town}
            required
            type="text"
            color="secondary"
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, town: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoComplete="off"
            fullWidth
            id="outlined-zipCode"
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            required
            type="text"
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-email"
            label="Email"
            name="email"
            value={formData.email}
            required
            type="email"
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-password"
            label="Password"
            name="password"
            value={formData.password}
            required
            helperText={error}
            type="password"
            color="secondary"
            variant="outlined"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
