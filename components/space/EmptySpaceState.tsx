import { Layout } from 'lucide-react'
import CreateFirstSpaceButton from './CreateSpaceButton'

export default function EmptySpaceState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-card text-card-foreground border shadow-sm">
      <Layout className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold text-muted-foreground mb-2">No spaces yet</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        Create your first space to start collaborating and organizing your videos.
      </p>
      <CreateFirstSpaceButton />
    </div>
  )
}