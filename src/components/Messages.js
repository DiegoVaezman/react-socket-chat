import React, { useContext } from "react";
import { SendMessage } from "./SendMessage";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <div className="mesgs">
      {/* Historia inicio */}
      <div id={"messages"} className="msg_history">
        {chatState.mensajes.map((msg) =>
          msg.to === auth.uid ? (
            <IncomingMessage msg={msg} key={msg._id} />
          ) : (
            <OutgoingMessage msg={msg} key={msg._id} />
          )
        )}
      </div>
      {/* Historia Fin */}
      <SendMessage />
    </div>
  );
};
