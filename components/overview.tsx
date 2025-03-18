'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Video, Layout } from "lucide-react";
import { useState } from "react";
import SpaceModal from "./spacemodal";

// Static data
const stats = {
  totalVideos: 0,
  totalSpaces: 0,
};

const spaces:any = [];

const Overview = () => {
  const [open, setOpen] = useState(false);

  const onOpenChange = ()=>{
    setOpen(prev=>!prev)
  }

  return (
    <>
    <div className="space-y-8 p-8 pt-24">
      {/* Overview Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVideos}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalVideos === 0 ? "No videos yet" : `+${stats.totalVideos} videos this week`}
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
              <Layout className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSpaces}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalSpaces === 0 ? "No active spaces" : `${stats.totalSpaces} active spaces`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Spaces Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Spaces</h2>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Space
          </Button>
        </div>
        
        {spaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-card text-card-foreground border shadow-sm">
            <Layout className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">No spaces yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
              Create your first space to start collaborating and organizing your videos.
            </p>
            <Button className="bg-primary hover:bg-primary/90" onClick={onOpenChange}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Space
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 bg-card text-card-foreground border shadow-sm">
            {spaces.map((space:any, index:number) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {space.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {space.videoCount} videos • Last updated {space.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>

        <SpaceModal onOpenChange={onOpenChange} open={open}/>

    </>
  );
};

export default Overview;