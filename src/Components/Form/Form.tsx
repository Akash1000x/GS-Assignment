import { Box, Card, CardContent, Stepper, Step, StepLabel } from "@mui/material";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import FinalStep from "./FinalStep";
import * as React from "react";

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

export default function Form() {
  const [step, setStep] = React.useState<number>(0);
  const [formData, setFormData] = React.useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    addressLineOne: "",
    addressLineTwo: "",
    phone: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const steps = [
    { title: "Step 1", component: <StepOne formData={formData} setFormData={setFormData} setStep={setStep} /> },
    { title: "Step 2", component: <StepTwo formData={formData} setFormData={setFormData} setStep={setStep} /> },
    { title: "Submit", component: <FinalStep formData={formData} setStep={setStep} /> },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ marginTop: 8, width: "100%", maxWidth: 600 }}>
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

      <Card sx={{ width: "100%", maxWidth: 600, marginTop: 4 }}>
        <CardContent>{steps[step].component}</CardContent>
      </Card>
    </Box>
  );
}
