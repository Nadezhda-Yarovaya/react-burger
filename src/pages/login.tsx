import { FC, SyntheticEvent, useState } from 'react';

import {
  HideIcon,
  ShowIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';

import {
  handleApiMessageError,
  performLogin,
} from '../services/action-creators/auth-action-creators';
import { useHistory, useLocation } from 'react-router-dom';

import formStyles from '../components/form/form.module.css';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { initialValues1 } from '../utils/utils';
import { useDispatch } from '../hooks/hooks';
import { TLocation } from '../utils/types';

const { form__input, form__icon, form__element, validationError } = formStyles;

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const [isPassShownLogin, setIsPassShownLogin] = useState(true);

  const { values, handleChange, errors, isValid } =
    useFormAndValidation(initialValues1);

  const { email, password } = values;

  function handleLogin() {
    if (isValid) {
      dispatch(performLogin(email, password, location, history));
    } else {
      handleApiMessageError(dispatch, 'Заполните все поля формы корректно');
    }
  }

  function toggleShowPass(e: SyntheticEvent) {
    e.preventDefault();
    setIsPassShownLogin(!isPassShownLogin);
  }

  return (
    <Form
      title='Вход'
      name='loginform'
      buttonText='Войти'
      onSubmit={handleLogin}
    >
      <div className={form__element}>
        <input
          type='email'
          placeholder='Email'
          className={form__input}
          required
          minLength={2}
          maxLength={25}
          name='email'
          value={email}
          onChange={handleChange}
        />
        <p className={validationError}>{errors.email}</p>
      </div>

      <div className={form__element}>
        <input
          type={isPassShownLogin ? 'password' : 'text'}
          placeholder='Пароль'
          className={form__input}
          value={password}
          name='password'
          required
          minLength={2}
          maxLength={25}
          onChange={handleChange}
        />
        <div className={form__icon} onClick={(e) => toggleShowPass(e)}>
          {isPassShownLogin ? (
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

export default Login;
