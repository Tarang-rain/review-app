import { db } from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth";
import { v4 as uuid } from "uuid";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		const session = await auth();

		if (!session || !session.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await req.json();

		const {
			questions,
			header,
			custom_message,
			space_name,
			required_fields,
			collection_type,
			show_ratings,
			theme,
			button_color,
			is_squareprofile,
			image,
		} = data;

		let imageUrl = null;
		const collection = db?.collection("space-collection");

		const userId = session?.user?.id;
		const existingSpace = await collection?.findOne({
			id: userId,
			space_name: space_name,
		});

		if (existingSpace) {
			return NextResponse.json(
				{ message: "a space with this name already exists" },
				{ status: 409 }
			);
		}

		if (image) {
			if (!image.startsWith("data:image")) {
				return NextResponse.json(
					{ message: "Invalid image format" },
					{ status: 400 }
				);
			}

			const base64Image = image.split(",")[1];

			const uploadResponse = await cloudinary.uploader.upload(
				`data:image/jpeg;base64,${base64Image}`,
				{
					folder: "review-images",
					use_filename: true,
					unique_filename: true,
				}
			);

			imageUrl = uploadResponse.secure_url;
		}

		const newUuid = uuid();

		const collectionData = {
			id: userId,
			space_id: newUuid,
			questions,
			header,
			custom_message,
			space_name,
			required_fields,
			collection_type,
			show_ratings,
			theme,
			button_color,
			is_squareprofile,
			imageUrl,
		};
		await collection?.insertOne(collectionData);

		return NextResponse.json(
			{ message: "Data inserted successfully", imageUrl },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error inserting data into MongoDB:", error);

		return NextResponse.json(
			{ message: "Error inserting data", error: error },
			{ status: 500 }
		);
	}
};
