import React from "react";
import { db } from "@/dbConnect";
import TestimonialCarousel from "./TestimonialCarousel";
import TestimonialMasonry from "./TestimonialMasonry";

interface EmbedPageParams {
	params: {
		space: string;
	};
}

const Page = async ({ params }: EmbedPageParams) => {
	const { space } = await params;
	const decodedSpaceName = decodeURI(space);

	const spaceData = await db?.collection("space-collection").findOne({
		space_name: { $regex: decodedSpaceName, $options: "i" },
	});

	const testimonials = await db?.collection("testimonials").find({}).toArray();

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

	// If no space data is found, return an error or placeholder
	if (!spaceData) {
		return <div>Space not found</div>;
	}

	return (
		<div className="max-w-6xl mx-auto p-4 md:p-8">
			<div className="mb-12">
				{/* <TestimonialCarousel testimonials={serializedTestimonials || []} /> */}
				<TestimonialMasonry testimonials={serializedTestimonials || []} />
			</div>
		</div>
	);
};

export default Page;
