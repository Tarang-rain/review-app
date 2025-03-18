import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation'
import Navbar from '@/components/navbar'
import Overview from "@/components/overview";

const page = async () => {
  const session = await auth()

  if(!session){
    redirect("/login")
  }

  return (
  <> 
    <Navbar />
    <Overview />
  </>
  )

};

export default page;
