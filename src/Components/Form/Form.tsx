import { Box, Card, CardContent, Stepper, Step, StepLabel, Button, Stack } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import FinalStep from "./FinalStep";
import * as React from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  addressLineOne: string;
  addressLineTwo: string;
  phone: string;
  state: string;
  city: string;
  zipCode: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  addressLineOne: "",
  addressLineTwo: "",
  phone: "",
  state: "",
  city: "",
  zipCode: "",
};

export default function Form() {
  const { formData, errors, handleChange, handleBlur, handleNext, handlePrev, step, disableNext } =
    useFormValidation(INITIAL_DATA);

  const steps = [
    {
      title: "Step 1",
      component: <StepOne formData={formData} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />,
    },
    {
      title: "Step 2",
      component: <StepTwo formData={formData} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />,
    },
    { title: "Submit", component: <FinalStep formData={formData} /> },
  ];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === steps.length - 1) {
      alert("Successful Account Creation");
    } else {
      handleNext();
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ marginTop: 8, width: "100%", maxWidth: 600, bgcolor: "#f2f2f8" }}>
        <CardContent>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit}>
        <Card sx={{ width: "100%", maxWidth: 600, marginTop: 4, bgcolor: "#f2f2f8" }}>
          <CardContent>
            <div>{steps[step].component}</div>

            <Stack direction={"row"} marginTop={2} justifyContent="flex-end">
              {step > 0 && (
                <Button variant="contained" onClick={handlePrev} sx={{ justifySelf: "self-start" }}>
                  Prev
                </Button>
              )}
              <Button
                variant="contained"
                type="submit"
                disabled={disableNext && step !== steps.length - 1}
                sx={{ marginLeft: "auto" }}
              >
                {step === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
