import { Box, TextField, Grid } from "@mui/material";
import { FormData } from "./Form";
import * as React from "react";

export default function StepOne({
  formData,
  errors,
  handleChange,
  handleBlur,
}: {
  formData: FormData;
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={formData.firstName}
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            name="firstName"
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            onBlur={handleBlur}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={formData.lastName}
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            name="lastName"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <TextField
        value={formData.email}
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        name="email"
        error={Boolean(errors.email)}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.email}
      />
      <TextField
        value={formData.phone}
        label="Phone number"
        type="tel"
        variant="outlined"
        fullWidth
        name="phone"
        error={Boolean(errors.phone)}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.phone}
      />
    </Box>
  );
}
