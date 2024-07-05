import { Box, Grid, TextField } from "@mui/material";
import * as React from "react";
import { FormData } from "./Form";

export default function StepTwo({
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
      <TextField
        value={formData.addressLineOne}
        label="Address Line 1"
        type="text"
        variant="outlined"
        name="addressLineOne"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.addressLineOne)}
        helperText={errors.addressLineOne}
        fullWidth
      />
      <TextField
        value={formData.addressLineTwo}
        label="Address Line 2"
        type="text"
        variant="outlined"
        name="addressLineTwo"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.addressLineTwo)}
        helperText={errors.addressLineTwo}
        fullWidth
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            value={formData.state}
            label="State"
            type="text"
            variant="outlined"
            name="state"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.state)}
            helperText={errors.state}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            value={formData.city}
            label="City"
            type="text"
            variant="outlined"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.city)}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            value={formData.zipCode}
            label="Zip Code"
            type="text"
            variant="outlined"
            name="zipCode"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.zipCode)}
            helperText={errors.zipCode}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
