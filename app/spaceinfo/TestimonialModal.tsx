"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Define interfaces for better type safety
interface FormData {
	answers: Record<string, string>[];
	rating: number;
	name: string;
	email: string;
	socialLink: string;
	address: string;
	submittedAt: string;
	[key: string]: any;
}

interface RequiredField {
	enabled: boolean;
	required: boolean;
}

interface InitialData {
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
	initialData: InitialData;
	onSubmit: (data: FormData) => void;
}

export function TestimonialModal({
	isOpen,
	onClose,
	initialData,
	onSubmit,
}: TestimonialModalProps) {
	const [formData, setFormData] = useState<FormData>({
		answers: initialData.questions.map((question: string) => ({
			[question]: "",
		})),
		rating: 0,
		name: "",
		email: "",
		socialLink: "",
		address: "",
		submittedAt: "2025-03-19 11:25:14",
	});

	const [errors, setErrors] = useState<Record<string, boolean>>({});

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

	const handleAnswerChange = (question: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			answers: prev.answers.map((ans) => {
				if (Object.keys(ans)[0] === question) {
					return { [question]: value };
				}
				return ans;
			}),
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: Record<string, boolean> = {};

		if (initialData.required_fields) {
			Object.entries(initialData.required_fields).forEach(
				([field, value]: [string, RequiredField]) => {
					if (value.enabled && value.required && !formData[field]) {
						newErrors[field] = true;
					}
				}
			);
		}

		// Validate answers
		formData.answers.forEach((answerObj, index) => {
			const question = Object.keys(answerObj)[0];
			const answer = answerObj[question];
			if (!answer?.trim()) {
				newErrors[`question_${index}`] = true;
			}
		});

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		onSubmit({
			...formData,
			submittedAt: "2025-03-19 11:25:14",
		});
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
				<DialogHeader>
					<DialogTitle>{initialData.header}</DialogTitle>
					<p className="text-sm text-muted-foreground mt-2">
						{initialData.custom_message}
					</p>
				</DialogHeader>

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
										<Star
											className={`h-6 w-6 ${
												star <= formData.rating
													? "fill-yellow-400 text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									</button>
								))}
							</div>
						</div>
					)}
					{/* Required Fields */}
					<div className="space-y-4">
						{shouldShowField("name") && (
							<div className="space-y-2">
								<Label>
									Name{" "}
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
									Email{" "}
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

					{/* Questions */}
					<div className="space-y-4">
						{initialData.questions.map((question: string, index: number) => (
							<div key={question} className="space-y-2">
								<Label className="">
									{question}
									<span className="text-destructive ml-1">*</span>
								</Label>
								<Input
									value={formData.answers[index][question]}
									onChange={(e) => handleAnswerChange(question, e.target.value)}
									className={cn(
										errors[`question_${index}`] &&
											"border-destructive focus:border-destructive"
									)}
									placeholder="Type your answer here"
								/>
								{errors[`question_${index}`] && (
									<p className="text-sm text-destructive">
										This answer is required
									</p>
								)}
							</div>
						))}
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
