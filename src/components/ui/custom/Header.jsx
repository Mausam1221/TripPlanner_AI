import React from "react";
import { Button } from "../button";

function Header() {
  return (
    <>
      <div>
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
          <img src="/logo.svg" alt="" srcset="" />
          <Button>Sign In</Button>
        </div>
      </div>
    </>
  );
}

export default Header;
