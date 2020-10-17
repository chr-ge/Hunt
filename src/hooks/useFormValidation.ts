import { useState, useEffect } from "react";
import { toast } from "../utils/toast";

export interface UserInterface {
  name?: string;
  email: string;
  password?: string;
  newPassword?: string;
  currentPassword?: string;
}

export interface ProductInterface {
  title: string;
  description: string;
  url: string;
}

function useFormValidation<T, E>(
  initialState: T,
  validate: (values: T) => E,
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
