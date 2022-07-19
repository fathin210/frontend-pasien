import React from "react";
import { FiUser } from "react-icons/fi";
function UserIcon() {
  return (
    <div className="flex justify-center items-center border-4 p-1 border-blue-400 rounded-full w-32 h-32">
      <div className="bg-slate-400  flex items-center justify-center flex-grow h-full rounded-full">
        <FiUser className="text-2xl text-white" />
      </div>
    </div>
  );
}

export default UserIcon;
