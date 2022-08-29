import React, { useState, useCallback } from 'react';
import { TForm } from '../utils/types';

export function useFormAndValidation(initialState: TForm) {
  const [values, setValues] = useState(initialState.values);
  const [errors, setErrors] = useState(initialState.errors);
  const [validities, setValidities] = useState(initialState.validities);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setValidities({ ...validities, [name]: e.target.validity.valid });
    setIsValid(e.target.closest('form')!.checkValidity()); // we tell to TS 'it will not be null trust me'
  };

  const resetForm = useCallback(
    (
      newValues = initialState.values,
      newErrors = initialState.errors,
      newValidities = initialState.validities,
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setValidities(newValidities);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setValidities, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    validities,
    isValid,
    resetForm,
  };
}
