import { Box, Stack } from "@mui/material";
import { FormData } from "./Form";

const formFields = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "addressLineOne", label: "Address1" },
  { key: "addressLineTwo", label: "Address2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
];

export default function FinalStep({ formData }: { formData: FormData }) {
  return (
    <Box sx={{ marginBottom: 2, overflowX: "auto" }}>
      <h3>Review Your Information</h3>
      {formFields.map((field, index) => (
        <Stack key={index} direction={"row"} gap={2} marginY={1} marginLeft={2}>
          <p className="field-label">{field.label}:</p>
          <p>{formData[field.key as keyof FormData] ?? "-"}</p>{" "}
        </Stack>
      ))}
    </Box>
  );
}
