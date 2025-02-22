import React, { useRef, useState } from "react";

interface AutoResizingTextareaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({ onChange, value }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFirstInput, setIsFirstInput] = useState(true); // Флаг первого ввода

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFirstInput && e.target.value.trim().length > 0) {
      setIsFirstInput(false); // После первого ввода отключаем флаг
    } 

    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"; // Фиксированная высота для первой строки
      const newHeight = Math.max(textareaRef.current.scrollHeight, 24); // Не меньше 1 строки
      textareaRef.current.style.height = `${Math.min(newHeight, 5 * 20)}px`; // Ограничение в 5 строк
    }

    onChange(e); 
  };

  return (
    <textarea
    placeholder="Введите сообщение..."
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      rows={1}
      style={{
        alignContent: "center",
        fontFamily: "Inter_Regular",
        flex: 1,
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        color: "#ffffff",
        fontSize: "16px",
        padding: "8px",
        resize: "none",
        whiteSpace: "pre-wrap",
        minHeight: "24px", 
      }}
    />
  );
};

export default AutoResizingTextarea;
