import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import ButtonWithIcon from "@/components/templates/ButtonWithIcon/ButtonWithIcon";
import useHandleAuthForm from "@/hooks/useHandleAuthForm"
import useHandleAuthResponse from "@/hooks/useHandleAuthResponse";
import "./AuthForm.css";

interface Props {
  isRegister: boolean;
}

const AuthForm = ({ isRegister }: Props) => {

  const location = useLocation();

  const [data, handleChange] = useHandleAuthForm(location)
  const [submit] = useHandleAuthResponse(location.pathname.split('/').at(-1))

  const formInputsData = {
    first_name: {
      attr: {
        type: "text",
        id: "first_name",
        name: "first_name",
        placeholder: "Имя",
        required: true,
      },
      isRegister: true,
    },
    last_name: {
      attr: {
        type: "text",
        id: "last_name",
        name: "last_name",
        placeholder: "Фамилия",
        required: true,
      },
      isRegister: true,
    },
    email: {
      attr: {
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Email",
        autoComplete: "off",
        required: true,
      },
      isRegister: false,
    },
    password: {
      attr: {
        type: "password",
        id: "password",
        name: "password",
        placeholder: "Пароль",
        autoComplete: "off",
        required: true,
      },
      isRegister: false,
    },
  };

  const authButtonsData = {
    submit: {
      text: isRegister ? "Зарегистрироваться" : "Войти",
      style: {
        background: "#007bff",
        color: "#ffffff",
      },
      hover: { background: "#0056b3" },
    },
  };

  const contentOfPage = {
    title: isRegister ? "Регистрация" : "Вход в систему",
    buttonText: isRegister ? "Войти" : "Зарегистрируйтесь",
    redirectText: isRegister ? "Ещё нет аккаунта?" : "Уже есть аккаунт?",
    redirectLink: isRegister ? "/auth/login" : "/auth/register",
  };

  const typeOfPage = isRegister ? "reg" : "log"

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{contentOfPage.title}</h1>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); submit(data, typeOfPage); }}>
          {Object.entries(formInputsData).map(([key, props]) => {
            if (!isRegister && props.isRegister) return null;
            return <input onChange={handleChange} key={key} {...props.attr} />;
          })}
          <ButtonWithIcon {...authButtonsData.submit}/>
        </form>

        <p>
          {contentOfPage.redirectText}{" "}
          <Link to={contentOfPage.redirectLink}>
            {contentOfPage.buttonText}
          </Link>
        </p>
        <p>
          <Link to={"/"}>
          Забыли пароль?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
