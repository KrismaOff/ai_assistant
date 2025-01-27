import React, { useRef, useState } from "react";
import ButtonWithIcon from "@/components/templates/ButtonWithIcon/ButtonWithIcon";
import useHandleAuthResponse from "@/hooks/useHandleAuthResponse";
import { FormData } from "@/types";
import "./VerifyForm.css";

import { verifyContent } from "@/assets/data/formsContent";
import { ROUTES } from "@/assets/data/paths";

interface Props {
  type: string;
}

const VerifyForm = ({ type }: Props) => {
  const { content, buttons, path } = verifyContent[type];
  const [localStateCode, setLocalStateCode] = useState<{ [key: string]: string }>({});
  const [submit] = useHandleAuthResponse(path);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value, id } = e.target;
    if (value.length > 1 || !/^[0-9]$/.test(value)) return;
    setLocalStateCode((prev: FormData) => ({ ...prev, [id]: value }));
    if (index < inputsRef.current.length - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const submitVerify = (): void => {
    if (
      Object.values(localStateCode).length === 6 &&
      Object.values(localStateCode).every((val: string) => /^[0-9]$/.test(val))
    ) {
      const object = { code: Object.values(localStateCode).join("") };
      submit(object, ROUTES.AUTH.child.VERIFY);
    } else {
      alert("Код должен содержать 6 цифр.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1>{content.title}</h1>
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
                id={`input-${index}`}
                className="cell_verify"
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>
          {Object.values(buttons).map((attr, i) => (
            <span key={i}>
              <ButtonWithIcon {...attr} />
            </span>
          ))}
        </form>
      </div>
    </div>
  );
};

export default VerifyForm;
