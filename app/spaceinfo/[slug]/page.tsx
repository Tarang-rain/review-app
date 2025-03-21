import { db } from "@/dbConnect";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { SpaceActionButtons } from "../SpaceActionButtons";

interface SpacePageParams {
	params: {
		slug: string;
	};
}

interface SpaceData {
	space_id: string;
	id: string;
	questions: string[];
	header: string;
	custom_message: string;
	space_name: string;
	required_fields: {
		name: { enabled: boolean; required: boolean };
		email: { enabled: boolean; required: boolean };
		socialLink: { enabled: boolean; required: boolean };
		address: { enabled: boolean; required: boolean };
	};
	collection_type: string;
	show_ratings: boolean;
	theme: boolean;
	button_color: string;
	is_squareprofile: boolean;
	imageUrl: string;
}

const Page = async ({ params }: SpacePageParams) => {
	const { slug } = await params;
	const collection = db?.collection("space-collection");

	const rawSpacesData = await collection?.findOne({
		space_id: slug,
	});

	const serializedData: SpaceData = {
		space_id: rawSpacesData?.space_id || "",
		id: rawSpacesData?.id || "",
		questions: rawSpacesData?.questions || [],
		header: rawSpacesData?.header || "",
		custom_message: rawSpacesData?.custom_message || "",
		space_name: rawSpacesData?.space_name || "",
		required_fields: rawSpacesData?.required_fields || {
			name: { enabled: false, required: false },
			email: { enabled: false, required: false },
			socialLink: { enabled: false, required: false },
			address: { enabled: false, required: false },
		},
		collection_type: rawSpacesData?.collection_type || "",
		show_ratings: rawSpacesData?.show_ratings || false,
		theme: rawSpacesData?.theme || false,
		button_color: rawSpacesData?.button_color || "",
		is_squareprofile: rawSpacesData?.is_squareprofile || false,
		imageUrl: rawSpacesData?.imageUrl || "",
	};
                                                           
	return (
		<div
			className={cn(
				"xl:w-1/3 lg:w-1/2 p-8 mx-auto flex items-center justify-center",
				`${
					serializedData.questions.length > 4 && "overflow-y-auto scroll-smooth"
				}`
			)}
		>
			<Card className="flex justify-center items-center  rounded-xl shadow-sm border flex-col p-8 space-y-6">
				{/* Profile Image */}
				{serializedData.imageUrl ? (
					<img
						src={serializedData.imageUrl}
						alt="space-image"
						className={cn(
							"w-24 h-24 bg-muted object-cover",
							serializedData.is_squareprofile ? "rounded-md" : "rounded-full"
						)}
					/>
				) : (
					<span
						className={cn(
							"w-12 h-12 bg-muted",
							serializedData.is_squareprofile ? "rounded-md" : "rounded-full"
						)}
					/>
				)}

				{/* Header and Custom Message */}
				<div className="space-y-4 text-center">
					<h4 className="text-2xl font-semibold text-foreground">
						{serializedData.header}
					</h4>
					<p className="text-lg text-muted-foreground">
						{serializedData.custom_message}
					</p>
				</div>

				{/* Questions Section */}
				<div className="w-full space-y-4">
					<h4 className="text-xl font-semibold text-foreground">Questions</h4>
					<div className="space-y-3">
						{serializedData.questions.map((question: string, index: number) => (
							<p
								key={index}
								className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg"
							>
								{question}
							</p>
						))}
					</div>
				</div>

				{/* Buttons Section */}
				<SpaceActionButtons spaceData={serializedData} />
			</Card>
		</div>
	);
};

export default Page;
