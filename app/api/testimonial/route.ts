import { db } from "@/dbConnect";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();

		const session = await auth();

		if (!session || !session.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const testimonial_id = uuid();

		const testimonialData = {
			testimonial_id,
			...data,
			type: "text",
			is_liked: false,
			createdAt: data.submittedAt || new Date().toISOString(),
		};

		const result = await db
			?.collection("testimonials")
			.insertOne({ testimonialData });

		return NextResponse.json(
			{
				status: 200,
				message: "Testimonial posted successfully",
				id: result?.insertedId,
			},
			{ status: 200 }
		);
	} catch (err) {
		// Log the actual error
		console.error("Error saving testimonial:", err);
		return NextResponse.json(
			{ status: 500, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
