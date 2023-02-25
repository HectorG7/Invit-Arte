import { useState } from "react";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEventValidation = (e) => {
    handleChange(e);
    setErrors(validateForm(form, e));
  };

  const handleSubmit = (e) => {};

  return {
    form,
    errors,
    handleChange,
    handleEventValidation,
    handleSubmit,
  };
};
