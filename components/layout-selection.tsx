import React, { useState } from "react";
import { Layout, Columns, ChevronRight } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { EmbedLayout } from "./embed-layout";

export const LayoutSelection = () => {
	const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

	const layouts = [
		{
			id: "carousel",
			title: "Carousel Layout",
			description: "Showcase your content in a sliding carousel view",
			icon: Layout,
		},
		{
			id: "masonry",
			title: "Masonry Layout",
			description: "Display content in a dynamic grid layout",
			icon: Columns,
		},
	];

	if (selectedLayout === "carousel") {
		return <EmbedLayout layoutType={selectedLayout} />;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
			{layouts.map((layout) => {
				const Icon = layout.icon;
				return (
					<Card
						key={layout.id}
						className={cn(
							"relative cursor-pointer transition-all hover:border-primary hover:shadow-md",
							"group"
						)}
						onClick={() => setSelectedLayout(layout.id)}
					>
						<CardHeader className="space-y-2">
							<div className="flex items-center justify-between">
								<Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
								<ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-transform group-hover:translate-x-1" />
							</div>
							<CardTitle className="text-lg">{layout.title}</CardTitle>
							<CardDescription>{layout.description}</CardDescription>
						</CardHeader>
					</Card>
				);
			})}
		</div>
	);
};
