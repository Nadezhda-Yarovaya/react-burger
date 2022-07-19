import React, { useState } from "react";
import Form from "../components/form/form";
import {
  HideIcon,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  handleApiMessageError,
  resetPass,
} from "../services/action-creators/auth-action-creators";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import formStyles from "../components/form/form.module.css";
const { form__input, form__element, form__icon, validationError } = formStyles;

function ResetPassword(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  const [isPassShown, setIsPassShown] = useState(true);
  const [isPassValid, setIsPassValid] = useState(false);
  const [passValidError, setPassValidError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenValidError, setTokenValidError] = useState("");

  const formValid = isPassValid && isTokenValid;

  function handleResetPass() {
    if (formValid) {
      dispatch(resetPass(pass, token, history));
    } else {
      handleApiMessageError(dispatch, "Заполните все поля формы корректно");
    }
  }

  function toggleShowPass(e) {
    e.preventDefault();
    setIsPassShown(!isPassShown);
  }

  return (
    <Form
      title="Восстановление пароля"
      name="resetform"
      buttonText="Сохранить"
      onSubmit={handleResetPass}
    >
      <div className={form__element}>
        <input
          type={isPassShown ? "password" : "text"}
          placeholder="Задайте новый пароль"
          className={form__input}
          value={pass}
          required
          minLength="2"
          maxLength="25"
          onChange={(e) =>
            props.setFormValidation(
              e,
              setPass,
              setIsPassValid,
              setPassValidError
            )
          }
        />
        <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
          {isPassShown ? (
            <ShowIcon type="primary" />
          ) : (
            <HideIcon type="primary" />
          )}
        </div>
        <p className={validationError}>{isPassValid ? "" : passValidError}</p>
      </div>

      <div className={form__element}>
        <input
          type="text"
          placeholder="Введите код из письма"
          className={form__input}
          value={token}
          onChange={(e) =>
            props.setFormValidation(
              e,
              setToken,
              setIsTokenValid,
              setTokenValidError
            )
          }
          required
          minLength="2"
        />
        <p className={validationError}>{isTokenValid ? "" : tokenValidError}</p>
      </div>
    </Form>
  );
}

ResetPassword.propTypes = {
  setFormValidation: PropTypes.func.isRequired,
};

export default ResetPassword;
