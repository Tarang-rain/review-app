import { db } from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function PUT(req: NextRequest) {
	const data = await req.json();
	const id = req.url.split("/")[req.url.split("/").length - 1];

	console.log("data", data);
	try {
		const collection = db?.collection("testimonials");

		const testimonial_id = uuid();

		const updatedData = {
			testimonial_id,
			...data,
			is_liked: false,
			type: "text",
			updatedAt: new Date().toISOString(),
		};

		const updatedTestimonial = await collection?.updateOne(
			{ "testimonialData.testimonial_id": id },
			{ $set: { testimonialData: updatedData } }
		);

		if (updatedTestimonial?.matchedCount === 0) {
			throw new Error(`No testimonial found with testimonial_id: ${id}`);
		}

		return NextResponse.json({
			status: 200,
			success: true,
			message: "Testimonial updated successfully.",
			updatedCount: updatedTestimonial?.modifiedCount,
		});
	} catch (err) {
		console.error("Error in database action:", err);
		throw err;
	}
}
