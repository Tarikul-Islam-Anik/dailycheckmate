"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const LoginBtn = () => {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
      className=" fixed top-4 right-16"
    >
      Sign In
    </Button>
  );
};

export default LoginBtn;
