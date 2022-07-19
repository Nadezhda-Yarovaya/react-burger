import React, { useState } from "react";
import Form from "../components/form/form";

import {
  HideIcon,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";

import formStyles from "../components/form/form.module.css";
import {
  handleApiMessageError,
  performRegister,
} from "../services/action-creators/auth-action-creators";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { form__input, form__element, form__icon, validationError } = formStyles;

function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isPassShown, setIsPassShown] = useState(true);
  const [isPassValid, setIsPassValid] = useState(false);
  const [passValidError, setPassValidError] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidError, setEmailValidError] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
  const [nameValidError, setNameValidError] = useState("");

  const formValid = isNameValid && isEmailValid && isPassValid;

  function handleRegister() {
    if (formValid) {
      dispatch(performRegister(name, email, pass, history));
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
      title="Регистрация"
      name="registerform"
      buttonText="Зарегистрироваться"
      onSubmit={handleRegister}
    >
      <div className={form__element}>
        <input
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="25"
          className={form__input}
          value={name}
          onChange={(e) =>
            props.setFormValidation(
              e,
              setName,
              setIsNameValid,
              setNameValidError
            )
          }
        />
        <p className={validationError}>{isNameValid ? "" : nameValidError}</p>
      </div>

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
          required
          minLength="2"
          maxLength="25"
        />
        <p className={validationError}>{isEmailValid ? "" : emailValidError}</p>
      </div>

      <div className={form__element}>
        <input
          type={isPassShown ? "password" : "text"}
          placeholder="Пароль"
          className={form__input}
          value={pass}
          onChange={(e) =>
            props.setFormValidation(
              e,
              setPass,
              setIsPassValid,
              setPassValidError
            )
          }
          required
          minLength="2"
          maxLength="25"
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
    </Form>
  );
}
Register.propTypes = {
  setFormValidation: PropTypes.func.isRequired,
};

export default Register;
