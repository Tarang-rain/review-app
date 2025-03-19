import { X, FileType2, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FirstTab from "@/app/tabs/firsttab";
import SecondTab from "@/app/tabs/secondtab";
import ThirdTab from "@/app/tabs/thirdtab";
import FourthTab from "@/app/tabs/fourthtab";

interface SpaceModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const SpaceModal = ({ open, onOpenChange }: SpaceModalProps) => {
	const [questions, setQuestions] = useState([
		"Who are you / what are you working on?",
		"How has [our product / service] helped you?",
		"What is the best thing about [our product / service]",
	]);
	const [headerTitle, setHeaderTitle] = useState("Header goes here....");
	const [customMessage, setCustomMessage] = useState(
		"Your custom message goes here...."
	);
	const [spaceName, setSpaceName] = useState("");
	const [spaceLogo, setSpaceLogo] = useState("/globe.svg");
	const [requiredFields, setRequiredFields] = useState({
		name: { enabled: false, required: false },
		email: { enabled: false, required: false },
		socialLink: { enabled: false, required: false },
		address: { enabled: false, required: false },
	});
	const [selectedCollectionType, setSelectedCollectionType] =
		useState("Text And Video");
	const [ratings, setRatings] = useState(true);
	const [isDark, setIsDark] = useState(false);
	const [buttonColor, setButtonColor] = useState("white"); // Default color
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState("Basic");
	const [tabs, setTabs] = useState([
		"Basic",
		"Thank You Page",
		"Extra Settings",
		"Notifications",
	]);
	const [squareProfile, setSquareProfile] = useState(false);
	const [profileImage, setProfileImage] = useState<File>();
	const [imageUri, setImageUri] = useState<string | undefined>("");

	const Tab = useMemo(() => {
		if (selectedTab === "Basic") {
			return (
				<FirstTab
					questions={questions}
					setQuestions={setQuestions}
					headerTitle={headerTitle}
					setHeaderTitle={setHeaderTitle}
					customMessage={customMessage}
					setCustomMessage={setCustomMessage}
					spaceName={spaceName}
					setSpaceName={setSpaceName}
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
					profileImage={profileImage!}
					setProfileImage={setProfileImage}
					setImageUri={setImageUri}
					imageUri={imageUri}
				/>
			);
		} else if (selectedTab === "Thank You Page") {
			return <SecondTab />;
		} else if (selectedTab === "Extra Settings") {
			return <ThirdTab />;
		} else if (selectedTab === "Notifications") {
			return <FourthTab />;
		}
		return null;
	}, [
		selectedTab,
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
		profileImage,
	]);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [open]);

	if (!open) return null;

	const handleChangeTab = (tab: string, index: number) => {
		setSelectedIndex(Number);
		setSelectedTab(tab);
	};

	return (
		<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
			<div className="fixed left-[15px] right-[15px] top-[15px] bottom-[15px] bg-card rounded-xl shadow-2xl border overflow-hidden">
				{/* Close Button */}
				<button
					onClick={() => onOpenChange(false)}
					className="absolute right-6 top-6 p-2 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
				>
					<X className="h-5 w-5" />
				</button>

				<div className="flex h-full">
					{/* Left Panel */}
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
								<p className="text-lg text-muted-foreground">{customMessage}</p>
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

					{/* Right Panel */}
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
	);
};

export default SpaceModal;
