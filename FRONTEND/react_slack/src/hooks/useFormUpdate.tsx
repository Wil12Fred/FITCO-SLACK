import { useEffect, useMemo, useState } from "react";

export const useFormUpdate = (initialForm: any = {}, validationsForm: any = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [validationForm, setValidationForm]: any = useState({});

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(validationForm)) {
      if (validationForm[formValue] !== null) return false;
    }
    return true;
  }, [validationForm]);

  const onInputChange = ({ target }: any) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onCheckboxChange = ({ target }: any) => {
    const { name, checked } = target;
    setFormState({
      ...formState,
      [name]: checked,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: any = {};
    for (const formField of Object.keys(validationsForm)) {
      const [fn, errorMessage] = validationsForm[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }
    setValidationForm(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    onCheckboxChange,

    ...validationForm,
    isFormValid,
  };
};
