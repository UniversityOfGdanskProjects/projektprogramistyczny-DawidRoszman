import React from "react";

import { Button } from "@/components/ui/button";

const navMenu = () => {
  return (
    <nav className="w-screen bg-red-800 py-5 px-3 flex justify-between">
      <div>
        <strong className="text-2xl">Cinema</strong>
      </div>
      <div className="flex gap-4">
        <Button> Log in </Button>
        <Button> Register </Button>
      </div>
    </nav>
  );
};

export default navMenu;
