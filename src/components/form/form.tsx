// import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import buttonStyles from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";
// import PropTypes from "prop-types";
import { FC, HTMLInputTypeAttribute, SyntheticEvent } from "react";
import {Button } from '../../utils/typesLibrary';

const {
  container,
  form,
  form__title,
  links,
  link,
  par,
  form__twobuttons,
  message,
} = formStyles;

const { button, button_type_primary, button_size_medium } = buttonStyles;

type TFormProps = {
  name: string;
  buttonText: string;
  isDisabled? : boolean;
  title?: string;
  onSubmit: () => void;
  toggleDisabled : () => void;
  disableFields: () => void;
  children: React.ReactNode;
}

const Form: FC<TFormProps>= ({name, buttonText, isDisabled, title, onSubmit, toggleDisabled, disableFields, children}) => {
  let linksContent: React.ReactNode = "";
  if (name === "forgotform") {
    linksContent = (
      <>
        <p className={par}>
          Вспомнили пароль?{" "}
          <Link to="/login" className={link}>
            Войти
          </Link>
        </p>
      </>
    );
  }
  if (name === "loginform") {
    linksContent = (
      <>
        <p className={par}>
          Вы - новый пользователь?{" "}
          <Link to="/register" className={link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={par}>
          Забыли пароль?{" "}
          <Link to="/forgot-password" className={link}>
            Восстановить пароль
          </Link>
        </p>
      </>
    );
  }
  if (name === "registerform") {
    linksContent = (
      <p className={par}>
        Уже зарегистрированы?{" "}
        <Link to="/login" className={link}>
          Войти
        </Link>
      </p>
    );
  }

  function handleCancelEdit(e : SyntheticEvent) {
    e.preventDefault();
    toggleDisabled();
    disableFields();
  }

  function handleFormClick(e : SyntheticEvent) {
    e.preventDefault();
    onSubmit();
  }
  const apiMessage = useSelector((state: any) => {
    return state.auth.apiData.message;
  });
  const apiSuccess = useSelector((state: any) => state.auth.apiData.success);

  const oneButton = (
    <input
      type="submit"
      value={buttonText}
      className={`${button} ${button_type_primary} ${button_size_medium}`}
      disabled={false}
    />
  );

  const twoButtons = isDisabled ? (
    <></>
  ) : (
    <div className={form__twobuttons}>
      <Button size="medium" onClick={handleCancelEdit} type="primary">
        Отмена
      </Button>

      <input
        type="submit"
        value={buttonText}
        className={`${button} ${button_type_primary} ${button_size_medium}`}
        disabled={false}
      />
    </div>
  );

  const buttonToRender =
    name === "editprofileform" ? twoButtons : oneButton;

  return (
    <>
      <div className={container}>
        <form
          name={name}
          className={form}
          style={{ margin: title ? "180px 0 0 0" : "120px 0 0 0" }}
          onSubmit={handleFormClick}
          noValidate
        >
          {title ? <h1 className={form__title}>{title}</h1> : <></>}
          {children}
          {buttonText ? buttonToRender : <></>}
        </form>
        <p style={{ color: apiSuccess ? "lime" : "red" }} className={message}>
          {apiMessage}
        </p>
        {title ? <div className={links}>{linksContent}</div> : <></>}
      </div>
    </>
  );
}

export default Form;
