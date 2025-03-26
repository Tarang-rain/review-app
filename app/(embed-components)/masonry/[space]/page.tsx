import React, { Suspense } from "react";
import { db } from "@/dbConnect";
import TestimonialMasonry from "./TestimonialMasonry";

interface EmbedPageParams {
	params: {
		space: string;
	};
}

const TestimonialLoadingSkeleton = () => (
	<div className="max-w-6xl mx-auto p-4 md:p-8">
		<div className="animate-pulse space-y-4">
			<div className="h-8  rounded w-3/4"></div>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{[...Array(6)].map((_, index) => (
					<div key={index} className=" rounded-lg h-48"></div>
				))}
			</div>
		</div>
	</div>
);

async function fetchTestimonials(space: string) {
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

	return { spaceData, serializedTestimonials };
}

const Page = async ({ params }: EmbedPageParams) => {
	const { space } = await params;

	const { spaceData, serializedTestimonials } = await fetchTestimonials(space);

	if (!spaceData) {
		return <div>Space not found</div>;
	}

	return (
		<div className="max-w-6xl mx-auto p-4 md:p-8">
			<div className="mb-12">
				<Suspense fallback={<TestimonialLoadingSkeleton />}>
					<TestimonialMasonry testimonials={serializedTestimonials || []} />
				</Suspense>
			</div>
		</div>
	);
};

export default Page;
