import { SyntheticEvent, useEffect, useState, FC } from 'react';
import Form from '../../components/form/form';
import {
  HideIcon,
  ShowIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyles from './profile.module.css';
import formStyles from '../../components/form/form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PersonalMenu from '../../components/personal-menu/personal-menu';

import {
  loadUser,
  patchUser,
} from '../../services/action-creators/auth-action-creators';

import { SHOW_APIMESSAGE, CLEAR_APIMESSAGE } from '../../services/actions';

import { EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const { form__input, form__element, form__icon, validationError } = formStyles;

const { profile, container } = profileStyles;

const Profile: FC = () => {
  const dispatch = useDispatch();

  const user1 = useSelector((state: any) => state.auth.user);

  const isLogged = useSelector((state: any) => state.auth.isLogged);

  const [pass, setPass] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailValidError, setEmailValidError] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [nameValidError, setNameValidError] = useState<string>('');
  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const [passValidError, setPassValidError] = useState<string>('');
  const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true);
  const [isPassDisabled, setIsPassDisabled] = useState<boolean>(true);
  const [isPassShown, setIsPassShown] = useState<boolean>(false);

  useEffect(() => {
    if (isLogged) {
      dispatch<any>(loadUser());
    }
  }, [isLogged]);

  useEffect(() => {
    setName(user1.name);
    setEmail(user1.email);
  }, [user1]);

  const [isProfileFormDisabled, setIsProfileFormDisabled] = useState(true);

  function toggleDisabled(): void {
    setIsProfileFormDisabled(!isProfileFormDisabled);
  }
  function performEdit(e: SyntheticEvent): void {
    e.preventDefault();
    setIsProfileFormDisabled(false);
  }

  function updateData(): void {
    const ifAnyChanged =
      email !== user1.email || name !== user1.name || pass !== '';

    if (ifAnyChanged && isNameValid && isEmailValid && isPassValid) {
      dispatch<any>(patchUser(email, name, pass));
      makeDefaultForm();
    } else {
      dispatch({
        type: SHOW_APIMESSAGE,
        payload: {
          message:
            !isNameValid || !isEmailValid || !isPassValid
              ? 'Заполните все поля формы корректно'
              : 'Вы не совершили изменений данных',
          success: false,
        },
      });

      setTimeout(() => {
        dispatch({ type: CLEAR_APIMESSAGE });
      }, 2500);
    }
  }

  function makeDefaultForm(): void {
    setIsPassShown(false);
    toggleDisabled();
    disableFields();
  }

  function disableFields(): void {
    setIsNameDisabled(true);
    setIsEmailDisabled(true);
    setIsPassDisabled(true);
    setEmail(user1.email);
    setName(user1.name);
    setPass('');
    setPassValidError('');
    setEmailValidError('');
    setNameValidError('');
  }

  function toggleShowPass(e: SyntheticEvent): void {
    e.preventDefault();
    setIsPassShown(!isPassShown);
  }

  return (
    <>
      <div className={container}>
        <PersonalMenu />

        <div className={profile}>
          <Form
            name='editprofileform'
            buttonText='Сохранить'
            onSubmit={updateData}
            isDisabled={isProfileFormDisabled}
            toggleDisabled={toggleDisabled}
            disableFields={disableFields}
          >
            <div className={form__element}>
              <input
                type='text'
                placeholder='Имя'
                name='name'
                required
                minLength={2}
                maxLength={25}
                className={form__input}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameValidError(e.target.validationMessage);
                  setIsNameValid(e.target.validity.valid);
                }}
                disabled={isNameDisabled}
              />
              {isNameDisabled ? (
                <button
                  className={form__icon}
                  onClick={(e: SyntheticEvent) => {
                    performEdit(e);
                    setIsNameDisabled(false);
                  }}
                >
                  <EditIcon type='primary' />
                </button>
              ) : (
                <></>
              )}
              <p className={validationError}>{nameValidError}</p>
            </div>

            <div className={form__element}>
              <input
                type='email'
                placeholder='Email'
                name='email'
                className={form__input}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValidError(e.target.validationMessage);
                  setIsEmailValid(e.target.validity.valid);
                }}
                required
                minLength={2}
                maxLength={25}
                disabled={isEmailDisabled}
              />
              {isEmailDisabled ? (
                <button
                  className={form__icon}
                  onClick={(e: SyntheticEvent) => {
                    performEdit(e);
                    setIsEmailDisabled(false);
                  }}
                >
                  <EditIcon type='primary' />
                </button>
              ) : (
                <></>
              )}
              <p className={validationError}>{emailValidError}</p>
            </div>

            <div className={form__element}>
              <input
                type={isPassShown ? 'text' : 'password'}
                name='password'
                placeholder='Пароль'
                className={form__input}
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setPassValidError(e.target.validationMessage);
                  setIsPassValid(e.target.validity.valid);
                }}
                required
                minLength={2}
                maxLength={25}
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
                  <EditIcon type='primary' />
                </button>
              ) : (
                <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
                  {isPassShown ? (
                    <HideIcon type='primary' />
                  ) : (
                    <ShowIcon type='primary' />
                  )}
                </div>
              )}
              <p className={validationError}>{passValidError}</p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Profile;