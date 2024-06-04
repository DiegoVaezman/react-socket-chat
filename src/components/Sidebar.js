import React from "react";
import { SidebarCharItem } from "./SidebarCharItem";

export const Sidebar = () => {
  const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="inbox_chat">
      {chats.map((chat) => (
        <SidebarCharItem key={chat} />
      ))}
      <SidebarCharItem />
      {/* Espacio extra para scroll */}
      <div className="extra_space"></div>
    </div>
  );
};
