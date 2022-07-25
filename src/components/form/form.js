import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import buttonStyles from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formStyles from "./form.module.css";
import PropTypes from "prop-types";

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

function Form(props) {
  let linksContent = "";
  if (props.name === "forgotform") {
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
  if (props.name === "loginform") {
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
  if (props.name === "registerform") {
    linksContent = (
      <p className={par}>
        Уже зарегистрированы?{" "}
        <Link to="/login" className={link}>
          Войти
        </Link>
      </p>
    );
  }

  function handleCancelEdit(e) {
    e.preventDefault();
    props.toggleDisabled();
    props.disableFields();
  }

  function handleFormClick(e) {
    e.preventDefault();
    props.onSubmit();
  }
  const apiMessage = useSelector((state) => {
    return state.auth.apiData.message;
  });
  const apiSuccess = useSelector((state) => state.auth.apiData.success);

  const oneButton = (
    <input
      type="submit"
      value={props.buttonText}
      className={`${button} ${button_type_primary} ${button_size_medium}`}
      disabled={false}
    />
  );

  const twoButtons = props.isDisabled ? (
    <></>
  ) : (
    <div className={form__twobuttons}>
      <Button size="medium" onClick={handleCancelEdit} type="primary">
        Отмена
      </Button>

      <input
        type="submit"
        value={props.buttonText}
        className={`${button} ${button_type_primary} ${button_size_medium}`}
        disabled={false}
      />
    </div>
  );

  const buttonToRender =
    props.name === "editprofileform" ? twoButtons : oneButton;

  return (
    <>
      <div className={container}>
        <form
          name={props.name}
          className={form}
          style={{ margin: props.title ? "180px 0 0 0" : "120px 0 0 0" }}
          onSubmit={handleFormClick}
          noValidate
        >
          {props.title ? <h1 className={form__title}>{props.title}</h1> : <></>}
          {props.children}
          {props.buttonText ? buttonToRender : <></>}
        </form>
        <p style={{ color: apiSuccess ? "lime" : "red" }} className={message}>
          {apiMessage}
        </p>
        {props.title ? <div className={links}>{linksContent}</div> : <></>}
      </div>
    </>
  );
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  toggleDisabled: PropTypes.func,
  disableFields: PropTypes.func,
};

export default Form;
