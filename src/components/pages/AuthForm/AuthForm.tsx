import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import ButtonWithIcon from "@/components/templates/ButtonWithIcon/ButtonWithIcon";
import useHandleAuthForm from "@/hooks/useHandleAuthForm"
import useHandleAuthResponse from "@/hooks/useHandleAuthResponse";
import "./AuthForm.css";

import { formsContent } from "@/assets/data/formsContent";
import { ROUTES } from "@/assets/data/paths";
import { constats } from "@/assets/data/constants";

interface Props {
  type: string;
}

const AuthForm = ({ type }: Props) => {

  const { content, inputs, buttons, path } = formsContent[type]

  const location = useLocation();

  const [data, handleChange] = useHandleAuthForm(location, type)
  const [submit] = useHandleAuthResponse(path)

  const submitForm = () => {
    if (type !== ROUTES.AUTH.child.FORGOTPASSWORD.child.CODE) submit(data, type)
    else {
      if (data.check === data.password) {
        const processedData = {
          email: localStorage.getItem(constats.resetPassword),
          new_password: data.password,
          code: data.code
        }
        submit(processedData, type);
      } else alert("Пароли не совпадают")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{content.title}</h1>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); submitForm(); }}>
          {Object.entries(inputs).map(([key, attr]: [string, object]) => <input onChange={handleChange} key={key} {...attr} />)}
          {Object.values(buttons).map((attr, i) => <span key={i}><ButtonWithIcon {...attr}/></span>)}
        </form>
        {(content.redirectText || content.redirectLink) && <p>
          {content.redirectText}{" "}
          <Link to={content.redirectLink}>{content.button}</Link>
        </p>}
        {(content.forgotPasswordText || content.forgotPasswordLink) && <p>
          <Link to={content.forgotPasswordLink}>{content.forgotPasswordText}</Link>
        </p>}
      </div>
    </div>
  );
};

export default AuthForm;
