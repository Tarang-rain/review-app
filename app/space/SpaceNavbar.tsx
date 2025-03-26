"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, X, Video, FileType2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import FirstEditTab from "../edit-tabs/first-edit-tab";
import SecondEditTab from "../edit-tabs/second-edit-tab";
import ThirdEditTab from "../edit-tabs/third-edit-tab";
import FourthEditTab from "../edit-tabs/fourth-edit-tab";
import { SpaceSchemaType } from "../validations/spaceValidation";

const SpaceNavbar = ({
	spaceName,
	spaceId,
}: {
	spaceName: string;
	spaceId: string;
}) => {
	const [isOpenEditModal, setIsOpenEditModal] = useState(false);
	const [existingSpace, setExistingSpace] = useState<SpaceSchemaType | null>(
		null
	);
	const [selectedTab, setSelectedTab] = useState<string>("Basic");
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	// Tabs array
	const [tabs] = useState([
		"Basic",
		"Thank You Page",
		"Extra Settings",
		"Notifications",
	]);

	const [questions, setQuestions] = useState<string[]>([]);
	const [headerTitle, setHeaderTitle] = useState("");
	const [customMessage, setCustomMessage] = useState("");
	const [selectedSpaceName, setSelectedSpaceName] = useState("");
	const [requiredFields, setRequiredFields] = useState({});
	const [selectedCollectionType, setSelectedCollectionType] =
		useState<string>("Text And Video");
	const [ratings, setRatings] = useState(false);
	const [isDark, setIsDark] = useState(false);
	const [buttonColor, setButtonColor] = useState("white");
	const [squareProfile, setSquareProfile] = useState(false);
	const [profileImage, setProfileImage] = useState<File | undefined>();
	const [imageUri, setImageUri] = useState<string | null>(null);

	const handleUpdateSpace = async (spaceid: string) => {
		try {
			const res = await axios.get(`/api/get-space/${spaceid}`);
			const spaceData = res.data.space;
			console.log(spaceData);

			setExistingSpace(spaceData);
			setQuestions(spaceData.questions || []);
			setHeaderTitle(spaceData.header || "");
			setCustomMessage(spaceData.custom_message || "");
			setSelectedSpaceName(spaceData.space_name || "");
			setRequiredFields(spaceData.required_fields || {});
			setSelectedCollectionType(spaceData.collection_type || "Text And Video");
			setRatings(spaceData.show_ratings || false);
			setIsDark(spaceData.theme || false);
			setButtonColor(spaceData.button_color || "white");
			setSquareProfile(spaceData.is_squareprofile || false);
			setImageUri(spaceData.imageUrl || null);

			// Open the edit modal
			setIsOpenEditModal(true);
		} catch (error) {
			console.error("Error fetching space data:", error);
		}
	};

	// Handler to change tabs
	const handleChangeTab = (tab: string, index: number) => {
		setSelectedTab(tab);
		setSelectedIndex(index);
	};

	// Memoized tab rendering
	const Tab = useMemo(() => {
		if (selectedTab === "Basic") {
			return (
				<FirstEditTab
					questions={questions}
					setQuestions={setQuestions}
					headerTitle={headerTitle}
					setHeaderTitle={setHeaderTitle}
					customMessage={customMessage}
					setCustomMessage={setCustomMessage}
					spaceName={selectedSpaceName}
					setSpaceName={setSelectedSpaceName}
					requiredFields={requiredFields}
					setRequiredFields={setRequiredFields}
					selectedCollectionType={selectedCollectionType}
					setSelectedCollectionType={setSelectedCollectionType}
					ratings={ratings}
					setRatings={setRatings}
					isDark={isDark}
					setIsDark={setIsDark}
					buttonColor={buttonColor}
					setButtonColor={setButtonColor}
					squareProfile={squareProfile}
					setSquareProfile={setSquareProfile}
					profileImage={profileImage}
					setProfileImage={setProfileImage}
					setImageUri={setImageUri}
					imageUri={imageUri}
					spaceId={spaceId}
					onOpenChange={setIsOpenEditModal}
					open={isOpenEditModal}
				/>
			);
		} else if (selectedTab === "Thank You Page") {
			return <SecondEditTab />;
		} else if (selectedTab === "Extra Settings") {
			return <ThirdEditTab />;
		} else if (selectedTab === "Notifications") {
			return <FourthEditTab />;
		}
		return null;
	}, [
		selectedTab,
		questions,
		headerTitle,
		customMessage,
		selectedSpaceName,
		requiredFields,
		selectedCollectionType,
		ratings,
		isDark,
		buttonColor,
		squareProfile,
		imageUri,
		profileImage,
	]);

	// Effect to handle body overflow when modal is open
	useEffect(() => {
		if (isOpenEditModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpenEditModal]);

	return (
		<>
			<div className="flex items-center justify-between w-4/5 mx-auto">
				<p className="font-medium text-xl first-letter:capitalize">
					{decodeURI(spaceName)}
				</p>

				<div className="space-x-5">
					<Link href={`/spaceinfo/${spaceId}`}>
						<Button className="bg-secondary text-primary hover:bg-accent">
							View <ArrowUpRight />
						</Button>
					</Link>

					<Button onClick={() => handleUpdateSpace(spaceId)}>Edit</Button>
				</div>
			</div>

			{isOpenEditModal && existingSpace && (
				<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
					<div className="fixed left-[15px] right-[15px] top-[15px] bottom-[15px] bg-card rounded-xl shadow-2xl border overflow-hidden">
						{/* Close Button */}
						<button
							onClick={() => setIsOpenEditModal(false)}
							className="absolute right-6 top-6 p-2 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="flex h-full">
							{/* Left Panel - Preview */}
							<div
								className={cn(
									"w-1/3 p-8 bg-muted/30 border-r border-border/50",
									`${questions.length > 4 && "overflow-y-auto scroll-smooth"}`
								)}
							>
								<div className="flex justify-center items-center bg-card rounded-xl shadow-sm border flex-col p-8 space-y-6">
									{imageUri ? (
										<img
											src={imageUri}
											alt="space-image"
											className={
												squareProfile
													? "w-24 h-24 rounded-md bg-muted object-cover"
													: "w-24 h-24 rounded-full bg-muted object-cover"
											}
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
									<div className="space-y-4 text-center">
										<h4 className="text-2xl font-semibold text-foreground">
											{headerTitle}
										</h4>
										<p className="text-lg text-muted-foreground">
											{customMessage}
										</p>
									</div>

									<div className="w-full space-y-4">
										<h4 className="text-xl font-semibold text-foreground">
											Questions
										</h4>
										<div className="space-y-3">
											{questions.map((question, index) => (
												<p
													key={index}
													className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg"
												>
													{question}
												</p>
											))}
										</div>
									</div>

									<div className="flex flex-col w-full space-y-3 pt-4">
										<Button
											variant="default"
											className="w-full gap-2"
											style={{
												backgroundColor: buttonColor,
												borderColor: buttonColor,
											}}
										>
											<Video className="h-4 w-4" />
											{selectedCollectionType === "Text Only"
												? "Send Testimonial"
												: "Record a Video"}
										</Button>
										{selectedCollectionType !== "Video Only" && (
											<Button variant="outline" className="w-full gap-2">
												<FileType2 className="h-4 w-4" />
												Send in Text
											</Button>
										)}
									</div>
								</div>
							</div>

							{/* Right Panel - Edit Tabs */}
							<div className="w-2/3 flex flex-col bg-background">
								{/* Navigation */}
								<div className="flex px-8 pt-8 pb-0 gap-2 border-b">
									{tabs.map((tab, index) => (
										<button
											key={index}
											onClick={() => handleChangeTab(tab, index)}
											className={cn(
												"px-6 py-3 text-sm font-medium transition-colors relative",
												index === selectedIndex
													? "text-primary before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-primary"
													: "text-muted-foreground hover:text-foreground"
											)}
										>
											{tab}
										</button>
									))}
								</div>
								{Tab}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SpaceNavbar;
