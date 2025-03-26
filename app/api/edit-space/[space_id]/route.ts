import { db } from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PUT = async (req: NextRequest) => {
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

		const spaceId = req.url.split("/")[req.url.split("/").length - 1];
		const collection = db?.collection("space-collection");
		const userId = session?.user?.id;

		const existingSpace = await collection?.findOne({
			space_id: spaceId,
			id: userId,
		});

		if (!existingSpace) {
			return NextResponse.json({ message: "Space not found" }, { status: 404 });
		}

		let imageUrl = existingSpace.imageUrl;
		if (image && image.startsWith("data:image")) {
			// Delete existing image from Cloudinary if it exists
			if (existingSpace.imageUrl) {
				const publicId = existingSpace.imageUrl.split("/").pop()?.split(".")[0];
				if (publicId) {
					await cloudinary.uploader.destroy(`review-images/${publicId}`);
				}
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

		// Prepare update data
		const updateData = {
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

		// Update the space
		const result = await collection?.updateOne(
			{ space_id: spaceId, id: userId },
			{ $set: updateData }
		);

		return NextResponse.json(
			{
				message: "Space updated successfully",
				imageUrl,
				updatedCount: result?.modifiedCount,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating space in MongoDB:", error);
		return NextResponse.json(
			{ message: "Error updating space", error: error },
			{ status: 500 }
		);
	}
};
