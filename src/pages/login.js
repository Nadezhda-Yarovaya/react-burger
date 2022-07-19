import {
  HideIcon,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Form from "../components/form/form";
import PropTypes from "prop-types";
import {
  handleApiMessageError,
  performLogin,
} from "../services/action-creators/auth-action-creators";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import formStyles from "../components/form/form.module.css";

const { form__input, form__icon, form__element, validationError } = formStyles;

export function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [isPassShownLogin, setIsPassShownLogin] = useState(true);
  const [isPassValid, setIsPassValid] = useState(false);
  const [passValidError, setPassValidError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidError, setEmailValidError] = useState("");

  const formValid = isEmailValid && isPassValid;

  function handleLogin() {
    if (formValid) {
      dispatch(performLogin(email, pass, history));
    } else {
      handleApiMessageError(dispatch, "Заполните все поля формы корректно");
    }
  }

  function toggleShowPass(e) {
    e.preventDefault();
    setIsPassShownLogin(!isPassShownLogin);
  }

  return (
    <Form
      title="Вход"
      name="loginform"
      buttonText="Войти"
      onSubmit={handleLogin}
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
          required
          minLength="2"
          maxLength="25"
        />
        <p className={validationError}>{isEmailValid ? "" : emailValidError}</p>
      </div>

      <div className={form__element}>
        <input
          type={isPassShownLogin ? "password" : "text"}
          placeholder="Пароль"
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
          {isPassShownLogin ? (
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

Login.propTypes = {
  setFormValidation: PropTypes.func.isRequired,
};
