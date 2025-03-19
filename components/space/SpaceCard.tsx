import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Globe } from 'lucide-react'
import Link from 'next/link'

export default function SpaceCard({ space }: any) {
  return (
    <Link href={`/space/${space.space_name.toLowerCase()}`}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-row items-center p-4">
        <div className="mr-4">
          {space.imageUrl && space.imageUrl !== "" ? (
            <img 
              src={space.imageUrl} 
              alt="Space Image" 
              className={`bg-secondary p-2 w-16 h-16 ${space.is_squareprofile ? '' : 'rounded-full'}`} 
            />
          ) : (
            space.is_squareprofile ? 
              <Globe className="bg-secondary p-2 w-16 h-16"/> : 
              <Globe className="bg-secondary p-2 rounded-full w-16 h-16"/>
          )}
        </div>
        <div>
          <CardTitle className="transition-colors first-letter:capitalize">
            {space.space_name}
          </CardTitle>
        </div>
      </Card>
    </Link>
  )
}