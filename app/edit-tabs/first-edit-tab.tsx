import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { spaceSchema } from "@/app/validations/spaceValidation";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FirstTabProps {
	questions: string[];
	setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
	headerTitle: string;
	setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
	customMessage: string;
	setCustomMessage: React.Dispatch<React.SetStateAction<string>>;
	spaceName: string;
	setSpaceName: React.Dispatch<React.SetStateAction<string>>;
	requiredFields: {
		[key: string]: { enabled: boolean; required: boolean };
	};
	setRequiredFields: React.Dispatch<React.SetStateAction<any>>;
	selectedCollectionType: string;
	setSelectedCollectionType: React.Dispatch<React.SetStateAction<string>>;
	ratings: boolean;
	setRatings: React.Dispatch<React.SetStateAction<boolean>>;
	isDark: boolean;
	setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
	buttonColor: string;
	setButtonColor: React.Dispatch<React.SetStateAction<string>>;
	setSquareProfile: React.Dispatch<React.SetStateAction<boolean>>;
	squareProfile: boolean;
	setProfileImage: React.Dispatch<React.SetStateAction<File | undefined>>;
	profileImage: File | undefined;
	imageUri: string | null;
	setImageUri: React.Dispatch<React.SetStateAction<string | null>>;
	onOpenChange: (open: boolean) => void;
	open: boolean;
	spaceId: string;
}

const colors = [
	"#EF4444", // Red-500
	"#3B82F6", // Blue-500+
	"#22C55E", // Green-500
	"#06B6D4", // Cyan-500
	"#EC4899", // Magenta (Closest: Pink-500)
	"#A855F7", // Purple-500
	"#10B981", // Emerald-500
	"#EAB308", // Yellow-500
];

