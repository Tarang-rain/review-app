import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/dbConnect";
import { serializeDocument } from "@/lib/helper";

export async function GET(req: NextRequest) {
	const id = req.url.split("/")[req.url.split("/").length - 1];

	const session = await auth();
	if (!session || !session.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const collection = db?.collection("space-collection");

	try {
		const space = await collection?.findOne({
			space_id: id,
			id: session.user.id,
		});

		if (!space) {
			return NextResponse.json({ message: "Space Not Found" }, { status: 404 });
		}

		// Serialize the document
		const serializedSpace = serializeDocument(space);

		return NextResponse.json({ space: serializedSpace });
	} catch (error) {
		console.error("Error fetching space:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
