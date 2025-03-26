"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Quote,
	Calendar,
	Building2,
	Mail,
	MapPin,
	Link as LinkIcon,
	Star,
	Pencil,
	Trash2,
	MoreVertical,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toggleLiked } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { TestimonialEditModal } from "./[spacename]/testimonial-edit-modal";
import axios from "axios";
import toast from "react-hot-toast";

interface TestimonialData {
	testimonial_id: string;
	name: string;
	review: string;
	createdAt: string;
	rating?: number;
	email?: string;
	socialLink?: string;
	address?: string;
	company?: string;
	is_liked?: boolean;
	submitted_at: string;
}

interface RequiredField {
	enabled: boolean;
	required: boolean;
}

interface SpaceData {
	space_id: string;
	questions: string[];
	required_fields: {
		[key: string]: RequiredField;
	};
	header: string;
	custom_message: string;
	imageUrl?: string;
	is_squareprofile?: boolean;
	show_ratings?: boolean;
	submitted_at?: string | undefined;
}

interface TestimonialCardProps {
	testimonialData: TestimonialData;
	spaceData: SpaceData;

	// onEdit?: () => void;
	// onDelete?: () => void;
	// onButtonClick?: () => void;
}

const TestimonialCard = ({
	testimonialData,
	spaceData,
}: // onEdit,
// onDelete,
// onButtonClick,
TestimonialCardProps) => {
	const [isLiked, setIsLiked] = useState(testimonialData.is_liked);
	const [openEditTestimonialModal, setOpenEditTestimonialModal] =
		useState(false);
	const router = useRouter();
	const formattedDate = new Date(testimonialData.createdAt).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "short",
			day: "numeric",
		}
	);
	const handleLikeChange = async (id: string, is_liked: boolean) => {
		setIsLiked((prev) => !prev);
		try {
			const res = await axios.put(`/api/update-like/${id}`, { is_liked });
			if (!res.data) {
				throw new Error("Error while liking");
			}
			router.refresh();
			if (!res.data.acknowledged) {
				setIsLiked(is_liked);
			}
		} catch (error) {
			setIsLiked(is_liked);
			console.error("Error toggling like:", error);
		}
	};

	const toggle = () => setOpenEditTestimonialModal((prev) => !prev);

	return (
		<>
			<Card className="relative group overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/5">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
					<Button
						variant={isLiked ? "default" : "outline"}
						size="icon"
						onClick={() =>
							handleLikeChange(
								testimonialData.testimonial_id,
								!isLiked as boolean
							)
						}
						className={`h-8 w-8 ${
							isLiked ? "bg-primary hover:bg-primary/90" : "bg-transparent"
						}`}
					>
						{isLiked ? (
							<Star className="h-4 w-4 fill-primary-foreground" />
						) : (
							<Star className="h-4 w-4" />
						)}
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								className="gap-2"
								onClick={() => setOpenEditTestimonialModal((prev) => !prev)}
							>
								<Pencil className="h-4 w-4" />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								// onClick={onDelete}
								className="text-destructive gap-2"
							>
								<Trash2 className="h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<CardContent className="pt-12 pb-6">
					<Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20 rotate-180 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary/30" />

					<div className="space-y-6">
						<div className="relative">
							<div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
							<p className="text-lg leading-relaxed italic text-muted-foreground group-hover:text-foreground transition-colors duration-300">
								{testimonialData.review}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-2">
							{testimonialData.rating && (
								<Badge
									variant="secondary"
									className="px-2 py-1 transition-colors duration-300 group-hover:bg-primary/10"
								>
									<div className="flex items-center gap-1">
										<Star className="w-3 h-3 fill-primary text-primary animate-pulse" />
										<span>{testimonialData.rating}</span>
									</div>
								</Badge>
							)}
							{testimonialData.company && (
								<Badge
									variant="outline"
									className="px-2 py-1 transition-all duration-300 group-hover:border-primary/30"
								>
									<div className="flex items-center gap-1">
										<Building2 className="w-3 h-3" />
										<span>{testimonialData.company}</span>
									</div>
								</Badge>
							)}
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col items-start gap-4 pb-6 pt-2 relative">
					<div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
						<div className="group-hover:translate-x-1 transition-transform duration-300">
							<p className="font-semibold text-foreground/90 group-hover:text-foreground transition-colors duration-300">
								{testimonialData.name}
							</p>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<Calendar className="w-3 h-3" />
								<span>{formattedDate}</span>
							</div>
						</div>

						<div className="flex flex-wrap gap-3 text-sm text-muted-foreground flex-col">
							{testimonialData.email && (
								<a
									href={`mailto:${testimonialData.email}`}
									className="hover:text-primary transition-all duration-300 flex items-center gap-1 group-hover:translate-x-1"
								>
									<Mail className="w-3 h-3" />
									<span>{testimonialData.email}</span>
								</a>
							)}
							{testimonialData.socialLink && (
								<a
									href={testimonialData.socialLink}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-primary transition-all duration-300 flex items-center gap-1 group-hover:translate-x-1"
								>
									<LinkIcon className="w-3 h-3" />
									<span>{testimonialData.socialLink}</span>
								</a>
							)}
							{testimonialData.address && (
								<div className="flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1">
									<MapPin className="w-3 h-3" />
									<span className="max-w-[200px] truncate">
										{testimonialData.address}
									</span>
								</div>
							)}
						</div>
					</div>
				</CardFooter>
			</Card>

			{openEditTestimonialModal && (
				<TestimonialEditModal
					initialData={spaceData}
					testimonialData={testimonialData}
					isOpen={openEditTestimonialModal}
					onClose={toggle}
					onSubmit={async (data) => {
						try {
							const res = await axios.put(
								`/api/update-testimonial/${testimonialData.testimonial_id}`,
								data
							);
							if (res.status === 200) {
								toast.success("Testimonial updated successfully");
								setOpenEditTestimonialModal(false);
							}
						} catch (error) {
							if (axios.isAxiosError(error)) {
								const axiosError = error;
								if (axiosError.response?.status === 400) {
									toast.error(
										axiosError.response.data.message || "Something went wrong"
									);
								} else {
									toast.error(
										axiosError.response?.data?.message || "Something went wrong"
									);
								}
							} else {
								console.error("something went wrong", error);
							}
						}
					}}
				/>
			)}
		</>
	);
};

export default TestimonialCard;
