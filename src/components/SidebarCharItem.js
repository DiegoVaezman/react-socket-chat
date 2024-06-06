import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/Types";
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

export const SidebarCharItem = ({ usuario }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActivo } = chatState;

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });
    const res = await fetchConToken(`messages/${usuario.uid}`);
    dispatch({
      type: types.cargarMensajes,
      payload: res.messages,
    });
    scrollToBottom("messages");
  };

  return (
    <div
      onClick={onClick}
      className={`chat_list ${chatActivo === usuario.uid && "active_chat"}`}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario?.name}</h5>
          {usuario?.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
