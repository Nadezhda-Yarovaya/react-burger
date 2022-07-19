import React, { useState } from "react";
import Form from "../components/form/form";

import PropTypes from "prop-types";

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
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidError, setEmailValidError] = useState("");

  function handleForgotPass() {
    if (isEmailValid) {
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
          placeholder="Email"
          className={form__input}
          value={email}
          onChange={(e) =>
            props.setFormValidation(
              e,
              setEmail,
              setIsEmailValid,
              setEmailValidError
            )
          }
        />
        <p className={validationError}>{isEmailValid ? "" : emailValidError}</p>
      </div>
    </Form>
  );
}

ForgotPassword.propTypes = {
  setFormValidation: PropTypes.func.isRequired,
};

export default ForgotPassword;
