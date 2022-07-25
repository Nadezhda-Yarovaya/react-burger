import React, { useEffect, useState } from "react";
import Form from "../../components/form/form";
import {
  HideIcon,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import profileStyles from "./profile.module.css";
import formStyles from "../../components/form/form.module.css";
import { useDispatch, useSelector } from "react-redux";
import PersonalMenu from "../../components/personal-menu/personal-menu";

import {
  loadUser,
  patchUser,
} from "../../services/action-creators/auth-action-creators";

import { SHOW_APIMESSAGE, CLEAR_APIMESSAGE } from "../../services/actions";

import { EditIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const {
  form__input,
  form__element,
  form__element_profile,
  form__icon,
  label,
  validationError,
} = formStyles;

const { profile, container } = profileStyles;

function Profile(props) {
  const dispatch = useDispatch();

  const user1 = useSelector((state) => {
    return state.auth.user;
  });

  const isLogged = useSelector((state) => state.auth.isLogged);

  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidError, setEmailValidError] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameValidError, setNameValidError] = useState("");
  const [isPassValid, setIsPassValid] = useState(true);
  const [passValidError, setPassValidError] = useState("");
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPassDisabled, setIsPassDisabled] = useState(true);
  const [isPassShown, setIsPassShown] = useState(false);

  useEffect(() => {
    if (isLogged) {
      dispatch(loadUser());
    }
  }, [isLogged]);

  useEffect(() => {
    setName(user1.name);
    setEmail(user1.email);
  }, [user1]);

  const [isProfileFormDisabled, setIsProfileFormDisabled] = useState(true);

  function toggleDisabled() {
    setIsProfileFormDisabled(!isProfileFormDisabled);
  }
  function performEdit(e) {
    e.preventDefault();
    setIsProfileFormDisabled(false);
  }

  function updateData() {
    const ifAnyChanged =
      email !== user1.email || name !== user1.name || pass !== "";

    if (ifAnyChanged && isNameValid && isEmailValid && isPassValid) {
      dispatch(patchUser(email, name, pass));
      makeDefaultForm();
    } else {
      dispatch({
        type: SHOW_APIMESSAGE,
        payload: {
          message:
            !isNameValid || !isEmailValid || !isPassValid
              ? "Заполните все поля формы корректно"
              : "Вы не совершили изменений данных",
          success: false,
        },
      });

      setTimeout(() => {
        dispatch({ type: CLEAR_APIMESSAGE });
      }, 2500);
    }
  }

  function makeDefaultForm() {
    setIsPassShown(false);
    toggleDisabled();
    disableFields();
  }

  function disableFields() {
    setIsNameDisabled(true);
    setIsEmailDisabled(true);
    setIsPassDisabled(true);
    setEmail(user1.email);
    setName(user1.name);
    setPass("");
    setPassValidError("");
    setEmailValidError("");
    setNameValidError("");
  }

  function toggleShowPass(e) {
    e.preventDefault();
    setIsPassShown(!isPassShown);
  }

  return (
    <>
      <div className={container}>
        <PersonalMenu />

        <div className={profile}>
          <Form
            name="editprofileform"
            buttonText="Сохранить"
            onSubmit={updateData}
            isDisabled={isProfileFormDisabled}
            toggleDisabled={toggleDisabled}
            disableFields={disableFields}
          >
            <div className={`${form__element} `}>
              <label htmlFor="profileName" className={label}>
                Имя
              </label>
              <input
                type="text"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="25"
                className={`${form__input} ${form__element_profile}`}
                name="profileName"
                value={name || ""}
                onChange={(e) =>
                  props.setFormValidation(
                    e,
                    setName,
                    setIsNameValid,
                    setNameValidError
                  )
                }
                disabled={isNameDisabled}
              />
              {isNameDisabled ? (
                <button
                  className={form__icon}
                  onClick={(e) => {
                    performEdit(e);
                    setIsNameDisabled(false);
                  }}
                >
                  <EditIcon type="primary" />
                </button>
              ) : (
                <></>
              )}
              <p className={validationError}>
                {isNameValid ? "" : nameValidError}
              </p>
            </div>

            <div className={`${form__element}`}>
              {" "}
              <label htmlFor="profileName" className={label}>
                E-mail
              </label>
              <input
                type="email"
                placeholder="E-mail"
                required
                minLength="4"
                className={`${form__input} ${form__element_profile}`}
                maxLength="30"
                name="profileEmail"
                value={email || ""}
                onChange={(e) =>
                  props.setFormValidation(
                    e,
                    setEmail,
                    setIsEmailValid,
                    setEmailValidError
                  )
                }
                disabled={isEmailDisabled}
              />
              {isEmailDisabled ? (
                <button
                  className={form__icon}
                  onClick={(e) => {
                    performEdit(e);
                    setIsEmailDisabled(false);
                  }}
                >
                  <EditIcon type="primary" />
                </button>
              ) : (
                <></>
              )}
              <p className={validationError}>
                {isEmailValid ? "" : emailValidError}
              </p>
            </div>

            <div className={`${form__element}`}>
              {" "}
              <label htmlFor="profileName" className={label}>
                Пароль
              </label>
              <input
                type={isPassShown ? "text" : "password"}
                placeholder="Пароль"
                className={`${form__input} ${form__element_profile}`}
                minLength="3"
                maxLength="30"
                name="profileName"
                value={pass || ""}
                onChange={(e) =>
                  props.setFormValidation(
                    e,
                    setPass,
                    setIsPassValid,
                    setPassValidError
                  )
                }
                disabled={isPassDisabled}
              />
              {isPassDisabled ? (
                <button
                  className={form__icon}
                  onClick={(e) => {
                    performEdit(e);
                    setIsPassDisabled(false);
                  }}
                >
                  <EditIcon type="primary" />
                </button>
              ) : (
                <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
                  {isPassShown ? (
                    <HideIcon type="primary" />
                  ) : (
                    <ShowIcon type="primary" />
                  )}
                </div>
              )}
              <p className={validationError}>
                {isPassValid ? "" : passValidError}
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Profile;
