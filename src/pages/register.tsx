import { FC, SyntheticEvent, useState, useEffect } from 'react';
import Form from '../components/form/form';

import {
  HideIcon,
  ShowIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import formStyles from '../components/form/form.module.css';
import {
  handleApiMessageError,
  performRegister,
} from '../services/action-creators/auth-action-creators';
import { useHistory } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { initialValues1 } from '../utils/utils';
import { useDispatch, useSelector } from '../hooks/hooks';
import { CLEAR_APIMESSAGE } from '../services/actions';

const { form__input, form__element, form__icon, validationError } = formStyles;

const Register: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPassShown, setIsPassShown] = useState(true);
  const isRegisterSuccess = useSelector(
    (state) => state.auth.isRegisterSuccess
  );

  const { values, handleChange, errors, isValid } =
    useFormAndValidation(initialValues1);

  const { name, email, password } = values;

  function handleRegister() {
    if (isValid) {
      dispatch(performRegister({ name, email, password }));
    } else {
      handleApiMessageError(dispatch, 'Заполните все поля формы корректно');
    }
  }

  function toggleShowPass(e: SyntheticEvent) {
    e.preventDefault();
    setIsPassShown(!isPassShown);
  }

  useEffect(() => {
    console.log('isRegisterSuccess: ', isRegisterSuccess);
    if (isRegisterSuccess) {
      setTimeout(() => {
        dispatch({
          type: CLEAR_APIMESSAGE,
        });
        history.push('/login');
      }, 2000);
    }
  }, [isRegisterSuccess, history]);

  // console.log('hist: ', JSON.stringify(history));

  return (
    <Form
      title='Регистрация'
      name='registerform'
      buttonText='Зарегистрироваться'
      onSubmit={handleRegister}
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
          onChange={handleChange}
        />
        <p className={validationError}>{errors.name}</p>
      </div>

      <div className={form__element}>
        <input
          type='email'
          placeholder='Email'
          name='email'
          className={form__input}
          value={email}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={25}
        />
        <p className={validationError}>{errors.email}</p>
      </div>

      <div className={form__element}>
        <input
          type={isPassShown ? 'password' : 'text'}
          name='password'
          placeholder='Пароль'
          className={form__input}
          value={password}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={25}
        />
        <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
          {isPassShown ? (
            <ShowIcon type='primary' />
          ) : (
            <HideIcon type='primary' />
          )}
        </div>
        <p className={validationError}>{errors.password}</p>
      </div>
    </Form>
  );
};

export default Register;
