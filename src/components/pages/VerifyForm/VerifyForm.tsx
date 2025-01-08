import React, { useRef, useState } from "react";
import { useLocation } from 'react-router-dom'
import ButtonWithIcon from "@/components/templates/ButtonWithIcon/ButtonWithIcon";
import useHandleAuthResponse from "@/hooks/useHandleAuthResponse";
import { FormData } from "@/types";
import "./VerifyForm.css";

const VerifyForm = () => {

  const location = useLocation();

  const [localStateCode, setLocalStateCode] = useState({})
  const [submit] = useHandleAuthResponse(location.pathname.split('/').at(-1))

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, id } = e.target;
    if (value.length > 1 || !/^[0-9]$/.test(value)) return;
    setLocalStateCode((prev: FormData) => ({ ...prev, [id]: value }))
    if (index < inputsRef.current.length - 1) inputsRef.current[index + 1].focus();
  };

  const submitVerify = (): void => {
    if (
      Object.values(localStateCode).length === 6 &&
      Object.values(localStateCode).every((val: string) => val.trim() !== "" && val.length === 1)
    ) {
      const object = { code: Object.values(localStateCode).join("") };
      submit(object, "verify");
    } else alert("Неверный формат кода");
  };

  const authButtonsData = {
    submit: {
      text: "Проверить код",
      type: "submit",
      style: {
        background: "#007bff",
        color: "#ffffff",
      },
      hover: { background: "#0056b3" },
    },
  };


  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1>Введите код</h1>
        <form 
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => { 
            e.preventDefault(); 
            submitVerify(); 
          }}
        >
          <div className="verify-card-code-cont">
            {[...Array(6)].map((_, index) => (
              <input
                required
                id={index}
                className="cell_verify"
                key={index}
                type="text"
                maxLength="1"
                ref={(el: HTMLInputElement) => (inputsRef.current[index] = el!)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
              />
            ))}
          </div>
          <ButtonWithIcon {...authButtonsData.submit} />
        </form>
      </div>
    </div>
  );
};

export default VerifyForm;
