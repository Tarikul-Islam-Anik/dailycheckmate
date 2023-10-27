'use client';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

const LoginBtn = () => {
  return (
    <Button
      onClick={() =>
        signIn('google', {
          callbackUrl: '/',
        })
      }
      className=' fixed right-16 top-4'
    >
      Sign In
    </Button>
  );
};

export default LoginBtn;
