import React, { useContext, useState } from "react";
import { SocketContext } from "../context/ShocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

export const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message.length === 0) return;
    setMessage("");

    socket.emit("mensaje-personal", {
      from: auth.uid,
      to: chatState.chatActivo,
      message,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            onChange={onChange}
            value={message}
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
          />
        </div>
        <div className="col-sm-3 text-center">
          <button type="submit" className="msg_send_btn mt-3">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
