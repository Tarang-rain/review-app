'use client'
import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions";
import { cn } from "@/lib/utils";
import React from "react";
import { Geist } from "next/font/google";

const geist = Geist( { 
    variable: '--font-geist',
    weight: ['500','600'],
    fallback: ['system-ui', 'arial'],
    subsets: ['latin']
});


const page = () => {
  const handleClick = async() =>{
    await login()
  }
  return <div className={cn('flex justify-center items-center h-screen ', geist.className)}>

    <Button onClick={handleClick} className="w-72">
        <img src="/google.svg" alt="Google icon" className="w-4 h-4"/>
      Login
    </Button>
  </div>;
};

export default page;
