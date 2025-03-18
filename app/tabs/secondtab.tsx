import React from "react";

const firsttab = () => {
  return (
    <>
    
    <div className="flex-1 p-8">
<div className="space-y-6">
  <div className="space-y-2">
    <label className="text-sm font-medium">Second Tab</label>
    <input
      type="text"
      className="w-full px-4 py-2 rounded-lg border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      placeholder="Enter welcome message"
    />
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium">Brand Color</label>
    <div className="flex gap-4">
      {["#FF0000", "#00FF00", "#0000FF", "#FFA500"].map((color) => (
        <div
          key={color}
          className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-background ring-transparent hover:ring-primary transition-all"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium">Layout Style</label>
    <div className="grid grid-cols-2 gap-4">
      {["Modern", "Classic"].map((style) => (
        <div
          key={style}
          className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-muted/40 transition-colors"
        >
          <div className="h-24 bg-muted rounded-md mb-2" />
          <p className="text-sm font-medium text-center">{style}</p>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
</>
  )
};

export default firsttab;
