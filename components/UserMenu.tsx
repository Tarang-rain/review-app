'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";

interface UserMenuProps {
  userImage: string;
}

const UserMenu = ({ userImage }: UserMenuProps) => {
  const handleLogout = async() => {
    await logout()
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <img 
            src={userImage} 
            alt="user profile" 
            className="h-10 w-10 rounded-full object-cover"
          />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;