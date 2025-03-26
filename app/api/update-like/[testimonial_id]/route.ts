import { db } from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
	const data = await req.json();
	console.log(req.url);
	const id = req.url.split("/")[req.url.split("/").length - 1];

	const { is_liked } = data;
	try {
		const collection = db?.collection("testimonials");
		const toggle = await collection?.updateOne(
			{ "testimonialData.testimonial_id": id },
			{
				$set: { "testimonialData.is_liked": is_liked },
			}
		);
		return NextResponse.json({ status: 200, acknowledged: true });
	} catch (err) {
		console.error("Error in database action:", err);
		throw err;
	}
}
