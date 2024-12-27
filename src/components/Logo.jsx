import React from "react";

function Logo({ width = "4.3rem" }) {
  return (
    <div className="flex justify-center items-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="rounded-lg"
        style={{ width }}
      />
    </div>
  );
}

export default Logo;
