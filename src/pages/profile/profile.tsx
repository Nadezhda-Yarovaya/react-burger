import React, { FC, SyntheticEvent, useEffect, useState } from "react";
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
import { useFormAndValidation } from "../../hooks/useFormAndValidation";


const {
  form__input,
  form__element,
  form__element_profile,
  form__icon,
  label,
  validationError,
} = formStyles;

const { profile, container } = profileStyles;


const Profile: FC = () => {
  const dispatch = useDispatch();

  const user1 = useSelector((state : any) => 
     state.auth.user
  );

  const isLogged = useSelector((state: any) => state.auth.isLogged);
  const { values, handleChange, errors, isValid, validities } = useFormAndValidation({
    
    name: user1.name,
    email: user1.email,
    password: "",
  });

/*
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailValidError, setEmailValidError] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [nameValidError, setNameValidError] = useState("");
  const [isPassValid, setIsPassValid] = useState(true);
  const [passValidError, setPassValidError] = useState(""); */
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState(true);
  const [isPassDisabled, setIsPassDisabled] = useState(true);
  const [isPassShown, setIsPassShown] = useState(false);

  useEffect(() => {
    if (isLogged) {
      dispatch<any>(loadUser());
    }
  }, [isLogged]);


  
  const { email, password, name } = values;

  /*
  useEffect(() => {
    setName(user1.name);
    setEmail(user1.email);
  }, [user1]);*/

  const [isProfileFormDisabled, setIsProfileFormDisabled] = useState(true);

  function toggleDisabled() {
    setIsProfileFormDisabled(!isProfileFormDisabled);
  }
  function performEdit(e : SyntheticEvent) {
    e.preventDefault();
    setIsProfileFormDisabled(false);
  }

  function updateData() {
    const ifAnyChanged =
      email !== user1.email || name !== user1.name || password !== "";

    if (ifAnyChanged && validities.name && validities.email && validities.password) {
      dispatch<any>(patchUser(email, name, password));
      makeDefaultForm();
    } else {
      dispatch<any>({
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

  const makeDefaultForm = (): void => {
    setIsPassShown(false);
    toggleDisabled();
    disableFields();
  }

  const disableFields = (): void => {
    setIsNameDisabled(true);
    setIsEmailDisabled(true);
    setIsPassDisabled(true);
   /* setEmail(user1.email);
    setName(user1.name);
    setPass("");
    setPassValidError("");
    setEmailValidError("");
    setNameValidError("");*/
  }

  function toggleShowPass(e: SyntheticEvent) {
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
                onChange={handleChange}
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
                onChange={handleChange
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
                onChange={handleChange}
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
