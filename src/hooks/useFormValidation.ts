import * as React from "react";
import { FormData } from "../Components/Form/Form";

type ValidationErrors = { [key: string]: string };

export function useFormValidation(initialData: FormData) {
  const [formData, setFormData] = React.useState<FormData>(initialData);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [step, setStep] = React.useState<number>(0);
  const [disableNext, setDisableNext] = React.useState<boolean>(true);

  function validateField(name: string, value: string) {
    let errorMsg = "";
    switch (step) {
      case 0:
        if (name === "firstName" && !value) {
          errorMsg = "First Name is required";
        } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = "Please enter a valid email address.";
        } else if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
          errorMsg = "Please enter a valid phone number.";
        }
        break;
      case 1:
        if (name === "addressLineOne" && !value) {
          errorMsg = "Address Line One is required.";
        } else if (name === "city" && !value) {
          errorMsg = "City is required.";
        } else if (name === "state" && !value) {
          errorMsg = "State is required.";
        } else if (name === "zipCode" && !/^\d{6}(-\d{4})?$/.test(value)) {
          errorMsg = "Please enter a valid zip code.";
        }
        break;
      default:
        break;
    }
    return errorMsg;
  }

  React.useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, [step]);

  React.useEffect(() => {
    const isValidFormData = () => {
      switch (step) {
        case 0:
          return (
            formData.firstName &&
            formData.email &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
            formData.phone &&
            /^[0-9]{10}$/.test(formData.phone)
          );
        case 1:
          return (
            formData.addressLineOne && formData.city && formData.state && /^\d{6}(-\d{4})?$/.test(formData.zipCode)
          );
        default:
          return false;
      }
    };

    if (isValidFormData()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [formData, step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  //Validate the field onBlur event to show the error message whene user skip the field by without entering the value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleNext,
    handlePrev,
    step,
    disableNext,
    setDisableNext,
  };
}
