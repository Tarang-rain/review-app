import { auth } from "@/lib/auth";
import UserMenu from "./UserMenu";


const navbar = async () => {
  const session = await auth()
  

  return   (  
    <nav className="fixed w-full z-50 top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 border-b border-secondary">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <h1 className="font-semibold text-2xl">Review App</h1>
        {session?.user?.image && <UserMenu userImage={session?.user?.image} />}
      </div>
    </nav>
  )
};

export default navbar;
