import { db } from "@/dbConnect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "lucide-react";
import { SpacesDisplay } from "./spaces-display";
import CreateSpaceButton from "./create-space-button";
import { SpaceCardType } from "./SpaceCardType";
import { auth } from "@/lib/auth";

export default async function Overview() {
	const session = await auth();
	const collection = db?.collection("space-collection");

	console.log(collection);
	const rawSpacesData = await collection
		?.find({
			id: session?.user?.id,
		})
		.toArray();

	const spacesData = rawSpacesData?.map((doc) => ({
		space_name: doc.space_name,
		is_squareprofile: doc.is_squareprofile || false,
		imageUrl: doc.imageUrl,
	})) as SpaceCardType[];

	const stats = {
		totalSpaces: spacesData.length,
	};

	return (
		<div className="space-y-8 p-8 pt-24">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Overview</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-6">
					<Card className="hover:shadow-lg transition-shadow duration-200">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Spaces
							</CardTitle>
							<Layout className="h-5 w-5 text-primary" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats.totalSpaces}</div>
							<p className="text-xs text-muted-foreground mt-1">
								{stats.totalSpaces === 0
									? "No active spaces"
									: `${stats.totalSpaces} active spaces`}
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-3xl font-bold tracking-tight">Spaces</h2>
					<CreateSpaceButton />
				</div>

				<SpacesDisplay spaces={spacesData} />
			</div>
		</div>
	);
}
