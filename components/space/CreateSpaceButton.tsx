'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SpaceModal from "../spacemodal";

export default function CreateSpaceButton() {
  const [open, setOpen] = useState(false);
  
  const onOpenChange = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <Button 
        className="bg-primary hover:bg-primary/90"
        onClick={onOpenChange}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Space
      </Button>
      <SpaceModal onOpenChange={onOpenChange} open={open} />
    </>
  );
}