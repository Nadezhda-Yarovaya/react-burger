import { FC, SyntheticEvent, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import { intitialValuesRegister } from '../utils/utils';

const { form__input, form__element, form__icon, validationError } = formStyles;

const Register: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPassShown, setIsPassShown] = useState(true);

  const { values, handleChange, errors, isValid } = useFormAndValidation(
    intitialValuesRegister
  );

  const { email, password, name } = values;

  function handleRegister() {
    if (isValid) {
      dispatch<any>(performRegister(name, email, password, history));
    } else {
      handleApiMessageError(dispatch, 'Заполните все поля формы корректно');
    }
  }

  function toggleShowPass(e: SyntheticEvent) {
    e.preventDefault();
    setIsPassShown(!isPassShown);
  }

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
