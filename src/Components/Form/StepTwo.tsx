import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import { FormData } from "./Form";

export default function StepTwo({
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
    if (name === "addressLineOne" && !value) {
      errorMsg = "Address Line 1 is required.";
    }
    if (name === "addressLineTwo" && !value) {
      errorMsg = "Address Line 2 is required.";
    }
    if (name === "city" && !value) {
      errorMsg = "City is required.";
    }
    if (name === "state" && !value) {
      errorMsg = "State is required.";
    }
    if (name === "zipCode" && (!value || !/^[0-9]{6}$/.test(value))) {
      errorMsg = "Please enter a valid 6-digit ZIP code.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  React.useEffect(() => {
    const isValidFormData = () => {
      return (
        formData.addressLineOne &&
        formData.addressLineTwo &&
        formData.city &&
        formData.state &&
        formData.zipCode &&
        /^[0-9]{6}$/.test(formData.zipCode)
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

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div>
      <Stack spacing={2} marginBottom={2}>
        <TextField
          value={formData.addressLineOne}
          label="Address Line 1"
          type="text"
          variant="outlined"
          name="addressLineOne"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            validateField(e.target.name, e.target.value);
          }}
          onBlur={handleBlur}
          error={Boolean(errors.addressLineOne)}
          helperText={errors.addressLineOne}
        />
        <TextField
          value={formData.addressLineTwo}
          label="Address Line 2"
          type="text"
          variant="outlined"
          name="addressLineTwo"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            validateField(e.target.name, e.target.value);
          }}
          onBlur={handleBlur}
          error={Boolean(errors.addressLineTwo)}
          helperText={errors.addressLineTwo}
        />
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <TextField
            value={formData.city}
            label="City"
            type="text"
            variant="outlined"
            name="city"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            error={Boolean(errors.city)}
            helperText={errors.city}
          />
          <TextField
            value={formData.state}
            label="State"
            type="text"
            variant="outlined"
            name="state"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            error={Boolean(errors.state)}
            helperText={errors.state}
          />
          <TextField
            value={formData.zipCode}
            label="Zip Code"
            type="text"
            variant="outlined"
            name="zipCode"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            onBlur={handleBlur}
            error={Boolean(errors.zipCode)}
            helperText={errors.zipCode}
          />
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button variant="contained" onClick={handlePrev}>
          Prev
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={disableNext}>
          Next
        </Button>
      </Stack>
    </div>
  );
}
