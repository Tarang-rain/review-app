
import { Metadata } from 'next'
import Navbar from '@/components/navbar';
import SpaceNavbar from '../SpaceNavbar'
import { db } from '@/dbConnect';
import { auth } from '@/lib/auth';

interface SpacePageParams {
  params: {
    spacename: string; 
  }
}


const Page = async ({ params }: SpacePageParams) => {
  const { spacename } = await params;   
  const session =  await auth()
  const userId = session?.user?.id;
  const collection = db?.collection("review-collection")

  const rawSpacesData = await collection?.findOne({
    id: userId,
    space_name: { $regex: new RegExp(`^${spacename}$`, 'i') }
  });


  return (    
    <>
    <Navbar />

    <div className='mt-20'>
        <SpaceNavbar spaceName={spacename}/>
    </div>
    </>
  )
}

export default Page