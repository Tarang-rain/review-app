'use server'
import { db } from '@/dbConnect'
import { Layout, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

export default async function Spaces() {


  if (!db) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        Database connection error. Please check your configuration.
      </div>
    )
  }

  const collection = db.collection("review-collection")
  const spacesData = await collection.find({}).toArray()
  
  return (
    <div>
      {spacesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-card text-card-foreground border shadow-sm">
          <Layout className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No spaces yet</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
            Create your first space to start collaborating and organizing your videos.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Space
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 bg-card text-card-foreground border shadow-sm">
          {spacesData.map((space, index) => (
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
  )
}