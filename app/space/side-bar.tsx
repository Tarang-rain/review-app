"use client";

import { cn } from "@/lib/utils";
import { Inbox, Heart, Video, Text, Grid, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Wall from "@/components/wall-of-love";
import SingleTestimonial from "@/components/single-testimonial";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	selectedRoute: string;
	setSelectedRoute: React.Dispatch<React.SetStateAction<string>>;
	widget: string;
	setWidget: React.Dispatch<React.SetStateAction<string>>;
}

export function Sidebar({
	className,
	selectedRoute,
	setSelectedRoute,
	widget,
	setWidget,
}: SidebarProps) {
	const inboxRoutes = [
		{
			label: "All",
			icon: Inbox,
		},
		{
			label: "Liked",
			icon: Heart,
		},
		{
			label: "Video",
			icon: Video,
		},
		{
			label: "Text",
			icon: Text,
		},
	];

	const widgetRoutes = [
		{
			label: "Wall of Love",
			icon: Grid,
			component: <Wall />,
		},
		{
			label: "Single Testimonial",
			icon: Quote,
			component: <SingleTestimonial />,
		},
	];

	const renderWidgetComponent = () => {
		const selectedWidget = widgetRoutes.find((route) => route.label === widget);
		console.log(selectedWidget?.component);
		return selectedWidget ? selectedWidget?.component : null;
	};

	return (
		<>
			<div className={cn("pb-12", className)}>
				<div className="space-y-4 py-4">
					<div className="px-3 py-2">
						<ScrollArea className="h-[calc(100vh-10rem)]">
							<div className="space-y-4">
								<div>
									<h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
										Inbox
									</h2>
									<div className="space-y-1">
										{inboxRoutes.map((route) => (
											<Button
												key={route.label}
												variant="ghost"
												onClick={() => setSelectedRoute(route.label)}
												className={cn(
													"w-full justify-start",
													selectedRoute === route.label && "bg-secondary"
												)}
											>
												<route.icon className="mr-2 h-4 w-4" />
												{route.label}
											</Button>
										))}
									</div>
								</div>

								<Separator />

								{/* Widgets Section */}
								<div>
									<h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
										Widgets
									</h2>
									<div className="space-y-1">
										{widgetRoutes.map((route) => (
											<Button
												key={route.label}
												variant="ghost"
												onClick={() => setWidget(route.label)}
												className={cn("w-full justify-start")}
											>
												<route.icon className="mr-2 h-4 w-4" />
												{route.label}
											</Button>
										))}
									</div>
								</div>
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>

			<div className="flex-1 p-4 md:p-6">
				<div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
					<h2 className="text-xl font-bold mb-6">{widget || "Widget"}</h2>
					<div className="w-full">{renderWidgetComponent()}</div>
				</div>
			</div>
		</>
	);
}
