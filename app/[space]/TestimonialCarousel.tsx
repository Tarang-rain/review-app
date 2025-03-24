"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

interface TestimonialCarouselProps {
	testimonials: Testimonial[];
	className?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
	testimonials,
	className,
}) => {
	const [current, setCurrent] = React.useState(0);
	const [transitioning, setTransitioning] = React.useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://testimonial.to/js/iframeResizer.contentWindow.min.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const itemsPerPage = 2;
	const totalPages = Math.ceil(testimonials.length / itemsPerPage);

	const nextSlide = () => {
		if (transitioning) return;
		setTransitioning(true);
		setTimeout(() => {
			setCurrent((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
			setTransitioning(false);
		}, 300);
	};

	const prevSlide = () => {
		if (transitioning) return;
		setTransitioning(true);
		setTimeout(() => {
			setCurrent((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
			setTransitioning(false);
		}, 300);
	};

	if (!testimonials || testimonials.length === 0) {
		return <div className="text-center py-8">No testimonials available</div>;
	}

	const currentTestimonials = testimonials.slice(
		current * itemsPerPage,
		current * itemsPerPage + itemsPerPage
	);

	return (
		<div className={cn("relative w-full min-h-[251px]", className)}>
			<Card className="border-none shadow-md overflow-hidden bg-background">
				<CardContent className="p-0">
					<div className="grid md:grid-cols-2 gap-6 min-h-64 p-6 md:p-8 justify-items-center items-center">
						{currentTestimonials.map((testimonial) => {
							const { name, company, rating, review, testimonial_id } =
								testimonial.testimonialData;
							return (
								<div
									key={testimonial_id}
									className={cn(
										"transition-transform duration-300 ease-in-out",
										transitioning && "opacity-0"
									)}
								>
									<blockquote className="text-lg md:text-xl font-medium text-foreground mb-6">
										{review}
									</blockquote>

									<div className="flex items-center mt-4">
										<Avatar className="h-12 w-12 mr-4">
											<AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-foreground">{name}</p>
											{company && (
												<p className="text-muted-foreground text-sm">
													{company}
												</p>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Navigation controls */}
			<div className="flex justify-between mt-4">
				<Button
					onClick={prevSlide}
					variant="outline"
					size="icon"
					className="rounded-full"
					disabled={transitioning}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				<div className="flex gap-1 items-center">
					{Array.from({ length: totalPages }).map((_, index) => (
						<div
							key={index}
							className={cn(
								"h-2 w-2 rounded-full transition-all duration-300",
								current === index
									? "bg-primary w-4"
									: "bg-muted hover:bg-primary/50 cursor-pointer"
							)}
							onClick={() => setCurrent(index)}
						/>
					))}
				</div>

				<Button
					onClick={nextSlide}
					variant="outline"
					size="icon"
					className="rounded-full"
					disabled={transitioning}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default TestimonialCarousel;
