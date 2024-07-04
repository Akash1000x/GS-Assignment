import { Box, Button, Stack, TextField } from "@mui/material";
import { FormData } from "./Form";
import * as React from "react";

export default function StepOne({
  formData,
  setFormData,
  setStep,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [disableNext, setDisableNext] = React.useState<boolean>(true);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === "firstName" && !value) {
      errorMsg = "Name is required";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMsg = "Please enter a valid email address.";
    } else if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
      errorMsg = "Please enter a valid phone number.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  React.useEffect(() => {
    const isValidFormData = () => {
      return (
        formData.firstName &&
        formData.email &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        formData.phone &&
        /^[0-9]{10}$/.test(formData.phone)
      );
    };

    if (isValidFormData()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [formData]);

  React.useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [setFormData]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Box className="stepOne">
      <form>
        <Stack spacing={2} marginBottom={2}>
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <TextField
              value={formData.firstName}
              label="First Name"
              type="text"
              variant="outlined"
              fullWidth
              name="firstName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                validateField(e.target.name, e.target.value);
              }}
              error={Boolean(errors.firstName)}
              onBlur={handleBlur}
              helperText={errors.firstName}
            />
            <TextField
              value={formData.lastName}
              label="Last Name"
              type="text"
              variant="outlined"
              fullWidth
              name="lastName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                validateField(e.target.name, e.target.value);
              }}
            />
          </Stack>
          <TextField
            value={formData.email}
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            error={Boolean(errors.email)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            helperText={errors.email}
          />
          <TextField
            value={formData.phone}
            label="Phone number"
            type="tel"
            variant="outlined"
            name="phone"
            error={Boolean(errors.phone)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            helperText={errors.phone}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button variant="contained" onClick={handleNext} disabled={disableNext}>
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
