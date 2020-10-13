import { useState, useEffect } from "react";
import { toast } from "../utils/toast";
import { Errors } from "../components/Auth/validateSignup";

interface InitialState {
  name?: string;
  email: string;
  password: string;
}

function useFormValidation(
  initialState: InitialState,
  validate: (values: Errors) => Errors,
  action: () => void
) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        action();
        setValues(initialState);
        setIsSubmitting(false);
      } else {
        toast(Object.values(errors).join(" "));
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event: any) {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    values,
    setValues,
    isSubmitting,
  };
}

export default useFormValidation;
