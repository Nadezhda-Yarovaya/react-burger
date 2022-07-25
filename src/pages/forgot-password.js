import React from "react";
import Form from "../components/form/form";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

import {
  handleApiMessageError,
  handleRequestResetPassword,
} from "../services/action-creators/auth-action-creators";

import formStyles from "../components/form/form.module.css";
import { useHistory } from "react-router";

import { useDispatch } from "react-redux";

const { form__input, form__element, validationError } = formStyles;

function ForgotPassword(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: "",
  });

  const { email } = values;

  function handleForgotPass() {
    if (isValid) {
      dispatch(handleRequestResetPassword(email, history));
    } else {
      handleApiMessageError(dispatch, "Заполните e-mail корректно");
    }
  }

  return (
    <Form
      title="Восстановление пароля"
      name="forgotform"
      buttonText="Восстановить"
      onSubmit={handleForgotPass}
    >
      <div className={form__element}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={form__input}
          value={email}
          onChange={handleChange}
        />
        <p className={validationError}>{errors.email}</p>
      </div>
    </Form>
  );
}

export default ForgotPassword;
