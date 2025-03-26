"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	VisuallyHidden,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface FormData {
	review: string;
	rating: number;
	name: string;
	company: string;
	email: string;
	socialLink: string;
	address: string;
	submittedAt: string;
}

interface RequiredField {
	enabled: boolean;
	required: boolean;
}

interface TestimonialData {
	review: string;
	rating: number;
	name: string;
	company: string;
	email: string;
	socialLink: string;
	address: string;
	submittedAt: string;
	[key: string]: any;
}

interface InitialData {
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
}

interface TestimonialModalProps {
	isOpen: boolean;
	onClose: () => void;
	testimonialData: TestimonialData;
	onSubmit: (data: FormData) => void;
	initialData: InitialData;
	resetOnSuccess?: boolean;
}

export function TestimonialEditModal({
	isOpen,
	onClose,
	testimonialData,
	onSubmit,
	initialData,
	resetOnSuccess = true,
}: TestimonialModalProps) {
	const router = useRouter();
	const createInitialFormState = (): FormData => ({
		review: testimonialData.review,
		rating: testimonialData.rating,
		name: testimonialData.name,
		email: testimonialData.email,
		socialLink: testimonialData.socialLink,
		address: testimonialData.address,
		submittedAt: testimonialData.submittedAt,
		company: testimonialData.company,
	});

	const [formData, setFormData] = useState<FormData>(createInitialFormState());
	const [errors, setErrors] = useState<Record<string, boolean>>({});
	const [lastSubmissionStatus, setLastSubmissionStatus] = useState<
		number | null
	>(null);

	useEffect(() => {
		if (isOpen) {
			resetForm();
		}
	}, [isOpen]);

	// Function to reset the form
	const resetForm = () => {
		setFormData(createInitialFormState());
		setErrors({});
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: false,
			}));
		}
	};

	const handleCompanyChange = (review: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			company: value,
		}));
	};

	const handleReviewChange = (review: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			review: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: Record<string, boolean> = {};

		if (formData.review.trim() === "") {
			newErrors.review = true;
		}

		if (formData.company.trim() === "") {
			newErrors.company = true;
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		if (initialData.required_fields) {
			Object.entries(initialData.required_fields).forEach(
				([field, value]: [string, RequiredField]) => {
					if (value.enabled && value.required && !formData[field]) {
						newErrors[field] = true;
					}
				}
			);
		}
		const submissionData = {
			space_id: initialData.space_id,
			...formData,
			submittedAt: new Date().toISOString(),
		};

		const handleSubmission = async () => {
			try {
				const result = await onSubmit(submissionData);
				if (resetOnSuccess) {
					router.refresh();
					resetForm();
				}
				return result;
			} catch (error) {
				console.error("Error in form submission:", error);
				return null;
			}
		};

		handleSubmission();
	};
	const shouldShowField = (fieldName: string): boolean => {
		return Boolean(initialData.required_fields?.[fieldName]?.enabled);
	};

	const isFieldRequired = (fieldName: string): boolean => {
		return Boolean(initialData.required_fields?.[fieldName]?.required);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scroll-smooth">
				<VisuallyHidden>
					<DialogTitle>{initialData.header}</DialogTitle>
				</VisuallyHidden>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex">
						{initialData.imageUrl && (
							<img
								src={initialData.imageUrl}
								alt="Profile"
								className={`w-24 h-24 object-cover ${
									initialData.is_squareprofile ? "rounded-md" : "rounded-full"
								}`}
							/>
						)}
					</div>

					<div className="space-y-2">
						<Label>Questions</Label>

						<div className="flex gap-1 flex-col">
							{initialData?.questions.map((question, index) => {
								return (
									<div key={question}>
										<p className="text-sm list-disc ">{question}</p>
									</div>
								);
							})}
						</div>
					</div>
					{initialData.show_ratings && (
						<div className="space-y-2">
							<Label>Rating</Label>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type="button"
										onClick={() =>
											setFormData((prev) => ({ ...prev, rating: star }))
										}
										className="focus:outline-none"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className={`h-6 w-6 ${
												star <= formData.rating
													? "fill-yellow-400 text-yellow-400"
													: "text-gray-300"
											}`}
										>
											<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
										</svg>
									</button>
								))}
							</div>
						</div>
					)}

					<div className="space-y-2">
						<Textarea
							value={formData.review}
							onChange={(e) => handleReviewChange("review", e.target.value)}
							className={cn(
								errors.review ? "border-red-500" : "",
								"min-h-[7rem]"
							)}
						/>
						{errors.review && (
							<p className="text-sm text-red-500">Review is required</p>
						)}
					</div>

					{/* Required Fields */}
					<div className="space-y-4">
						{shouldShowField("name") && (
							<div className="space-y-2">
								<Label>
									Your Name{" "}
									{isFieldRequired("name") && (
										<span className="text-red-500">*</span>
									)}
								</Label>
								<Input
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									className={errors.name ? "border-red-500" : ""}
								/>
								{errors.name && (
									<p className="text-sm text-red-500">Name is required</p>
								)}
							</div>
						)}

						{shouldShowField("email") && (
							<div className="space-y-2">
								<Label>
									Your Email{" "}
									{isFieldRequired("email") && (
										<span className="text-red-500">*</span>
									)}
								</Label>
								<Input
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									className={errors.email ? "border-red-500" : ""}
								/>
								{errors.email && (
									<p className="text-sm text-red-500">Email is required</p>
								)}
							</div>
						)}

						<div className="space-y-2">
							<Label>
								Your Title and Company <span className="text-red-500">*</span>
							</Label>
							<Input
								type="text"
								value={formData.company}
								onChange={(e) => handleCompanyChange("company", e.target.value)}
								className={errors.company ? "border-red-500" : ""}
							/>
							{errors.company && (
								<p className="text-sm text-red-500">Title is required</p>
							)}
						</div>

						{shouldShowField("socialLink") && (
							<div className="space-y-2">
								<Label>
									Social Link{" "}
									{isFieldRequired("socialLink") && (
										<span className="text-red-500">*</span>
									)}
								</Label>
								<Input
									value={formData.socialLink}
									onChange={(e) =>
										handleInputChange("socialLink", e.target.value)
									}
									className={errors.socialLink ? "border-red-500" : ""}
								/>
								{errors.socialLink && (
									<p className="text-sm text-red-500">
										Social Link is required
									</p>
								)}
							</div>
						)}

						{shouldShowField("address") && (
							<div className="space-y-2">
								<Label>
									Address{" "}
									{isFieldRequired("address") && (
										<span className="text-red-500">*</span>
									)}
								</Label>
								<Input
									value={formData.address}
									onChange={(e) => handleInputChange("address", e.target.value)}
									className={errors.address ? "border-red-500" : ""}
								/>
								{errors.address && (
									<p className="text-sm text-red-500">Address is required</p>
								)}
							</div>
						)}
					</div>

					<div className="flex justify-end space-x-2 pt-4">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
