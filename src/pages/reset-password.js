import React, { useState } from "react";
import Form from "../components/form/form";
import {
  HideIcon,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

import {
  handleApiMessageError,
  resetPass,
} from "../services/action-creators/auth-action-creators";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import formStyles from "../components/form/form.module.css";
const { form__input, form__element, form__icon, validationError } = formStyles;

function ResetPassword(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPassShown, setIsPassShown] = useState(true);
  const { values, handleChange, errors, isValid } = useFormAndValidation({
    password: "",
    token: "",
  });

  const { password, token } = values;

  function handleResetPass() {
    if (isValid) {
      dispatch(resetPass(password, token, history));
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
          value={password}
          name="password"
          required
          minLength="2"
          maxLength="25"
          onChange={handleChange}
        />
        <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
          {isPassShown ? (
            <ShowIcon type="primary" />
          ) : (
            <HideIcon type="primary" />
          )}
        </div>
        <p className={validationError}>{errors.password}</p>
      </div>

      <div className={form__element}>
        <input
          type="text"
          placeholder="Введите код из письма"
          className={form__input}
          value={token}
          name="token"
          onChange={handleChange}
          required
          minLength="2"
        />
        <p className={validationError}>{errors.token}</p>
      </div>
    </Form>
  );
}

export default ResetPassword;
