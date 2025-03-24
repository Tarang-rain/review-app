"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "../side-bar";
import TestimonialCard from "../TestimonialCard";
import { useEffect, useState } from "react";
import { Wall } from "@/components/wall-of-love";

interface TestimonialData {
	name: string;
	review: string;
	createdAt: string;
	rating?: number;
	email?: string;
	socialLink?: string;
	address?: string;
	company?: string;
	answers?: Array<Record<string, string>>;
	space_id?: string;
	submittedAt?: string;
	is_liked?: boolean;
	testimonial_id: string;
	type: string;
}

interface TestimonialDocument {
	testimonialData: TestimonialData;
}

interface ParentLayoutProps {
	testimonials: TestimonialDocument[] | undefined;
}

const ParentLayout = ({ testimonials }: ParentLayoutProps) => {
	const [selectedRoute, setSelectedRoute] = useState("All");
	const [filteredTestimonials, setFilteredTestimonials] = useState<
		TestimonialDocument[]
	>([]);
	const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});
	const [widget, setWidget] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	useEffect(() => {
		if (!testimonials) return;

		let filtered = [...testimonials];

		switch (selectedRoute) {
			case "All":
				break;
			case "Liked":
				filtered = testimonials.filter(
					(testimonial) => testimonial.testimonialData.is_liked
				);
				setIsEmpty((prev) => ({ ...prev, Liked: false }));
				break;
			case "Text":
				filtered = testimonials.filter(
					(testimonial) => testimonial.testimonialData.type === "text"
				);
				break;
			case "Video":
				filtered = testimonials.filter(
					(testimonial) => testimonial.testimonialData.type === "video"
				);
				setIsEmpty((prev) => ({ ...prev, Video: false }));
				console.log(isEmpty);
				break;
		}

		setFilteredTestimonials(filtered);
	}, [testimonials, selectedRoute]);

	return (
		<>
			<div className="container mx-auto px-4 mt-8">
				<div className="flex gap-6 flex-col lg:flex-row">
					<aside className="w-[20%] min-w-[250px]">
						<div className="sticky top-24">
							<ScrollArea className="h-[calc(100vh-8rem)]">
								<Sidebar
									isModalOpen={isModalOpen}
									toggleModal={toggleModal}
									selectedRoute={selectedRoute}
									setSelectedRoute={setSelectedRoute}
									widget={widget}
									setWidget={setWidget}
								/>
							</ScrollArea>
						</div>
					</aside>

					<main className="flex-1">
						{filteredTestimonials && filteredTestimonials.length > 0 ? (
							<div className="grid gap-4">
								{filteredTestimonials.map((testimonial, index) => (
									<TestimonialCard
										key={`${testimonial.testimonialData.testimonial_id}-${index}`}
										testimonialData={{
											testimonial_id:
												testimonial?.testimonialData?.testimonial_id,
											review: testimonial?.testimonialData?.review,
											name: testimonial?.testimonialData?.name,
											email: testimonial.testimonialData.email,
											rating: testimonial.testimonialData.rating,
											socialLink: testimonial.testimonialData.socialLink,
											address: testimonial.testimonialData.address,
											createdAt: testimonial.testimonialData.createdAt,
											company: testimonial.testimonialData.company,
											is_liked: testimonial.testimonialData.is_liked,
										}}
									/>
								))}
							</div>
						) : (
							<div className="text-center py-12 bg-muted/10 rounded-lg">
								<span className="text-muted-foreground">
									{selectedRoute && !isEmpty[selectedRoute] && (
										<p>No {selectedRoute} testimonials</p>
									)}
								</span>
							</div>
						)}
					</main>
				</div>
			</div>

			<Wall isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
};

export default ParentLayout;
