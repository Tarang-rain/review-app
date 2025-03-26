import Navbar from "@/components/navbar";
import SpaceNavbar from "../SpaceNavbar";
import { db } from "@/dbConnect";
import { auth } from "@/lib/auth";
import ParentLayout from "./parent-layout";

interface SpacePageParams {
	params: {
		spacename: string;
	};
}

const Page = async ({ params }: SpacePageParams) => {
	const { spacename } = await params;
	const session = await auth();
	const userId = session?.user?.id;
	const decodedSpaceName = decodeURI(spacename);

	const spaceData = await db?.collection("space-collection").findOne({
		id: userId,
		space_name: { $regex: decodedSpaceName, $options: "i" },
	});

	const spaceId = spaceData?.space_id?.toString()!;

	const testimonials = await db
		?.collection("testimonials")
		.find({
			"testimonialData.space_id": spaceId,
		})
		.toArray();

	const serializedTestimonials = testimonials?.map((testimonial) => ({
		id: testimonial._id.toString(),
		testimonialData: {
			...testimonial.testimonialData,
			createdAt:
				testimonial.testimonialData.createdAt instanceof Date
					? testimonial.testimonialData.createdAt.toISOString()
					: testimonial.testimonialData.createdAt,
			submittedAt:
				testimonial.testimonialData.submittedAt instanceof Date
					? testimonial.testimonialData.submittedAt.toISOString()
					: testimonial.testimonialData.submittedAt,
		},
	}));

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />

			<div className="mt-20 flex-1">
				<SpaceNavbar spaceName={spacename} spaceId={spaceId} />
				<ParentLayout
					testimonials={serializedTestimonials}
					spaceName={spacename}
				/>
			</div>
		</div>
	);
};

export default Page;
