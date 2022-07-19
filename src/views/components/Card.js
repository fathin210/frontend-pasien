import React from "react";

function Card({ title, content, color, isLarge = false }) {
  return (
    <div className="flex flex-grow flex-col h-36 te bg-white shadow-xl rounded-xl">
      <div className={color + " p-3 rounded-tr-xl rounded-tl-xl shadow-md"}>
        <h2 className="text-base text-white md:text-xl text-center">{title}</h2>
      </div>
      <div className="container flex-grow flex items-center justify-center">
        <h4
          className={`text-base md:${
            isLarge ? "text-2xl" : "text-lg"
          } font-semibold`}
        >
          {content}
        </h4>
      </div>
    </div>
  );
}

export default Card;