const FirstEditTab: React.FC<FirstTabProps> = ({
	questions,
	setQuestions,
	headerTitle,
	setHeaderTitle,
	customMessage,
	setCustomMessage,
	spaceName,
	setSpaceName,
	requiredFields,
	setRequiredFields,
	selectedCollectionType,
	setSelectedCollectionType,
	ratings,
	setRatings,
	isDark,
	setIsDark,
	buttonColor,
	setButtonColor,
	squareProfile,
	setSquareProfile,
	profileImage,
	setProfileImage,
	imageUri,
	setImageUri,
	onOpenChange,
	open,
	spaceId,
}) => {
	console.log(requiredFields);

	const [questionLength, setQuestionLength] = useState(
		questions.map((i) => {
			return i.split("").length;
		})
	);
	const [isOpen, setIsOpen] = useState(false);
	const [isCollectionOpen, setIsCollectionOpen] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [base64, SetBase64] = useState("");
	const router = useRouter();

	const validateData = () => {
		try {
			const validatedData = spaceSchema.safeParse({
				questions,
				headerTitle,
				customMessage,
				spaceName,
				requiredFields,
				selectedCollectionType,
				ratings,
				isDark,
				buttonColor,
				squareProfile,
			});
			return validatedData.success;
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error(error);
				console.error(error);
			}
		}
	};

	useEffect(() => {
		const isValid = validateData();
		setIsButtonDisabled(!isValid);
		return () => {
			validateData();
		};
	}, [
		questions,
		headerTitle,
		customMessage,
		spaceName,
		requiredFields,
		selectedCollectionType,
		ratings,
		isDark,
		buttonColor,
		squareProfile,
		imageUri,
	]);

	const handleQuestionChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value } = e.target;

		setQuestions((prev) =>
			prev.map((question, i) => (i === index ? value : question))
		);

		setQuestionLength(
			questions.map((i) => {
				return i.split("").length;
			})
		);
	};

	const appendQuestion = () => {
		setQuestions((prev) => [...prev, ""]);
	};

	const filterQuestion = (i: number) => {
		setQuestions((prev) => prev.filter((_, index) => index !== i));
	};

	const toggleSwitch = (item: any) => {
		setRequiredFields({
			...requiredFields,
			[item]: {
				...requiredFields[item],
				enabled: !requiredFields[item].enabled,
			},
		});
	};

	const toggleCheckbox = (item: any) => {
		setRequiredFields({
			...requiredFields,
			[item]: {
				...requiredFields[item],
				required: !requiredFields[item].required,
			},
		});
	};
	const toggleRatings = () => {
		setRatings((prev) => !prev);
	};

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	const handleCollectionTypeChange = (type: string) => {
		setSelectedCollectionType(type);
		setIsCollectionOpen(false);
	};

	const toggleProfileRadius = () => {
		setSquareProfile((prev) => !prev);
	};

	const handleSpaceSubmit = async () => {
		if (!isButtonDisabled) {
			try {
				const responseData = {
					questions: questions,
					header: headerTitle,
					custom_message: customMessage,
					space_name: spaceName,
					required_fields: requiredFields,
					collection_type: selectedCollectionType,
					show_ratings: ratings,
					theme: isDark,
					button_color: buttonColor,
					is_squareprofile: squareProfile,
					image: base64,
				};
				const res = await axios.put(`/api/edit-space/${spaceId}`, responseData);

				if (res.status === 200) {
					toast.success("Space updated successfully");
					router.refresh();
					onOpenChange(!open);
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const axiosError = error;
					if (axiosError.response?.status === 409) {
						toast.error(
							axiosError.response.data.message || "Space already exists"
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
		}
	};

	useEffect(() => {
		return () => {
			if (imageUri && imageUri.startsWith("blob:")) {
				URL.revokeObjectURL(imageUri);
			}
		};
	}, [imageUri]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Revoke the previous image blob URL if it exists
			if (imageUri && imageUri.startsWith("blob:")) {
				URL.revokeObjectURL(imageUri);
			}
			const objectUrl = URL.createObjectURL(file);
			setImageUri(objectUrl);
			setProfileImage(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				SetBase64(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<div className="flex-1 p-8 overflow-y-auto scroll-smooth">
				<div className="flex justify-center items-center flex-col">
					<h1 className="text-3xl font-semibold"> Create a new space </h1>
					<span className="mt-5">
						After the Space is created, it will generate a dedicated page for
						collecting testimonials.
					</span>
				</div>
				<div className="space-y-7 mt-7">
					<div className="space-y-1">
						<label className="text-sm font-medium">Space Name</label>
						<input
							type="text"
							value={spaceName}
							onChange={(e) => setSpaceName(e.target.value)}
							className="w-full px-4 py-2 mt-1 rounded-lg border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
						<span className="text-xs">
							Public URL is: testimonial.to/your-space
						</span>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium flex gap-5">
							Space Logo
							<div className="gap-1 flex justify-center items-center">
								<Checkbox
									checked={squareProfile}
									onCheckedChange={() => toggleProfileRadius()}
								/>
								square ?
							</div>
						</label>

						<div className="flex gap-5 items-center">
							{imageUri ? (
								<img
									className={
										squareProfile
											? "w-12 h-12 rounded-md object-cover"
											: "w-12 h-12 rounded-full object-cover"
									}
									src={imageUri || "/placeholder.svg"}
									alt="Profile"
								/>
							) : (
								<span
									className={
										squareProfile
											? "w-12 h-12 rounded-md bg-muted"
											: "w-12 h-12 rounded-full bg-muted"
									}
								></span>
							)}

							<input
								type="file"
								accept="image/*"
								className="hidden"
								id="profile-upload"
								ref={fileInputRef}
								onChange={handleFileChange}
							/>

							<Button
								className="rounded-2xl"
								onClick={() => fileInputRef.current?.click()}
							>
								Change
							</Button>
						</div>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium">Header title</label>
						<input
							type="text"
							value={headerTitle}
							placeholder="Would you like to give shortcut for xyz"
							onChange={(e) => setHeaderTitle(e.target.value)}
							className="w-full px-4 py-2 mt-1 rounded-lg border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium">Your custom message </label>
						<textarea
							rows={4}
							value={customMessage}
							onChange={(e) => setCustomMessage(e.target.value)}
							placeholder="Write a warm message for customers, and give them simple directions on how to make the best testimonial."
							className="w-full px-4 py-2 mt-1 rounded-lg border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
						/>
					</div>

					<div className="space-y-1">
						<label className="text-sm font-medium">Questions </label>
						{questions &&
							questions.length > 0 &&
							questions.map((question, index) => {
								return (
									<div className="flex items-center gap-2 w-full" key={index}>
										<div className="relative flex-1">
											<input
												type="text"
												key={index}
												placeholder="keep it short"
												value={question}
												onChange={(e) => handleQuestionChange(e, index)}
												className="w-full  px-4 py-2 mt-1 rounded-lg border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
												maxLength={100}
											/>
											<span className="absolute right-2 top-0 translate-y-1/2">
												{questionLength[index]}
											</span>
										</div>
										<Button
											className="rounded-full w-8 h-8"
											onClick={() => filterQuestion(index)}
										>
											<Trash />
										</Button>
									</div>
								);
							})}

						{questions.length < 5 && (
							<Button className="rounded-xl" onClick={appendQuestion}>
								<Plus />
								Add upto 5
							</Button>
						)}
					</div>

					<div className="space-y-1 flex flex-col">
						<label className="text-sm font-medium">
							Collect Extra Information{" "}
						</label>
						<div>
							<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
								<DropdownMenuTrigger asChild>
									<button className="flex items-center justify-between w-full px-4 py-2 text-left border rounded-md shadow-sm">
										<span>Name, email, title, social link, etc.</span>
										{isOpen ? (
											<ChevronUp className="h-4 w-4" />
										) : (
											<ChevronDown className="h-4 w-4" />
										)}
									</button>
								</DropdownMenuTrigger>

								<DropdownMenuContent
									className="w-full min-w-[400px]"
									align="start"
								>
									<div className="p-2 space-y-2">
										{/* Name Field */}
										<div className="flex items-center justify-between p-2">
											<div className="flex items-center gap-2">
												<Switch
													id="name-switch"
													checked={requiredFields.name.enabled}
													onCheckedChange={() => toggleSwitch("name")}
												/>
												<Label htmlFor="name-switch">Name</Label>
											</div>
											<div className="flex items-center gap-2">
												<Checkbox
													id="name-required"
													checked={requiredFields.name.required}
													onCheckedChange={() => toggleCheckbox("name")}
													disabled={!requiredFields.name.enabled}
												/>
												<Label htmlFor="name-required" className="text-xs">
													Required
												</Label>
											</div>
										</div>

										<div className="flex items-center justify-between p-2">
											<div className="flex items-center gap-2">
												<Switch
													id="email-switch"
													checked={requiredFields.email.enabled}
													onCheckedChange={() => toggleSwitch("email")}
												/>
												<Label htmlFor="email-switch">Email</Label>
											</div>
											<div className="flex items-center gap-2">
												<Checkbox
													id="email-required"
													checked={requiredFields.email.required}
													onCheckedChange={() => toggleCheckbox("email")}
													disabled={!requiredFields.email.enabled}
												/>
												<Label htmlFor="email-required" className="text-xs">
													Required
												</Label>
											</div>
										</div>

										{/* Social Link Field */}
										<div className="flex items-center justify-between p-2">
											<div className="flex items-center gap-2">
												<Switch
													id="social-switch"
													checked={requiredFields.socialLink.enabled}
													onCheckedChange={() => toggleSwitch("socialLink")}
												/>
												<Label htmlFor="social-switch">Social Link</Label>
											</div>
											<div className="flex items-center gap-2">
												<Checkbox
													id="social-required"
													checked={requiredFields.socialLink.required}
													onCheckedChange={() => toggleCheckbox("socialLink")}
													disabled={!requiredFields.socialLink.enabled}
												/>
												<Label htmlFor="social-required" className="text-xs">
													Required
												</Label>
											</div>
										</div>

										{/* Address Field */}
										<div className="flex items-center justify-between p-2">
											<div className="flex items-center gap-2">
												<Switch
													id="address-switch"
													checked={requiredFields.address.enabled}
													onCheckedChange={() => toggleSwitch("address")}
												/>
												<Label htmlFor="address-switch">Address</Label>
											</div>
											<div className="flex items-center gap-2">
												<Checkbox
													id="address-required"
													checked={requiredFields.address.required}
													onCheckedChange={() => toggleCheckbox("address")}
													disabled={!requiredFields.address.enabled}
												/>
												<Label htmlFor="address-required" className="text-xs">
													Required
												</Label>
											</div>
										</div>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					<div className="space-y-1 flex items-center justify-between  w-3/4">
						<div>
							<label className="text-sm font-medium">Collection Type </label>
							<DropdownMenu
								open={isCollectionOpen}
								onOpenChange={setIsCollectionOpen}
							>
								<DropdownMenuTrigger asChild>
									<button className="flex items-center justify-between w-full px-4 py-2 text-left border rounded-md shadow-sm mt-1">
										<span>{selectedCollectionType}</span>
										{isCollectionOpen ? (
											<ChevronUp className="h-4 w-4" />
										) : (
											<ChevronDown className="h-4 w-4" />
										)}
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="start"
									className="w-full min-w-[200px]"
								>
									<DropdownMenuItem
										onClick={() => handleCollectionTypeChange("Text And Video")}
									>
										Text And Video
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleCollectionTypeChange("Text Only")}
									>
										Text Only
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => handleCollectionTypeChange("Video Only")}
									>
										Video Only
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="flex flex-col space-y-1">
							{" "}
							<label className="text-sm font-medium">
								Collect star ratings{" "}
							</label>
							<Switch
								id="star-ratings"
								checked={ratings}
								onCheckedChange={() => toggleRatings()}
							/>
						</div>

						<div className="flex flex-col space-y-1">
							{" "}
							<label className="text-sm font-medium">Choose a theme</label>
							<Switch
								id="theme-choose"
								checked={isDark}
								onCheckedChange={() => toggleTheme()}
							/>
						</div>
					</div>

					<div className="w-1/4">
						<label className="text-sm font-medium">Custom button color</label>
						<div className="grid grid-cols-4 gap-2">
							{colors.map((color) => (
								<div
									key={color}
									className="w-12 h-12 flex items-center justify-center rounded-md  text-xs"
									style={{ backgroundColor: color }}
									onClick={() => setButtonColor(color)}
								></div>
							))}
						</div>
					</div>

					<Button
						onClick={handleSpaceSubmit}
						disabled={isButtonDisabled}
						className="disabled:bg-opacity-30"
					>
						Edit Space
					</Button>
				</div>
			</div>
		</>
	);
};

export default FirstEditTab;
