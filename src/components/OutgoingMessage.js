import React from "react";
import { horaMes } from "../helpers/horaMes";

export const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.message}</p>
        <span className="time_date">{horaMes(msg.cratedAt)}</span>
      </div>
    </div>
  );
};
