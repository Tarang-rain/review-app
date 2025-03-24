"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial {
	id: string;
	testimonialData: {
		testimonial_id: string;
		review: string;
		rating: number;
		name: string;
		email?: string;
		socialLink?: string;
		address?: string;
		submittedAt: string;
		company?: string;
		space_id: string;
		type: string;
		is_liked: boolean;
		createdAt: string;
	};
}

interface TestimonialMasonryProps {
	testimonials: Testimonial[];
	className?: string;
}

const TestimonialMasonry: React.FC<TestimonialMasonryProps> = ({
	testimonials,
	className,
}) => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://testimonial.to/js/iframeResizer.contentWindow.min.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);
	if (!testimonials || testimonials.length === 0) {
		return <div className="text-center py-8">No testimonials available</div>;
	}

	return (
		<div className={cn("w-full px-4 md:px-8", className)}>
			<div className="columns-1 sm:columns-2 md:columns-3  gap-6 space-y-6">
				{testimonials.map((testimonial) => {
					const { name, company, review, testimonial_id } =
						testimonial.testimonialData;

					return (
						<Card
							key={testimonial_id}
							className="break-inside-avoid bg-background shadow-md transition-transform duration-300 hover:scale-[1.02]"
						>
							<CardContent className="p-6">
								<blockquote className="text-base md:text-lg font-medium text-foreground mb-4">
									{review}
								</blockquote>

								<div className="flex items-center mt-4">
									<Avatar className="h-12 w-12 mr-4">
										<AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
									</Avatar>
									<div>
										<p className="font-semibold text-foreground">{name}</p>
										{company && (
											<p className="text-muted-foreground text-sm">{company}</p>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default TestimonialMasonry;
