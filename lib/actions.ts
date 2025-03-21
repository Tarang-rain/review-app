"use server";

import { signIn, signOut } from "./auth";
import { db } from "@/dbConnect";

export async function login() {
	await signIn("google", { redirectTo: "/" });
}

export async function logout() {
	await signOut({ redirectTo: "/login" });
}

export async function toggleLiked(id: string, is_liked: boolean) {
	try {
		const collection = db?.collection("testimonials");
		const toggle = await collection?.updateOne(
			{ "testimonialData.testimonial_id": id },
			{
				$set: { "testimonialData.is_liked": is_liked },
			}
		);
		return toggle;
	} catch (err) {
		console.error("Error in database action:", err);
		throw err;
	}
}
