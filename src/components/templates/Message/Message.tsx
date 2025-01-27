import React from 'react'
import './Message.css'

interface Props {
    text: string,
    role: "user" | "assistant"
}

export default function Message({ text, role }: Props) {

  const style = () => {
    if (role === "assistant") return "assistant-message"
    else if (role === "user") return "user-message"
  }

  return (
    <div className={`message' ${style()}`}>
      {text}
    </div>
  )
}
